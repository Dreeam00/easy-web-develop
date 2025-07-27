document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-text-btn');
    const generateTypeSelect = document.getElementById('generate-type');
    const countInput = document.getElementById('count');
    const outputDiv = document.getElementById('output-text');

    const loremIpsumBase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    // Split base text into sentences and words for more flexible generation
    const sentences = loremIpsumBase.match(/[^.!?]+[.!?]*/g) || [];
    const words = loremIpsumBase.match(/\b\w+\b/g) || [];

    function generateText() {
        const type = generateTypeSelect.value;
        const count = parseInt(countInput.value, 10);

        if (isNaN(count) || count <= 0) {
            outputDiv.innerHTML = '<p class="text-danger">有効な数を入力してください。</p>';
            return;
        }

        let result = '';

        switch (type) {
            case 'paragraphs':
                for (let i = 0; i < count; i++) {
                    result += `<p>${loremIpsumBase}</p>`;
                }
                break;
            case 'sentences':
                for (let i = 0; i < count; i++) {
                    result += sentences[i % sentences.length] + ' ';
                }
                result = `<p>${result.trim()}</p>`;
                break;
            case 'words':
                for (let i = 0; i < count; i++) {
                    result += words[i % words.length] + ' ';
                }
                result = `<p>${result.trim()}</p>`;
                break;
            default:
                result = '<p class="text-danger">無効な生成単位です。</p>';
        }
        outputDiv.innerHTML = result;
    }

    generateBtn.addEventListener('click', generateText);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputDiv.innerText).then(() => {
            copyBtn.textContent = 'コピーしました！';
            setTimeout(() => {
                copyBtn.textContent = 'テキストをコピー';
            }, 1500);
        });
    });

    // Initial display
    generateText();
});