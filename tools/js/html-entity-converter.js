document.addEventListener('DOMContentLoaded', () => {
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const copyBtn = document.getElementById('copy-btn');
    const inputTextarea = document.getElementById('input-text');
    const outputTextarea = document.getElementById('output-text');

    function encodeHtmlEntities(text) {
        return text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;')
                   .replace(/'/g, '&#039;');
    }

    function decodeHtmlEntities(text) {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        return doc.documentElement.textContent;
    }

    encodeBtn.addEventListener('click', () => {
        outputTextarea.value = encodeHtmlEntities(inputTextarea.value);
    });

    decodeBtn.addEventListener('click', () => {
        outputTextarea.value = decodeHtmlEntities(inputTextarea.value);
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

    // Real-time conversion (optional, can be heavy for large inputs)
    // inputTextarea.addEventListener('input', () => {
    //     // Decide whether to encode or decode by default for real-time
    //     // For now, keep it button-triggered for clarity
    // });
});