document.addEventListener('DOMContentLoaded', () => {
    const foregroundColorInput = document.getElementById('foreground-color');
    const backgroundColorInput = document.getElementById('background-color');
    const previewText = document.getElementById('preview-text');
    const fontSizeSelect = document.getElementById('font-size-select');
    const fontWeightSelect = document.getElementById('font-weight-select');
    const contrastRatioSpan = document.getElementById('contrast-ratio');
    const aaResultDiv = document.getElementById('aa-result');
    const aaaResultDiv = document.getElementById('aaa-result');

    function checkContrast() {
        const fgColor = tinycolor(foregroundColorInput.value);
        const bgColor = tinycolor(backgroundColorInput.value);

        previewText.style.color = fgColor.toHexString();
        previewText.style.backgroundColor = bgColor.toHexString();

        const contrast = tinycolor.readability(fgColor, bgColor);
        contrastRatioSpan.textContent = contrast.toFixed(2) + ':1';

        const isLargeText = fontSizeSelect.value === 'large' || (fontSizeSelect.value === 'small' && fontWeightSelect.value === 'bold');

        // WCAG AA
        if ((isLargeText && contrast >= 3) || (!isLargeText && contrast >= 4.5)) {
            aaResultDiv.className = 'result-box pass';
            aaResultDiv.textContent = 'AAレベル: 合格';
        } else {
            aaResultDiv.className = 'result-box fail';
            aaResultDiv.textContent = 'AAレベル: 不合格';
        }

        // WCAG AAA
        if ((isLargeText && contrast >= 4.5) || (!isLargeText && contrast >= 7)) {
            aaaResultDiv.className = 'result-box pass';
            aaaResultDiv.textContent = 'AAAレベル: 合格';
        } else {
            aaaResultDiv.className = 'result-box fail';
            aaaResultDiv.textContent = 'AAAレベル: 不合格';
        }
    }

    foregroundColorInput.addEventListener('input', checkContrast);
    backgroundColorInput.addEventListener('input', checkContrast);
    fontSizeSelect.addEventListener('change', checkContrast);
    fontWeightSelect.addEventListener('change', checkContrast);

    // Initial check
    checkContrast();
});
