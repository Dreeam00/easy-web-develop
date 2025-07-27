document.addEventListener('DOMContentLoaded', () => {
    const flexContainer = document.getElementById('flex-container');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-css-btn');

    const controls = {
        flexDirection: document.getElementById('flex-direction'),
        justifyContent: document.getElementById('justify-content'),
        alignItems: document.getElementById('align-items'),
        flexWrap: document.getElementById('flex-wrap'),
        alignContent: document.getElementById('align-content')
    };

    function updateFlexbox() {
        const styles = {};
        styles['flex-direction'] = controls.flexDirection.value;
        styles['justify-content'] = controls.justifyContent.value;
        styles['align-items'] = controls.alignItems.value;
        styles['flex-wrap'] = controls.flexWrap.value;
        styles['align-content'] = controls.alignContent.value;

        // Apply styles to container
        for (const prop in styles) {
            flexContainer.style[prop] = styles[prop];
        }

        // Generate CSS code
        let cssCode = `display: flex;\n`;
        for (const prop in styles) {
            cssCode += `  ${prop}: ${styles[prop]};\n`;
        }
        cssOutput.textContent = cssCode;
    }

    // Attach event listeners
    for (const control in controls) {
        controls[control].addEventListener('change', updateFlexbox);
    }

    // Initial update
    updateFlexbox();

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
