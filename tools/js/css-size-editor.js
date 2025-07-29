document.addEventListener('DOMContentLoaded', () => {
    const previewBox = document.querySelector('.preview-box-size-editor');
    const cssOutput = document.getElementById('css-output-size-editor');

    const width = document.getElementById('width');
    const height = document.getElementById('height');
    const padding = document.getElementById('padding');
    const margin = document.getElementById('margin');
    const borderWidth = document.getElementById('border-width');

    function updateSizes() {
        previewBox.style.width = `${width.value}px`;
        previewBox.style.height = `${height.value}px`;
        previewBox.style.padding = `${padding.value}px`;
        previewBox.style.margin = `${margin.value}px`;
        previewBox.style.borderWidth = `${borderWidth.value}px`;

        const styles = `
width: ${width.value}px;
height: ${height.value}px;
padding: ${padding.value}px;
margin: ${margin.value}px;
border-width: ${borderWidth.value}px;
        `;
        cssOutput.value = styles.trim();
    }

    [width, height, padding, margin, borderWidth].forEach(control => {
        control.addEventListener('input', updateSizes);
    });

    updateSizes();
});