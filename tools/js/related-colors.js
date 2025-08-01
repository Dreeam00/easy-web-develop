document.addEventListener('DOMContentLoaded', () => {
    const baseColorInput = document.getElementById('base-color');
    const container = document.getElementById('related-colors-container');

    function generateRelatedColors() {
        const baseColor = baseColorInput.value;
        const color = tinycolor(baseColor);

        if (!color.isValid()) {
            container.innerHTML = '<p class="text-danger text-center">無効な色です。</p>';
            return;
        }

        const schemes = {
            '基準色': [color.toHexString()],
            '補色': [color.complement().toHexString()],
            '類似色': color.analogous().map(c => c.toHexString()),
            'トライアド (3色)': color.triad().map(c => c.toHexString()),
            'テトラッド (4色)': color.tetrad().map(c => c.toHexString()),
            'モノクロ (明)': [color.lighten(20).toHexString()],
            'モノクロ (暗)': [color.darken(20).toHexString()],
            'シェード': [
                color.darken(10).toHexString(),
                color.darken(20).toHexString(),
                color.darken(30).toHexString()
            ],
            'ティント': [
                color.lighten(10).toHexString(),
                color.lighten(20).toHexString(),
                color.lighten(30).toHexString()
            ]
        };

        let html = '';

        for (const [name, colors] of Object.entries(schemes)) {
            html += `<h4 class="mt-4">${name}</h4>`;
            html += '<div class="row g-3">';

            colors.forEach(c => {
                const textColor = tinycolor(c).isLight() ? '#000' : '#fff';
                html += `
                    <div class="col-md-3">
                        <div class="color-swatch" style="background-color: ${c}; color: ${textColor};" data-color="${c}">
                            <span>${c}</span>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
        }

        container.innerHTML = html;
    }

    generateRelatedColors();

    baseColorInput.addEventListener('input', generateRelatedColors);

    container.addEventListener('click', (e) => {
        const clickedSwatch = e.target.closest('.color-swatch');
        if (clickedSwatch) {
            const newBaseColor = clickedSwatch.dataset.color;
            baseColorInput.value = newBaseColor;
            generateRelatedColors();
        }
    });
});
