import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-database.js";

// --- Firebase config ---
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "PROJECT.firebaseapp.com",
    databaseURL: "https://PROJECT-default-rtdb.firebaseio.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// inputlar
const t1 = document.getElementById('t1');
const t2 = document.getElementById('t2');
const list = document.getElementById('incoming-list');

// inputu gönder
function sendData(id, val){
    push(ref(db,'inputs'), {id, val, ts: Date.now()});
}

t1.addEventListener('input', ()=>sendData('t1', t1.value));
t2.addEventListener('input', ()=>sendData('t2', t2.value));

// verileri dinle ve ekrana yaz
onChildAdded(ref(db,'inputs'), (snap)=>{
    const data = snap.val();
    const el = document.createElement('div');
    el.textContent = `${data.id}: ${data.val}`;
    list.prepend(el);
    console.log("Gelen veri:", data);
});
