let firebaseConfig={};

let authApi=null;
let authInstance=null;
const status=document.getElementById('auth-status');
const signedOut=document.getElementById('signed-out');
const userPanel=document.getElementById('user-panel');
const providerButton=document.getElementById('firebase-google-button');

function showError(error){
  console.error('Firebase sign-in error:',error);
  const messages={
    'auth/invalid-api-key':'Firebase 設定不正確，請檢查 Web App 設定值。',
    'auth/unauthorized-domain':'此網域尚未加入 Firebase Authentication 的授權網域。',
    'auth/popup-closed-by-user':'登入視窗已關閉，請重試。',
    'auth/popup-blocked':'瀏覽器封鎖了登入視窗，請允許此網站開啟彈出視窗。',
    'auth/operation-not-allowed':'尚未在 Firebase Console 啟用 Google 登入。',
    'auth/network-request-failed':'網路連線失敗，請檢查網路後重試。'
  };
  status.textContent=messages[error?.code]||'Google 登入失敗，請稍後重試。';
}
function showUser(user){
  if(!user){userPanel.hidden=true;signedOut.hidden=false;providerButton.disabled=false;status.textContent='尚未登入';return;}
  signedOut.hidden=true;userPanel.hidden=false;
  document.getElementById('user-name').textContent=user.displayName||'Google 使用者';
  document.getElementById('user-email').textContent=user.email||'';
  const avatar=document.getElementById('user-avatar');
  if(user.photoURL){avatar.src=user.photoURL;avatar.hidden=false;}else{avatar.hidden=true;}
  status.textContent='已透過 Firebase 登入';
}
function initFirebase(){
  if(!window.firebaseAuthModules||!window.firebaseAppModule){status.textContent='Firebase SDK 載入失敗，請確認網路連線。';return;}
  if(!firebaseConfig.apiKey||!firebaseConfig.authDomain||!firebaseConfig.projectId||!firebaseConfig.appId){status.textContent='請先填入 Firebase Web App 設定';return;}
  try{
    const app=window.firebaseAppModule.initializeApp(firebaseConfig);
    authApi=window.firebaseAuthModules;
    authInstance=authApi.getAuth(app);
    authApi.onAuthStateChanged(authInstance,showUser,error=>showError(error));
    status.textContent='使用 Firebase 安全登入';
  }catch(error){showError(error);}
}
providerButton.addEventListener('click',async()=>{
  if(!authInstance||!authApi){status.textContent='請先完成 Firebase 設定';return;}
  providerButton.disabled=true;status.textContent='正在連線 Google…';
  try{
    const provider=new authApi.GoogleAuthProvider();
    await authApi.signInWithPopup(authInstance,provider);
  }catch(error){showError(error);providerButton.disabled=false;}
});
document.getElementById('logout-button').addEventListener('click',async()=>{
  if(!authInstance)return;
  try{await authApi.signOut(authInstance);}catch(error){showError(error);}
});
Promise.all([import('./firebase-config.js'),import('./.firebase/firebase-app.js'),import('./.firebase/firebase-auth.js')]).then(([configModule,appModule,authModule])=>{firebaseConfig=configModule.default;window.firebaseAppModule=appModule;window.firebaseAuthModules=authModule;initFirebase();}).catch(error=>{console.error(error);status.textContent='請新增 Firebase 設定檔，並確認 Firebase SDK 已安裝。';});

