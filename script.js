fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // 날짜 기준으로 정렬 (최신순)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 전체 사진 갤러리 표시
        const photoGallery = document.getElementById('photo-gallery');
        data.forEach(item => {
            photoGallery.innerHTML += `
                <div class="photo-item">
                    <img src="${item.url}" alt="바질">
                    <div class="info">
                        <h3>바질</h3>
                        <p>${item.date}</p>
                        <p>${item.description || ""}</p>
                    </div>
                </div>
            `;
        });

        // 캘린더 생성
        const calendar = document.getElementById('calendar');
        data.forEach(item => {
            calendar.innerHTML += `
                <div class="calendar-item" data-url="${item.url}" data-date="${item.date}">
                    <img src="${item.url}" alt="바질">
                    <div class="info">
                        <p>${item.date}</p>
                        <p>${item.description || ""}</p>
                    </div>
                </div>
            `;
        });

        // 뒤로가기 버튼 토글
        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
            const isCalendarVisible = calendar.style.display === 'grid';
            calendar.style.display = isCalendarVisible ? 'none' : 'grid';
            photoGallery.style.display = isCalendarVisible ? 'flex' : 'none';
            backBtn.textContent = isCalendarVisible ? '목록 보기' : '큰 화면 보기';
        });

        // 사진 클릭 시 모달 열기
        document.querySelectorAll('.calendar-item').forEach(item => {
            item.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                const modalImage = document.getElementById('modal-image');
                modalImage.src = item.dataset.url;
                modal.style.display = 'flex';
            });
        });

        // 모달 닫기
        document.getElementById('close-btn').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });
    })
    .catch(error => console.error('Error loading data:', error));