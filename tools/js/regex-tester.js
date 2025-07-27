document.addEventListener('DOMContentLoaded', () => {
    const regexPatternInput = document.getElementById('regex-pattern');
    const regexFlagsInput = document.getElementById('regex-flags');
    const testStringInput = document.getElementById('test-string');
    const testRegexBtn = document.getElementById('test-regex-btn');
    const matchResultsDiv = document.getElementById('match-results');
    const highlightedTextDiv = document.getElementById('highlighted-text');

    function testRegex() {
        const pattern = regexPatternInput.value;
        const flags = regexFlagsInput.value;
        const testString = testStringInput.value;

        matchResultsDiv.innerHTML = '';
        highlightedTextDiv.innerHTML = '';

        try {
            const regex = new RegExp(pattern, flags);
            let match;
            let results = [];
            let highlightedHtml = '';
            let lastIndex = 0;

            while ((match = regex.exec(testString)) !== null) {
                results.push(`マッチ: "${match[0]}" (インデックス: ${match.index})`);

                // For highlighting
                highlightedHtml += testString.substring(lastIndex, match.index);
                highlightedHtml += `<span class="highlight">${match[0]}</span>`;
                lastIndex = regex.lastIndex;

                if (!regex.global) { // If not global, break after first match
                    break;
                }
            }
            highlightedHtml += testString.substring(lastIndex);

            if (results.length === 0) {
                matchResultsDiv.textContent = 'マッチしませんでした。';
                highlightedTextDiv.textContent = testString;
            } else {
                matchResultsDiv.innerHTML = results.join('<br>');
                highlightedTextDiv.innerHTML = highlightedHtml;
            }

        } catch (e) {
            matchResultsDiv.textContent = `正規表現エラー: ${e.message}`;
            highlightedTextDiv.textContent = testString;
        }
    }

    testRegexBtn.addEventListener('click', testRegex);
    regexPatternInput.addEventListener('input', testRegex);
    regexFlagsInput.addEventListener('input', testRegex);
    testStringInput.addEventListener('input', testRegex);

    // Initial test
    testRegex();
});
