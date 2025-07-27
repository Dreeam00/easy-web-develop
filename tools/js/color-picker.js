document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-picker');
    const colorPreview = document.getElementById('color-preview');
    const hexCodeInput = document.getElementById('hex-code');
    const rgbCodeInput = document.getElementById('rgb-code');
    const hslCodeInput = document.getElementById('hsl-code');
    const copyButtons = document.querySelectorAll('.copy-code-btn');

    function updateColor(colorValue) {
        const color = tinycolor(colorValue);
        if (!color.isValid()) return;

        colorPreview.style.backgroundColor = color.toHexString();
        hexCodeInput.value = color.toHexString();
        rgbCodeInput.value = color.toRgbString();
        hslCodeInput.value = color.toHslString();
    }

    // Initial color setup
    updateColor(colorPicker.value);

    // Event listener for color picker
    colorPicker.addEventListener('input', (event) => {
        updateColor(event.target.value);
    });

    // Event listeners for copy buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            const targetInput = document.getElementById(targetId);
            navigator.clipboard.writeText(targetInput.value).then(() => {
                const originalText = event.target.textContent;
                event.target.textContent = 'コピーしました！';
                setTimeout(() => {
                    event.target.textContent = originalText;
                }, 1500);
            }).catch(err => {
                console.error('コピーに失敗しました', err);
                alert('コピーに失敗しました。');
            });
        });
    });
});