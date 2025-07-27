document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convert-btn');
    const copyDataUrlBtn = document.getElementById('copy-data-url-btn');
    const copyCssBgBtn = document.getElementById('copy-css-bg-btn');
    const svgInput = document.getElementById('svg-input');
    const dataUrlOutput = document.getElementById('data-url-output');
    const svgPreview = document.getElementById('svg-preview');
    const cssBgOutput = document.getElementById('css-bg-output');

    function convertSvgToDataUrl() {
        const svgCode = svgInput.value.trim();
        if (!svgCode) {
            dataUrlOutput.value = '';
            svgPreview.innerHTML = '';
            cssBgOutput.textContent = '';
            return;
        }

        try {
            const encodedSvg = encodeURIComponent(svgCode)
                                .replace(/%20/g, ' ') // Preserve spaces for readability
                                .replace(/%2F/g, '/') // Preserve slashes
                                .replace(/%3D/g, '=') // Preserve equals
                                .replace(/%3A/g, ':') // Preserve colons
                                .replace(/%3B/g, ';') // Preserve semicolons
                                .replace(/%2C/g, ','); // Preserve commas

            const dataUrl = `data:image/svg+xml,${encodedSvg}`;
            dataUrlOutput.value = dataUrl;
            svgPreview.innerHTML = svgCode; // Display SVG directly for preview
            cssBgOutput.textContent = `background-image: url('${dataUrl}');`;
        } catch (e) {
            dataUrlOutput.value = '変換エラー: ' + e.message;
            svgPreview.innerHTML = '';
            cssBgOutput.textContent = '';
        }
    }

    convertBtn.addEventListener('click', convertSvgToDataUrl);
    svgInput.addEventListener('input', convertSvgToDataUrl); // Real-time conversion

    copyDataUrlBtn.addEventListener('click', () => {
        if (dataUrlOutput.value) {
            navigator.clipboard.writeText(dataUrlOutput.value).then(() => {
                copyDataUrlBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyDataUrlBtn.textContent = 'Data URLをコピー';
                }, 1500);
            });
        }
    });

    copyCssBgBtn.addEventListener('click', () => {
        if (cssBgOutput.textContent) {
            navigator.clipboard.writeText(cssBgOutput.textContent).then(() => {
                copyCssBgBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyCssBgBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });

    // Initial conversion
    convertSvgToDataUrl();
});