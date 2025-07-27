document.addEventListener('DOMContentLoaded', () => {
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const copyBtn = document.getElementById('copy-btn');
    const inputTextarea = document.getElementById('input-text');
    const outputTextarea = document.getElementById('output-text');

    encodeBtn.addEventListener('click', () => {
        const text = inputTextarea.value;
        outputTextarea.value = btoa(unescape(encodeURIComponent(text)));
    });

    decodeBtn.addEventListener('click', () => {
        const base64Text = inputTextarea.value;
        try {
            outputTextarea.value = decodeURIComponent(escape(atob(base64Text)));
        } catch (e) {
            outputTextarea.value = 'デコードエラー: 無効なBase64文字列です。';
        }
    });

    copyBtn.addEventListener('click', () => {
        if (outputTextarea.value) {
            navigator.clipboard.writeText(outputTextarea.value).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });
});
