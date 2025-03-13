fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('gallery');
        data.forEach(item => {
            gallery.innerHTML += `
                <div class="photo-card">
                    <img src="${item.url}" alt="바질">
                    <div class="info">
                        <h3>바질</h3>
                        <p>${item.date}</p>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error loading data:', error));