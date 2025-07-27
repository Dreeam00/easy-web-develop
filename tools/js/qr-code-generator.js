document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-qr-btn');
    const downloadBtn = document.getElementById('download-qr-btn');
    const textInput = document.getElementById('qr-text');
    const qrSizeInput = document.getElementById('qr-size');
    const qrColorDarkInput = document.getElementById('qr-color-dark');
    const qrColorLightInput = document.getElementById('qr-color-light');
    const qrContainer = document.getElementById('qr-code-container');
    const canvas = document.getElementById('qr-canvas');

    generateBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
            alert('テキストまたはURLを入力してください。');
            return;
        }

        const size = parseInt(qrSizeInput.value, 10);
        const colorDark = qrColorDarkInput.value;
        const colorLight = qrColorLightInput.value;

        QRCode.toCanvas(canvas, text, {
            width: size,
            errorCorrectionLevel: 'H',
            color: {
                dark: colorDark,
                light: colorLight
            }
        }, (error) => {
            if (error) {
                console.error(error);
                alert('QRコードの生成に失敗しました。');
                return;
            }
            qrContainer.classList.remove('d-none');
            downloadBtn.href = canvas.toDataURL('image/png');
        });
    });
});