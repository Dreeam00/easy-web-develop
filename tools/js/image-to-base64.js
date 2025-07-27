document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image-input');
    const previewImg = document.getElementById('preview-img');
    const base64Output = document.getElementById('base64-output');
    const imgTagOutput = document.getElementById('img-tag-output');
    const cssBgOutput = document.getElementById('css-bg-output');
    const copyBase64Btn = document.getElementById('copy-base64-btn');
    const copyImgTagBtn = document.getElementById('copy-img-tag-btn');
    const copyCssBgBtn = document.getElementById('copy-css-bg-btn');

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const base64String = e.target.result;
            previewImg.src = base64String;
            base64Output.value = base64String;

            // Generate <img> tag
            imgTagOutput.textContent = `<img src="${base64String}" alt="Base64 Image">`;

            // Generate CSS background-image
            cssBgOutput.textContent = `background-image: url('${base64String}');`;
        };

        reader.onerror = (e) => {
            base64Output.value = "ファイルの読み込みに失敗しました。";
            imgTagOutput.textContent = "";
            cssBgOutput.textContent = "";
            console.error("File reading error", e);
        }

        reader.readAsDataURL(file);
    });

    function copyToClipboard(element, button) {
        if (element.value || element.textContent) {
            const textToCopy = element.value || element.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = 'コピーしました！';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 1500);
            });
        }
    }

    copyBase64Btn.addEventListener('click', () => copyToClipboard(base64Output, copyBase64Btn));
    copyImgTagBtn.addEventListener('click', () => copyToClipboard(imgTagOutput, copyImgTagBtn));
    copyCssBgBtn.addEventListener('click', () => copyToClipboard(cssBgOutput, copyCssBgBtn));
});