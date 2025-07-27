document.addEventListener('DOMContentLoaded', () => {
    const minifyBtn = document.getElementById('minify-btn');
    const copyBtn = document.getElementById('copy-css-btn');
    const cssInput = document.getElementById('css-input');
    const cssOutput = document.getElementById('css-output');
    const originalSizeSpan = document.getElementById('original-size');
    const minifiedSizeSpan = document.getElementById('minified-size');
    const reductionRateSpan = document.getElementById('reduction-rate');

    function minifyCSS() {
        let css = cssInput.value;
        const originalSize = new TextEncoder().encode(css).length; // Get byte size

        // 1. コメントを削除
        css = css.replace(/\/\*[\s\S]*?\*\//g, '');
        // 2. 改行とタブを削除
        css = css.replace(/[\r\n\t]/g, '');
        // 3. 複数のスペースを1つに
        css = css.replace(/\s{2,}/g, ' ');
        // 4. { } ; : の前後のスペースを削除
        css = css.replace(/\s*([;:{},])\s*/g, '$1');
        // 5. 最後のセミコロンを削除
        css = css.replace(/;}/g, '}');

        const minifiedCss = css.trim();
        const minifiedSize = new TextEncoder().encode(minifiedCss).length; // Get byte size

        cssOutput.value = minifiedCss;

        originalSizeSpan.textContent = `元のサイズ: ${originalSize} バイト`;
        minifiedSizeSpan.textContent = `圧縮後サイズ: ${minifiedSize} バイト`;

        if (originalSize > 0) {
            const reductionRate = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
            reductionRateSpan.textContent = `削減率: ${reductionRate}%`;
        } else {
            reductionRateSpan.textContent = `削減率: 0.00%`;
        }
    }

    minifyBtn.addEventListener('click', minifyCSS);

    copyBtn.addEventListener('click', () => {
        if (cssOutput.value) {
            navigator.clipboard.writeText(cssOutput.value).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });

    cssInput.addEventListener('input', () => {
        // Clear stats when input changes
        originalSizeSpan.textContent = '';
        minifiedSizeSpan.textContent = '';
        reductionRateSpan.textContent = '';
    });
});