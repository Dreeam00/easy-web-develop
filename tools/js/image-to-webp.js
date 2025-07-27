document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const qualityRange = document.getElementById('quality-range');
    const qualityValueSpan = document.getElementById('quality-value');
    const convertBtn = document.getElementById('convert-btn');
    const originalImagePreview = document.getElementById('original-image-preview');
    const webpImagePreview = document.getElementById('webp-image-preview');
    const originalSizeSpan = document.getElementById('original-size');
    const webpSizeSpan = document.getElementById('webp-size');
    const reductionRateSpan = document.getElementById('reduction-rate');
    const downloadWebpBtn = document.getElementById('download-webp-btn');

    let originalFile = null;

    imageUpload.addEventListener('change', (e) => {
        originalFile = e.target.files[0];
        if (originalFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                originalImagePreview.src = event.target.result;
                originalSizeSpan.textContent = `${(originalFile.size / 1024).toFixed(2)} KB`;
                webpImagePreview.src = '';
                webpSizeSpan.textContent = '0 KB';
                reductionRateSpan.textContent = '0%';
                downloadWebpBtn.style.display = 'none';
            };
            reader.readAsDataURL(originalFile);
        }
    });

    qualityRange.addEventListener('input', (e) => {
        qualityValueSpan.textContent = e.target.value;
    });

    convertBtn.addEventListener('click', () => {
        if (!originalFile) {
            alert('画像をアップロードしてください。');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);

                const quality = parseFloat(qualityRange.value) / 100;
                const webpDataUrl = canvas.toDataURL('image/webp', quality);

                webpImagePreview.src = webpDataUrl;

                const webpBlob = dataURLtoBlob(webpDataUrl);
                const webpSize = webpBlob.size;
                webpSizeSpan.textContent = `${(webpSize / 1024).toFixed(2)} KB`;

                const originalSize = originalFile.size;
                const reductionRate = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
                reductionRateSpan.textContent = `${reductionRate}%`;

                downloadWebpBtn.style.display = 'block';
                downloadWebpBtn.href = webpDataUrl;
                downloadWebpBtn.download = `converted_${originalFile.name.split('.')[0]}.webp`;
            };
        };
        reader.readAsDataURL(originalFile);
    });

    function dataURLtoBlob(dataurl) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
});
