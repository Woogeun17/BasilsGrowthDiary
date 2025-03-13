const storage = firebase.storage();
const db = firebase.firestore();

// 사진 업로드 함수
async function uploadPhoto() {
    const file = document.getElementById('photo-upload').files[0];
    const desc = document.getElementById('photo-desc').value;

    if (!file || !desc) {
        alert('사진, 설명을 모두 입력해주세요!');
        return;
    }

    // Storage에 사진 업로드
    const storageRef = storage.ref(`plants/${file.desc}`);
    await storageRef.put(file);
    const url = await storageRef.getDownloadURL();

    // Firestore에 데이터 저장
    await db.collection('plants').add({
        url: url,
        description: desc,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 입력 초기화
    document.getElementById('photo-upload').value = '';
    document.getElementById('photo-desc').value = '';
}

// 갤러리 실시간 업데이트
db.collection('plants').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        gallery.innerHTML += `
            <div class="photo-card">
                <img src="${data.url}" alt="${data.desc}">
                <div class="info">
                    <h3>${data.desc}</h3>
                    <p>${data.description}</p>
                </div>
            </div>
        `;
    });
});