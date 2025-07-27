document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const qualityRange = document.getElementById('quality-range');
    const qualityValueSpan = document.getElementById('quality-value');
    const compressBtn = document.getElementById('compress-btn');
    const originalImagePreview = document.getElementById('original-image-preview');
    const compressedImagePreview = document.getElementById('compressed-image-preview');
    const originalSizeSpan = document.getElementById('original-size');
    const compressedSizeSpan = document.getElementById('compressed-size');
    const reductionRateSpan = document.getElementById('reduction-rate');
    const downloadCompressedBtn = document.getElementById('download-compressed-btn');

    let originalFile = null;

    imageUpload.addEventListener('change', (e) => {
        originalFile = e.target.files[0];
        if (originalFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                originalImagePreview.src = event.target.result;
                originalSizeSpan.textContent = `${(originalFile.size / 1024).toFixed(2)} KB`;
                compressedImagePreview.src = '';
                compressedSizeSpan.textContent = '0 KB';
                reductionRateSpan.textContent = '0%';
                downloadCompressedBtn.style.display = 'none';
            };
            reader.readAsDataURL(originalFile);
        }
    });

    qualityRange.addEventListener('input', (e) => {
        qualityValueSpan.textContent = e.target.value;
    });

    compressBtn.addEventListener('click', () => {
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

                // Set canvas dimensions to image dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw image on canvas
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Get compressed image data URL
                const quality = parseFloat(qualityRange.value) / 100;
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality); // JPEG for compression

                // Update compressed image preview
                compressedImagePreview.src = compressedDataUrl;

                // Calculate sizes and reduction rate
                const compressedBlob = dataURLtoBlob(compressedDataUrl);
                const compressedSize = compressedBlob.size;
                compressedSizeSpan.textContent = `${(compressedSize / 1024).toFixed(2)} KB`;

                const originalSize = originalFile.size;
                const reductionRate = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);
                reductionRateSpan.textContent = `${reductionRate}%`;

                // Enable download button
                downloadCompressedBtn.style.display = 'block';
                downloadCompressedBtn.href = compressedDataUrl;
                downloadCompressedBtn.download = `compressed_${originalFile.name}`;
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
