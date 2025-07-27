document.addEventListener('DOMContentLoaded', () => {
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const textInput = document.getElementById('text');
    const bgColorInput = document.getElementById('bg-color');
    const textColorInput = document.getElementById('text-color');
    const generateBtn = document.getElementById('generate-btn');
    const placeholderImagePreview = document.getElementById('placeholder-image-preview');
    const imageUrlInput = document.getElementById('image-url');
    const copyUrlBtn = document.getElementById('copy-url-btn');
    const downloadImageBtn = document.getElementById('download-image-btn');
    const imgTagOutput = document.getElementById('img-tag-output');
    const copyImgTagBtn = document.getElementById('copy-img-tag-btn');

    function generatePlaceholder() {
        const width = widthInput.value;
        const height = heightInput.value;
        const text = textInput.value.trim();
        const bgColor = bgColorInput.value.substring(1); // Remove #
        const textColor = textColorInput.value.substring(1); // Remove #

        let imageUrl = `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}`;
        if (text) {
            imageUrl += `?text=${encodeURIComponent(text)}`;
        }

        placeholderImagePreview.src = imageUrl;
        imageUrlInput.value = imageUrl;
        imgTagOutput.textContent = `<img src="${imageUrl}" alt="Placeholder Image" width="${width}" height="${height}">`;
    }

    generateBtn.addEventListener('click', generatePlaceholder);

    copyUrlBtn.addEventListener('click', () => {
        if (imageUrlInput.value) {
            navigator.clipboard.writeText(imageUrlInput.value).then(() => {
                copyUrlBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyUrlBtn.textContent = 'URLをコピー';
                }, 1500);
            });
        }
    });

    downloadImageBtn.addEventListener('click', () => {
        if (placeholderImagePreview.src) {
            const link = document.createElement('a');
            link.href = placeholderImagePreview.src;
            link.download = `placeholder_${widthInput.value}x${heightInput.value}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    copyImgTagBtn.addEventListener('click', () => {
        if (imgTagOutput.textContent) {
            navigator.clipboard.writeText(imgTagOutput.textContent).then(() => {
                copyImgTagBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyImgTagBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });

    // Initial generation
    generatePlaceholder();
});