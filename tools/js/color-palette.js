document.addEventListener('DOMContentLoaded', () => {
    const paletteContainer = document.getElementById('palette-container');
    const searchInput = document.getElementById('search-palette');

    const colorData = [
        {
            category: 'Material Design',
            colors: {
                'Red': '#F44336',
                'Pink': '#E91E63',
                'Purple': '#9C27B0',
                'Deep Purple': '#673AB7',
                'Indigo': '#3F51B5',
                'Blue': '#2196F3',
                'Light Blue': '#03A9F4',
                'Cyan': '#00BCD4',
                'Teal': '#009688',
                'Green': '#4CAF50',
                'Light Green': '#8BC34A',
                'Lime': '#CDDC39',
                'Yellow': '#FFEB3B',
                'Amber': '#FFC107',
                'Orange': '#FF9800',
                'Deep Orange': '#FF5722',
                'Brown': '#795548',
                'Grey': '#9E9E9E',
                'Blue Grey': '#607D8B',
                'Black': '#000000',
                'White': '#FFFFFF'
            }
        },
        {
            category: 'Web Safe Colors',
            colors: {
                'Aqua': '#00FFFF',
                'Fuchsia': '#FF00FF',
                'Lime': '#00FF00',
                'Maroon': '#800000',
                'Navy': '#000080',
                'Olive': '#808000',
                'Silver': '#C0C0C0',
                'Teal': '#008080'
            }
        }
    ];

    function renderPalette(filterText = '') {
        paletteContainer.innerHTML = '';
        const lowerCaseFilter = filterText.toLowerCase();

        colorData.forEach(categoryData => {
            let categoryHtml = '';
            let hasVisibleColors = false;

            for (const name in categoryData.colors) {
                const colorCode = categoryData.colors[name];
                if (name.toLowerCase().includes(lowerCaseFilter) || colorCode.toLowerCase().includes(lowerCaseFilter)) {
                    const textColor = tinycolor(colorCode).isLight() ? '#000' : '#fff';
                    categoryHtml += `
                        <div class="col-md-4 col-lg-3">
                            <div class="color-box" style="background-color: ${colorCode}; color: ${textColor};" data-color="${colorCode}">
                                <span>${name}<br>${colorCode}</span>
                            </div>
                        </div>
                    `;
                    hasVisibleColors = true;
                }
            }

            if (hasVisibleColors) {
                paletteContainer.innerHTML += `
                    <h4 class="mt-4">${categoryData.category}</h4>
                    <div class="row g-3 mb-4">
                        ${categoryHtml}
                    </div>
                `;
            }
        });

        if (paletteContainer.innerHTML === '') {
            paletteContainer.innerHTML = '<p class="text-center">該当する色が見つかりませんでした。</p>';
        }
    }

    // Initial render
    renderPalette();

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        renderPalette(e.target.value);
    });

    // Copy functionality (delegated)
    paletteContainer.addEventListener('click', (e) => {
        if (e.target.closest('.color-box')) {
            const colorBox = e.target.closest('.color-box');
            const codeToCopy = colorBox.dataset.color;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                const originalText = colorBox.innerHTML;
                colorBox.innerHTML = `<span>コピーしました！</span>`;
                setTimeout(() => {
                    colorBox.innerHTML = originalText;
                }, 1500);
            });
        }
    });
});