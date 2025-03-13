// Firebase 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyASQDqvtc2rxQn8MirC5MBWIqxSeEwsMVw",
    authDomain: "basilsgrowthdiary.firebaseapp.com",
    projectId: "basilsgrowthdiary",
    storageBucket: "basilsgrowthdiary.firebasestorage.app",
    messagingSenderId: "748159890040",
    appId: "1:748159890040:web:6eeb0d5d0cad47b828338d",
    measurementId: "G-ES95XVM5CM"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

// 사진 업로드 함수
export async function uploadPhoto() {
    const file = document.getElementById('photo-upload').files[0];
    const desc = document.getElementById('photo-desc').value;

    if (!file || !desc) {
        alert('사진과 설명을 모두 입력해주세요!');
        return;
    }

    // Storage에 사진 업로드
    const storageRef = ref(storage, `basil/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // Firestore에 데이터 저장 (이름은 "바질"로 고정)
    await addDoc(collection(db, 'basil'), {
        url: url,
        name: "바질",
        description: desc,
        timestamp: new Date()
    });

    // 입력 초기화
    document.getElementById('photo-upload').value = '';
    document.getElementById('photo-desc').value = '';
}

// 갤러리 실시간 업데이트
const q = query(collection(db, 'basil'), orderBy('timestamp', 'desc'));
onSnapshot(q, (snapshot) => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        gallery.innerHTML += `
            <div class="photo-card">
                <img src="${data.url}" alt="${data.name}">
                <div class="info">
                    <h3>${data.name}</h3>
                    <p>${data.description}</p>
                </div>
            </div>
        `;
    });
});

// uploadPhoto를 전역 스코프에 노출 (onclick에서 사용)
window.uploadPhoto = uploadPhoto;