document.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('preview');
    const copyHtmlBtn = document.getElementById('copy-html-btn');

    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: "markdown",
        lineNumbers: true,
        theme: "dracula"
    });

    function updatePreview() {
        const markdownText = editor.getValue();
        preview.innerHTML = marked.parse(markdownText);
    }

    editor.on('change', updatePreview);

    copyHtmlBtn.addEventListener('click', () => {
        if (preview.innerHTML) {
            navigator.clipboard.writeText(preview.innerHTML).then(() => {
                copyHtmlBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyHtmlBtn.textContent = 'HTMLをコピー';
                }, 1500);
            });
        }
    });

    // Initial content
    editor.setValue(`# Welcome to Markdown Previewer\n\nThis is **bold** text and _italic_ text.\n\n## Lists\n\n* Item 1\n* Item 2\n\n```javascript\nconsole.log(\"Hello, World!\");\n```\n\n[Link to Google](https://www.google.com)\n\n![Image Alt Text](https://via.placeholder.com/150)`);
    updatePreview();
});