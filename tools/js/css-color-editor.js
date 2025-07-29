document.addEventListener('DOMContentLoaded', () => {
    const previewBox = document.querySelector('.preview-box-color-editor');
    const cssOutput = document.getElementById('css-output-color-editor');

    const textColor = document.getElementById('text-color');
    const bgColor = document.getElementById('bg-color');
    const borderColor = document.getElementById('border-color');

    function updateColors() {
        previewBox.style.color = textColor.value;
        previewBox.style.backgroundColor = bgColor.value;
        previewBox.style.borderColor = borderColor.value;

        const styles = `
color: ${textColor.value};
background-color: ${bgColor.value};
border-color: ${borderColor.value};
        `;
        cssOutput.value = styles.trim();
    }

    [textColor, bgColor, borderColor].forEach(control => {
        control.addEventListener('input', updateColors);
    });

    updateColors();
});