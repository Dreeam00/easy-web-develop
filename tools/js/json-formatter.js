document.addEventListener('DOMContentLoaded', () => {
    const formatBtn = document.getElementById('format-btn');
    const copyBtn = document.getElementById('copy-json-btn');
    const statusSpan = document.getElementById('validation-status');

    // Initialize CodeMirror for input and output
    const inputEditor = CodeMirror.fromTextArea(document.getElementById('json-input'), {
        mode: "application/json",
        lineNumbers: true,
        theme: "dracula"
    });

    const outputEditor = CodeMirror.fromTextArea(document.getElementById('json-output'), {
        mode: "application/json",
        lineNumbers: true,
        readOnly: true,
        theme: "dracula"
    });

    function formatJson() {
        const inputText = inputEditor.getValue().trim();
        if (!inputText) {
            statusSpan.textContent = '入力が空です。';
            statusSpan.className = 'ms-3 text-warning';
            outputEditor.setValue('');
            return;
        }

        try {
            const parsedJson = JSON.parse(inputText);
            const formattedJson = JSON.stringify(parsedJson, null, 4); // 4スペースでインデント
            outputEditor.setValue(formattedJson);
            statusSpan.textContent = '有効なJSONです。';
            statusSpan.className = 'ms-3 text-success';
        } catch (error) {
            outputEditor.setValue('エラー: ' + error.message);
            statusSpan.textContent = '無効なJSONです。';
            statusSpan.className = 'ms-3 text-danger';
        }
    }

    formatBtn.addEventListener('click', formatJson);

    copyBtn.addEventListener('click', () => {
        const outputValue = outputEditor.getValue();
        if (outputValue && !outputValue.startsWith('エラー')) {
            navigator.clipboard.writeText(outputValue).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });
    
    inputEditor.on('change', () => {
        statusSpan.textContent = '';
        outputEditor.setValue('');
    });
});