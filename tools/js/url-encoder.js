document.addEventListener('DOMContentLoaded', () => {
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const copyBtn = document.getElementById('copy-url-btn');
    const inputArea = document.getElementById('input-url');
    const outputArea = document.getElementById('output-url');
    const encodeTypeSelect = document.getElementById('encode-type');

    encodeBtn.addEventListener('click', () => {
        const encodeType = encodeTypeSelect.value;
        try {
            if (encodeType === 'encodeURIComponent') {
                outputArea.value = encodeURIComponent(inputArea.value);
            } else if (encodeType === 'encodeURI') {
                outputArea.value = encodeURI(inputArea.value);
            }
        } catch (e) {
            outputArea.value = 'エンコードエラー: ' + e.message;
        }
    });

    decodeBtn.addEventListener('click', () => {
        try {
            // decodeURIComponentとdecodeURIはどちらも同じ関数でデコード可能
            outputArea.value = decodeURIComponent(inputArea.value);
        } catch (e) {
            outputArea.value = 'デコードエラー: ' + e.message;
        }
    });

    copyBtn.addEventListener('click', () => {
        if (outputArea.value) {
            navigator.clipboard.writeText(outputArea.value).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });
});