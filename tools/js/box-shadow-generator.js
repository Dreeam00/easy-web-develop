document.addEventListener('DOMContentLoaded', () => {
    const shadowLayersContainer = document.getElementById('shadow-layers-container');
    const addShadowBtn = document.getElementById('add-shadow-btn');
    const previewBox = document.getElementById('preview-box');
    const cssOutput = document.getElementById('css-output-shadow');
    const copyBtn = document.getElementById('copy-shadow-btn');

    let shadowLayers = [];

    function renderShadowLayers() {
        shadowLayersContainer.innerHTML = '';
        shadowLayers.forEach((layer, index) => {
            const layerHtml = `
                <div class="shadow-layer-controls mb-3" data-index="${index}">
                    <h6 class="d-flex justify-content-between align-items-center">
                        <span>影レイヤー ${index + 1}</span>
                        <button class="btn btn-sm btn-danger remove-shadow-btn"><i class="fas fa-trash"></i></button>
                    </h6>
                    <div class="mb-3">
                        <label for="h-offset-${index}" class="form-label">水平オフセット: <span class="h-offset-value">${layer.hOffset}</span>px</label>
                        <input type="range" class="form-range h-offset-input" id="h-offset-${index}" min="-50" max="50" value="${layer.hOffset}">
                    </div>
                    <div class="mb-3">
                        <label for="v-offset-${index}" class="form-label">垂直オフセット: <span class="v-offset-value">${layer.vOffset}</span>px</label>
                        <input type="range" class="form-range v-offset-input" id="v-offset-${index}" min="-50" max="50" value="${layer.vOffset}">
                    </div>
                    <div class="mb-3">
                        <label for="blur-${index}" class="form-label">ぼかし: <span class="blur-value">${layer.blur}</span>px</label>
                        <input type="range" class="form-range blur-input" id="blur-${index}" min="0" max="100" value="${layer.blur}">
                    </div>
                    <div class="mb-3">
                        <label for="spread-${index}" class="form-label">広がり: <span class="spread-value">${layer.spread}</span>px</label>
                        <input type="range" class="form-range spread-input" id="spread-${index}" min="-50" max="50" value="${layer.spread}">
                    </div>
                    <div class="mb-3">
                        <label for="shadow-color-${index}" class="form-label">影の色</label>
                        <input type="color" id="shadow-color-${index}" class="form-control form-control-color shadow-color-input" value="${layer.color}">
                    </div>
                    <div class="form-check">
                        <input class="form-check-input inset-input" type="checkbox" id="inset-${index}" ${layer.inset ? 'checked' : ''}>
                        <label class="form-check-label" for="inset-${index}">内側の影 (inset)</label>
                    </div>
                </div>
            `;
            shadowLayersContainer.innerHTML += layerHtml;
        });

        attachEventListenersToLayers();
        generateBoxShadow();
    }

    function attachEventListenersToLayers() {
        shadowLayersContainer.querySelectorAll('.shadow-layer-controls').forEach(layerEl => {
            const index = parseInt(layerEl.dataset.index);

            layerEl.querySelector('.h-offset-input').addEventListener('input', (e) => {
                shadowLayers[index].hOffset = e.target.value;
                layerEl.querySelector('.h-offset-value').textContent = e.target.value;
                generateBoxShadow();
            });
            layerEl.querySelector('.v-offset-input').addEventListener('input', (e) => {
                shadowLayers[index].vOffset = e.target.value;
                layerEl.querySelector('.v-offset-value').textContent = e.target.value;
                generateBoxShadow();
            });
            layerEl.querySelector('.blur-input').addEventListener('input', (e) => {
                shadowLayers[index].blur = e.target.value;
                layerEl.querySelector('.blur-value').textContent = e.target.value;
                generateBoxShadow();
            });
            layerEl.querySelector('.spread-input').addEventListener('input', (e) => {
                shadowLayers[index].spread = e.target.value;
                layerEl.querySelector('.spread-value').textContent = e.target.value;
                generateBoxShadow();
            });
            layerEl.querySelector('.shadow-color-input').addEventListener('input', (e) => {
                shadowLayers[index].color = e.target.value;
                generateBoxShadow();
            });
            layerEl.querySelector('.inset-input').addEventListener('change', (e) => {
                shadowLayers[index].inset = e.target.checked;
                generateBoxShadow();
            });
            layerEl.querySelector('.remove-shadow-btn').addEventListener('click', () => {
                if (shadowLayers.length > 1) { // 少なくとも1つの影は残す
                    shadowLayers.splice(index, 1);
                    renderShadowLayers();
                }
            });
        });
    }

    function generateBoxShadow() {
        const cssValues = shadowLayers.map(layer => {
            const i = layer.inset ? 'inset' : '';
            return `${i} ${layer.hOffset}px ${layer.vOffset}px ${layer.blur}px ${layer.spread}px ${layer.color}`.trim();
        });
        const finalCss = `box-shadow: ${cssValues.join(', ')};`;
        previewBox.style.boxShadow = cssValues.join(', ');
        cssOutput.textContent = finalCss;
    }

    addShadowBtn.addEventListener('click', () => {
        shadowLayers.push({
            hOffset: 0,
            vOffset: 0,
            blur: 10,
            spread: 0,
            color: '#000000',
            inset: false
        });
        renderShadowLayers();
    });

    // Initial setup
    if (shadowLayers.length === 0) {
        shadowLayers.push({
            hOffset: 10,
            vOffset: 10,
            blur: 20,
            spread: 5,
            color: '#000000',
            inset: false
        });
    }
    renderShadowLayers();

    // Copy button
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.textContent).then(() => {
            copyBtn.textContent = 'コピーしました！';
            setTimeout(() => {
                copyBtn.textContent = 'コードをコピー';
            }, 1500);
        });
    });
});