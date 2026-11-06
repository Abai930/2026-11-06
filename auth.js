(function(){
const config={clientId:document.querySelector('meta[name=google-client-id]')?.content||'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'};
let initializeAttempts=0;
const status=document.getElementById('auth-status');
const userPanel=document.getElementById('user-panel');
const googleButton=document.getElementById('google-button');
const signedOut=document.getElementById('signed-out');
function decodePayload(jwt){try{const part=jwt.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');const bin=atob(part);const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));return JSON.parse(new TextDecoder().decode(bytes));}catch{return null}}
function setSignedIn(user){googleButton.hidden=true;signedOut.hidden=true;userPanel.hidden=false;document.getElementById('user-name').textContent=user.name||user.email||'Google 使用者';document.getElementById('user-email').textContent=user.email||'';const avatar=document.getElementById('user-avatar'); if(user.picture){avatar.src=user.picture;avatar.hidden=false}else{avatar.hidden=true}status.textContent='已使用 Google 登入';}
function setSignedOut(){userPanel.hidden=true;googleButton.hidden=false;signedOut.hidden=false;status.textContent='尚未登入';}
window.handleGoogleCredential=(response)=>{const payload=response&&response.credential&&decodePayload(response.credential);if(!payload||!payload.email){status.textContent='無法讀取 Google 登入資料，請重試。';return;}try{sessionStorage.setItem('googleProfile',JSON.stringify({name:payload.name,email:payload.email,picture:payload.picture||''}));}catch{}setSignedIn(payload);};
window.googleAuthReady=()=>{if(!window.google?.accounts?.id){if(initializeAttempts++<12)setTimeout(window.googleAuthReady,250);return;}const id=config.clientId;if(!id||id.startsWith('YOUR_')){status.textContent='請先設定 Google OAuth Client ID';return;}window.google.accounts.id.initialize({client_id:id,callback:window.handleGoogleCredential,auto_select:false});window.google.accounts.id.renderButton(googleButton,{type:'standard',theme:'filled_black',size:'large',shape:'pill',text:'signin_with',locale:'zh-TW',width:260});};
document.getElementById('logout-button').addEventListener('click',()=>{try{sessionStorage.removeItem('googleProfile')}catch{}window.google?.accounts?.id?.disableAutoSelect?.();setSignedOut()});
try{const saved=sessionStorage.getItem('googleProfile');if(saved){const profile=JSON.parse(saved);if(profile?.email)setSignedIn(profile);else setSignedOut()}else setSignedOut()}catch{setSignedOut()}
if(!window.google)window.addEventListener('load',window.googleAuthReady,{once:true});else window.googleAuthReady();
})();
