document.addEventListener('DOMContentLoaded', () => {
    const previewBox = document.querySelector('.preview-box-style-editor');
    const cssOutput = document.getElementById('css-output-style-editor');

    // Color controls
    const textColor = document.getElementById('text-color');
    const bgColor = document.getElementById('bg-color');
    const borderColor = document.getElementById('border-color');

    // Sizing controls
    const width = document.getElementById('width');
    const height = document.getElementById('height');
    const padding = document.getElementById('padding');
    const margin = document.getElementById('margin');
    const borderWidth = document.getElementById('border-width');

    function updateStyles() {
        const styles = `
            color: ${textColor.value};
            background-color: ${bgColor.value};
            border: ${borderWidth.value}px solid ${borderColor.value};
            width: ${width.value}px;
            height: ${height.value}px;
            padding: ${padding.value}px;
            margin: ${margin.value}px;
        `;

        previewBox.style.cssText = styles;
        cssOutput.value = styles.trim();
    }

    [textColor, bgColor, borderColor, width, height, padding, margin, borderWidth].forEach(control => {
        control.addEventListener('input', updateStyles);
    });

    updateStyles();
});
