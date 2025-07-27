document.addEventListener('DOMContentLoaded', () => {
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const color1Preview = document.getElementById('color1-preview');
    const color2Preview = document.getElementById('color2-preview');
    const blendRatioInput = document.getElementById('blend-ratio');
    const ratioValueSpan = document.getElementById('ratio-value');
    const blendedColorPreview = document.getElementById('blended-color-preview');
    const blendedColorHexInput = document.getElementById('blended-color-hex');
    const blendedColorRgbInput = document.getElementById('blended-color-rgb');
    const blendedColorHslInput = document.getElementById('blended-color-hsl');
    const copyBlendedBtns = document.querySelectorAll('.copy-blended-btn');

    function updateBlendedColor() {
        const color1 = tinycolor(color1Input.value);
        const color2 = tinycolor(color2Input.value);
        const ratio = parseInt(blendRatioInput.value, 10);

        color1Preview.style.backgroundColor = color1.toHexString();
        color2Preview.style.backgroundColor = color2.toHexString();

        ratioValueSpan.textContent = `${ratio}:${100 - ratio}`;

        // Simple blending: interpolate RGB values
        const blendedR = Math.round((color1.toRgb().r * ratio + color2.toRgb().r * (100 - ratio)) / 100);
        const blendedG = Math.round((color1.toRgb().g * ratio + color2.toRgb().g * (100 - ratio)) / 100);
        const blendedB = Math.round((color1.toRgb().b * ratio + color2.toRgb().b * (100 - ratio)) / 100);

        const blendedColor = tinycolor({ r: blendedR, g: blendedG, b: blendedB });

        blendedColorPreview.style.backgroundColor = blendedColor.toHexString();
        blendedColorHexInput.value = blendedColor.toHexString();
        blendedColorRgbInput.value = blendedColor.toRgbString();
        blendedColorHslInput.value = blendedColor.toHslString();
    }

    color1Input.addEventListener('input', updateBlendedColor);
    color2Input.addEventListener('input', updateBlendedColor);
    blendRatioInput.addEventListener('input', updateBlendedColor);

    copyBlendedBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            const targetInput = document.getElementById(targetId);
            navigator.clipboard.writeText(targetInput.value).then(() => {
                const originalText = event.target.textContent;
                event.target.textContent = 'コピーしました！';
                setTimeout(() => {
                    event.target.textContent = originalText;
                }, 1500);
            });
        });
    });

    // Initial update
    updateBlendedColor();
});