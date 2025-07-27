document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const previewImage = document.getElementById('preview-image');
    const generateFaviconsBtn = document.getElementById('generate-favicons-btn');
    const faviconOutput = document.getElementById('favicon-output');
    const downloadZipBtn = document.getElementById('download-zip-btn');

    let uploadedImage = null;

    const faviconSizes = [16, 24, 32, 48, 64, 96, 128, 192, 256, 512];

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImage.src = event.target.result;
                uploadedImage = event.target.result;
                faviconOutput.innerHTML = '';
                downloadZipBtn.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    generateFaviconsBtn.addEventListener('click', () => {
        if (!uploadedImage) {
            alert('画像をアップロードしてください。');
            return;
        }

        faviconOutput.innerHTML = '';
        const zip = new JSZip();
        const img = new Image();
        img.src = uploadedImage;

        img.onload = () => {
            faviconSizes.forEach(size => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, size, size);

                const dataURL = canvas.toDataURL('image/png');
                const blob = dataURLToBlob(dataURL);

                zip.file(`favicon-${size}x${size}.png`, blob);

                const faviconItem = `
                    <div class="favicon-item">
                        <img src="${dataURL}" width="${size}" height="${size}" alt="${size}x${size}">
                        <small>${size}x${size}</small>
                    </div>
                `;
                faviconOutput.innerHTML += faviconItem;
            });

            // Generate .ico (basic support, might not be perfect)
            const canvasIco = document.createElement('canvas');
            canvasIco.width = 64; // Common size for .ico
            canvasIco.height = 64;
            const ctxIco = canvasIco.getContext('2d');
            ctxIco.drawImage(img, 0, 0, 64, 64);
            canvasIco.toBlob(function(blob) {
                zip.file("favicon.ico", blob);
            });

            downloadZipBtn.style.display = 'block';
        };
    });

    downloadZipBtn.addEventListener('click', () => {
        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "favicons.zip");
        });
    });

    function dataURLToBlob(dataurl) {
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
