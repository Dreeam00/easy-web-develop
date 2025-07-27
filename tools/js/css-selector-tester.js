document.addEventListener('DOMContentLoaded', () => {
    const htmlInput = document.getElementById('html-input');
    const selectorInput = document.getElementById('selector-input');
    const testSelectorBtn = document.getElementById('test-selector-btn');
    const previewArea = document.getElementById('preview-area');
    const matchCountSpan = document.getElementById('match-count');
    const matchedElementsList = document.getElementById('matched-elements-list');

    function testSelector() {
        const htmlContent = htmlInput.value;
        const selector = selectorInput.value.trim();

        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Clear previous highlights
        const oldHighlights = tempDiv.querySelectorAll('.highlighted-element');
        oldHighlights.forEach(el => {
            el.classList.remove('highlighted-element');
        });

        let matches = [];
        try {
            matches = tempDiv.querySelectorAll(selector);
        } catch (e) {
            previewArea.innerHTML = `<p class="text-danger">無効なセレクターです: ${e.message}</p>`;
            matchCountSpan.textContent = '0';
            matchedElementsList.innerHTML = '';
            return;
        }

        matchCountSpan.textContent = matches.length;

        let matchedListHtml = '';
        matches.forEach((el, index) => {
            el.classList.add('highlighted-element');
            matchedListHtml += `<p>${index + 1}. &lt;${el.tagName.toLowerCase()}&gt; ${el.id ? '#' + el.id : ''} ${el.className ? '.' + el.className.split(' ').join('.') : ''}</p>`;
        });

        previewArea.innerHTML = tempDiv.innerHTML;
        matchedElementsList.innerHTML = matchedListHtml;
    }

    testSelectorBtn.addEventListener('click', testSelector);
    htmlInput.addEventListener('input', testSelector);
    selectorInput.addEventListener('input', testSelector);

    // Initial test
    testSelector();
});