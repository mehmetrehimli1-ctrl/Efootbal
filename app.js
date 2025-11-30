import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC8WhcnGxWa-QYTO1J04AG43pOwOh1-Vq8",
  authDomain: "efootbal-e3544.firebaseapp.com",
  databaseURL: "https://efootbal-e3544-default-rtdb.firebaseio.com",
  projectId: "efootbal-e3544",
  storageBucket: "efootbal-e3544.firebasestorage.app",
  messagingSenderId: "992500614600",
  appId: "1:992500614600:web:9d1d2ebe1546d883bdecfd",
  measurementId: "G-5835PWMGS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// HTML elementleri
const t1 = document.getElementById('t1');
const t2 = document.getElementById('t2');
const list = document.getElementById('incoming-list');

// Son değerleri tutmak için
let lastT1 = '';
let lastT2 = '';

// Sayfa yüklendiğinde mevcut değerleri al
onChildAdded(ref(db, 'inputs'), (snap) => {
  const data = snap.val();
  
  // Değerleri güncelle
  if (data.id === 't1') {
    t1.value = data.val;
    lastT1 = data.val;
  } else if (data.id === 't2') {
    t2.value = data.val;
    lastT2 = data.val;
  }
  
  // Listeye ekle
  const el = document.createElement('div');
  el.textContent = `${data.id}: ${data.val}`;
  el.style.padding = '5px';
  el.style.borderBottom = '1px solid #ddd';
  list.prepend(el);
  
  console.log("Gelen veri:", data);
});

// Input değiştiğinde Firebase'e gönder
t1.addEventListener('input', () => {
  if (t1.value !== lastT1) {
    push(ref(db, 'inputs'), {
      id: 't1',
      val: t1.value,
      ts: Date.now()
    });
    lastT1 = t1.value;
  }
});

t2.addEventListener('input', () => {
  if (t2.value !== lastT2) {
    push(ref(db, 'inputs'), {
      id: 't2',
      val: t2.value,
      ts: Date.now()
    });
    lastT2 = t2.value;
  }
});

console.log("Firebase bağlantısı başarılı!");
