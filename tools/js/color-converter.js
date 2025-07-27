document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-input-picker');
    const hexInput = document.getElementById('hex-input');
    const rgbInput = document.getElementById('rgb-input');
    const hslInput = document.getElementById('hsl-input');

    const hexPreview = document.getElementById('hex-preview');
    const rgbPreview = document.getElementById('rgb-preview');
    const hslPreview = document.getElementById('hsl-preview');

    let activeInput = null;

    function updateColors(colorValue) {
        const color = tinycolor(colorValue);
        if (!color.isValid()) {
            // Clear previews if invalid
            hexPreview.style.backgroundColor = '';
            rgbPreview.style.backgroundColor = '';
            hslPreview.style.backgroundColor = '';
            return;
        }

        const hex = color.toHexString();
        const rgb = color.toRgbString();
        const hsl = color.toHslString();

        if (activeInput !== colorPicker) colorPicker.value = hex;
        if (activeInput !== hexInput) hexInput.value = hex;
        if (activeInput !== rgbInput) rgbInput.value = rgb;
        if (activeInput !== hslInput) hslInput.value = hsl;

        // Update previews
        hexPreview.style.backgroundColor = hex;
        rgbPreview.style.backgroundColor = rgb;
        hslPreview.style.backgroundColor = hsl;
    }

    colorPicker.addEventListener('input', (e) => {
        activeInput = colorPicker;
        updateColors(e.target.value);
    });

    hexInput.addEventListener('input', (e) => {
        activeInput = hexInput;
        updateColors(e.target.value);
    });

    rgbInput.addEventListener('input', (e) => {
        activeInput = rgbInput;
        updateColors(e.target.value);
    });

    hslInput.addEventListener('input', (e) => {
        activeInput = hslInput;
        updateColors(e.target.value);
    });

    // Set initial value
    activeInput = colorPicker;
    updateColors(colorPicker.value);
});