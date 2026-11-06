import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js';

const mount = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 1.4, 8.8);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
mount.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4.5;
controls.maxDistance = 13;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;

scene.add(new THREE.AmbientLight(0x8899ff, 0.75));
const keyLight = new THREE.PointLight(0x8e9fff, 42, 30);
keyLight.position.set(-4, 3, 5);
scene.add(keyLight);
const rimLight = new THREE.PointLight(0x38e6d0, 28, 25);
rimLight.position.set(4, -1, -3);
scene.add(rimLight);

const planet = new THREE.Group();
scene.add(planet);
const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.65, 6),
  new THREE.MeshStandardMaterial({ color: 0x465be8, roughness: 0.62, metalness: 0.18, emissive: 0x111d62, emissiveIntensity: 0.45, flatShading: false })
);
planet.add(sphere);

// Glowing atmosphere shell
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.78, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0x5e86ff, transparent: true, opacity: 0.12, side: THREE.BackSide })
);
planet.add(atmosphere);

// Delicate orbital rings
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x90a5ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
const ring = new THREE.Mesh(new THREE.RingGeometry(2.25, 2.27, 160), ringMaterial);
ring.rotation.set(1.12, 0.2, 0.12);
planet.add(ring);
const ring2 = new THREE.Mesh(new THREE.RingGeometry(2.55, 2.56, 160), new THREE.MeshBasicMaterial({ color: 0x51dcca, transparent: true, opacity: 0.26, side: THREE.DoubleSide }));
ring2.rotation.copy(ring.rotation);
planet.add(ring2);

// Star field
const starCount = 1800;
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);
const colorA = new THREE.Color(0x899fff), colorB = new THREE.Color(0xffffff), colorC = new THREE.Color(0x62e5d3);
for (let i = 0; i < starCount; i++) {
  const radius = 7 + Math.random() * 22;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = radius * Math.cos(phi);
  const c = [colorA, colorB, colorC][Math.floor(Math.random() * 3)];
  colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true }));
scene.add(stars);

const status = document.querySelector('#status');
let boost = 0;
renderer.domElement.addEventListener('pointerdown', () => { boost = 1; status.textContent = '星球共鳴中 ✦'; });
renderer.domElement.addEventListener('pointerup', () => { status.textContent = '正在探索宇宙'; });
function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}
addEventListener('resize', resize);
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  controls.update();
  planet.rotation.y += 0.0018 + boost * 0.012;
  sphere.rotation.x = Math.sin(t * 0.25) * 0.05;
  stars.rotation.y = t * 0.006;
  boost *= 0.94;
  planet.scale.setScalar(1 + Math.sin(t * 1.2) * 0.012 + boost * 0.08);
  renderer.render(scene, camera);
}
animate();
