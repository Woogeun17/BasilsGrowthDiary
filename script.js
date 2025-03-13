fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // 날짜 기준으로 정렬 (최신순)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 최근 사진 표시
        const latestPhoto = document.getElementById('latest-photo');
        const latest = data[0];
        latestPhoto.innerHTML = `
            <img src="${latest.url}" alt="바질">
            <div class="info">
                <h3>바질</h3>
                <p>${latest.date}</p>
            </div>
        `;

        // 캘린더 생성
        const calendar = document.getElementById('calendar');
        data.forEach(item => {
            calendar.innerHTML += `
                <div class="calendar-item" data-url="${item.url}" data-date="${item.date}">
                    <img src="${item.url}" alt="바질">
                    <div class="info">
                        <p>${item.date}</p>
                    </div>
                </div>
            `;
        });

        // 뒤로가기 버튼 토글
        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
            const isCalendarVisible = calendar.style.display === 'grid';
            calendar.style.display = isCalendarVisible ? 'none' : 'grid';
            latestPhoto.style.display = isCalendarVisible ? 'block' : 'none';
            backBtn.textContent = isCalendarVisible ? '캘린더 보기' : '최신 사진 보기';
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