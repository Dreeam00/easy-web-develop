document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-css-btn');

    const controls = {
        gridTemplateColumns: document.getElementById('grid-template-columns'),
        gridTemplateRows: document.getElementById('grid-template-rows'),
        gap: document.getElementById('gap'),
        justifyItems: document.getElementById('justify-items'),
        alignItems: document.getElementById('align-items'),
        justifyContent: document.getElementById('justify-content'),
        alignContent: document.getElementById('align-content')
    };

    function updateGrid() {
        const styles = {};
        styles['grid-template-columns'] = controls.gridTemplateColumns.value;
        styles['grid-template-rows'] = controls.gridTemplateRows.value;
        styles['gap'] = controls.gap.value;
        styles['justify-items'] = controls.justifyItems.value;
        styles['align-items'] = controls.alignItems.value;
        styles['justify-content'] = controls.justifyContent.value;
        styles['align-content'] = controls.alignContent.value;

        // Apply styles to container
        for (const prop in styles) {
            gridContainer.style[prop] = styles[prop];
        }

        // Generate CSS code
        let cssCode = `display: grid;\n`;
        for (const prop in styles) {
            cssCode += `  ${prop}: ${styles[prop]};\n`;
        }
        cssOutput.textContent = cssCode;
    }

    // Attach event listeners
    for (const control in controls) {
        controls[control].addEventListener('input', updateGrid);
    }

    // Initial update
    updateGrid();

    // Copy button
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.textContent).then(() => {
            copyBtn.textContent = 'コピーしました！';
            setTimeout(() => {
                copyBtn.textContent = 'コードをコピー';
            }, 1500);
        });
    });
});