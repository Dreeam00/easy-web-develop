document.addEventListener('DOMContentLoaded', () => {
    const beautifyBtn = document.getElementById('beautify-btn');
    const minifyBtn = document.getElementById('minify-btn');
    const copyBtn = document.getElementById('copy-btn');

    const inputEditor = CodeMirror.fromTextArea(document.getElementById('js-input'), {
        mode: "javascript",
        lineNumbers: true,
        theme: "dracula"
    });

    const outputEditor = CodeMirror.fromTextArea(document.getElementById('js-output'), {
        mode: "javascript",
        lineNumbers: true,
        readOnly: true,
        theme: "dracula"
    });

    beautifyBtn.addEventListener('click', () => {
        const code = inputEditor.getValue();
        try {
            outputEditor.setValue(js_beautify(code, { indent_size: 4, space_in_empty_paren: true }));
        } catch (e) {
            outputEditor.setValue('整形エラー: ' + e.message);
        }
    });

    minifyBtn.addEventListener('click', () => {
        const code = inputEditor.getValue();
        try {
            const result = UglifyJS.minify(code);
            if (result.error) {
                outputEditor.setValue('圧縮エラー: ' + result.error.message);
            } else {
                outputEditor.setValue(result.code);
            }
        } catch (e) {
            outputEditor.setValue('圧縮エラー: ' + e.message);
        }
    });

    copyBtn.addEventListener('click', () => {
        const outputValue = outputEditor.getValue();
        if (outputValue) {
            navigator.clipboard.writeText(outputValue).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });
});