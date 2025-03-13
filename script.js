const photos = [
    "images/basil1.jpeg",
    "images/basil2.jpeg",
    "images/basil3.jpeg",
    "images/basil4.heic",
    "images/basil5.heic",
    "images/basil6.heic",
    "images/basil7.jpeg",
    "images/basil8.jpeg",
    "images/basil9.jpeg"
    // 새 사진 추가 시 여기에 파일명 추가
];

const gallery = document.getElementById('gallery');

photos.forEach(photo => {
    const img = new Image();
    img.src = photo;
    img.onload = function() {
        EXIF.getData(img, function() {
            const date = EXIF.getTag(this, "DateTimeOriginal") || "날짜 없음";
            const formattedDate = date ? date.replace(/(\d{4}):(\d{2}):(\d{2})/, "$1.$2.$3") : "날짜 없음";
            gallery.innerHTML += `
                <div class="photo-card">
                    <img src="${photo}" alt="바질">
                    <div class="info">
                        <h3>바질</h3>
                        <p>${formattedDate}</p>
                    </div>
                </div>
            `;
        });
    };
});