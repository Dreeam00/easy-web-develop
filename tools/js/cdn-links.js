document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    const container = document.getElementById('cdn-list-container');

    const cdnData = [
        {
            name: 'jQuery',
            category: 'JavaScript Library',
            version: '3.7.1',
            url: '<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>',
            icon: 'fab fa-js-square'
        },
        {
            name: 'Bootstrap',
            category: 'CSS Framework',
            version: '5.3.0',
            url: '<link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>',
            icon: 'fab fa-bootstrap'
        },
        {
            name: 'Font Awesome',
            category: 'Icons',
            version: '6.5.2',
            url: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />',
            icon: 'fab fa-font-awesome'
        },
        {
            name: 'React',
            category: 'JavaScript Library',
            version: '18.2.0',
            url: '<script src="https://unpkg.com/react@18/umd/react.development.js"></script>\n<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>',
            icon: 'fab fa-react'
        },
        {
            name: 'Vue.js',
            category: 'JavaScript Framework',
            version: '3.4.21',
            url: '<script src="https://unpkg.com/vue@3"></script>',
            icon: 'fab fa-vuejs'
        },
        {
            name: 'three.js',
            category: '3D Library',
            version: '0.165.0',
            url: '<script type="importmap">{ "imports": { "three": "https://unpkg.com/three@0.165.0/build/three.module.js" } }</script>',
            icon: 'fas fa-cube'
        },
        {
            name: 'GSAP (GreenSock)',
            category: 'Animation Library',
            version: '3.12.5',
            url: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>',
            icon: 'fas fa-star'
        },
        {
            name: 'Marked.js',
            category: 'Markdown Parser',
            version: '4.0.12',
            url: '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>',
            icon: 'fab fa-markdown'
        },
        {
            name: 'QR Code Generator',
            category: 'Utility',
            version: '1.5.1',
            url: '<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>',
            icon: 'fas fa-qrcode'
        },
        {
            name: 'Axios',
            category: 'JavaScript Library',
            version: '1.6.7',
            url: '<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>',
            icon: 'fas fa-network-wired'
        },
        {
            name: 'Lodash',
            category: 'JavaScript Utility',
            version: '4.17.21',
            url: '<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>',
            icon: 'fas fa-toolbox'
        },
        {
            name: 'Moment.js',
            category: 'Date Library',
            version: '2.29.4',
            url: '<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>',
            icon: 'fas fa-calendar-alt'
        },
        {
            name: 'D3.js',
            category: 'Data Visualization',
            version: '7.9.0',
            url: '<script src="https://d3js.org/d3.v7.min.js"></script>',
            icon: 'fas fa-chart-bar'
        },
        {
            name: 'Chart.js',
            category: 'Data Visualization',
            version: '4.4.2',
            url: '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>',
            icon: 'fas fa-chart-pie'
        },
        {
            name: 'Swiper',
            category: 'Slider Library',
            version: '11.1.1',
            url: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>',
            icon: 'fas fa-images'
        },
        {
            name: 'Animate.css',
            category: 'CSS Animation',
            version: '4.1.1',
            url: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />',
            icon: 'fas fa-magic'
        },
        {
            name: 'Typed.js',
            category: 'Text Animation',
            version: '2.1.0',
            url: '<script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>',
            icon: 'fas fa-font'
        },
        {
            name: 'Particles.js',
            category: 'Animation Library',
            version: '2.0.0',
            url: '<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>',
            icon: 'fas fa-atom'
        },
        {
            name: 'FullCalendar',
            category: 'Calendar Library',
            version: '6.1.11',
            url: '<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js"></script>',
            icon: 'fas fa-calendar-check'
        },
        {
            name: 'Leaflet',
            category: 'Mapping Library',
            version: '1.9.4',
            url: '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\n<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>',
            icon: 'fas fa-map-marked-alt'
        },
        {
            name: 'SweetAlert2',
            category: 'UI Library',
            version: '11.10.8',
            url: '<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>',
            icon: 'fas fa-bell'
        },
        {
            name: 'Toastify-JS',
            category: 'UI Library',
            version: '1.12.0',
            url: '<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">\n<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>',
            icon: 'fas fa-comment-alt'
        },
        {
            name: 'SortableJS',
            category: 'Utility',
            version: '1.15.2',
            url: '<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js"></script>',
            icon: 'fas fa-sort'
        },
        {
            name: 'Cropper.js',
            category: 'Image Processing',
            version: '1.10.0',
            url: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.10.0/cropper.min.css" />\n<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.10.0/cropper.min.js"></script>',
            icon: 'fas fa-crop-alt'
        }
    ];

    function renderList(items) {
        container.innerHTML = '';
        if (items.length === 0) {
            container.innerHTML = '<p class="text-center">見つかりませんでした。</p>';
            return;
        }

        items.forEach(item => {
            const iconHtml = item.icon ? `<i class="${item.icon} fa-2x me-3 text-muted"></i>` : '';
            const itemEl = document.createElement('div');
            itemEl.className = 'list-group-item d-flex align-items-center';

            // Extract URL from script/link tag
            let extractedUrl = '';
            const urlMatchScript = item.url.match(/src="(.*?)"/);
            const urlMatchLink = item.url.match(/href="(.*?)"/);
            if (urlMatchScript && urlMatchScript[1]) {
                extractedUrl = urlMatchScript[1];
            } else if (urlMatchLink && urlMatchLink[1]) {
                extractedUrl = urlMatchLink[1];
            }

            itemEl.innerHTML = `
                ${iconHtml}
                <div class="flex-grow-1">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${item.name}</h5>
                        <small>${item.category} / v${item.version}</small>
                    </div>
                    <div class="mt-2">
                        <pre class="bg-light p-2 rounded"><code>${item.url.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                        <button class="btn btn-sm btn-outline-secondary copy-cdn-btn">コードをコピー</button>
                        ${extractedUrl ? `<button class="btn btn-sm btn-outline-info ms-2 copy-url-only-btn" data-url="${extractedUrl}">URLのみコピー</button>` : ''}
                    </div>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-cdn-btn')) {
            const pre = e.target.previousElementSibling;
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                e.target.textContent = 'コピーしました！';
                setTimeout(() => {
                    e.target.textContent = 'コードをコピー';
                }, 1500);
            });
        } else if (e.target.classList.contains('copy-url-only-btn')) {
            const urlToCopy = e.target.dataset.url;
            navigator.clipboard.writeText(urlToCopy).then(() => {
                e.target.textContent = 'コピーしました！';
                setTimeout(() => {
                    e.target.textContent = 'URLのみコピー';
                }, 1500);
            });
        }
    });

    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = cdnData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm)
        );
        renderList(filtered);
    });

    // 初期表示
    renderList(cdnData);
});