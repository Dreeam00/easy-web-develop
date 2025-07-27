document.addEventListener('DOMContentLoaded', () => {
    const baseFontSizeInput = document.getElementById('base-font-size');
    const inputValueInput = document.getElementById('input-value');
    const inputUnitSelect = document.getElementById('input-unit');
    const outputUnitSelect = document.getElementById('output-unit');
    const outputValueInput = document.getElementById('output-value');
    const convertBtn = document.getElementById('convert-btn');

    function convertUnits() {
        const baseSize = parseFloat(baseFontSizeInput.value) || 16;
        const inputValue = parseFloat(inputValueInput.value);
        const inputUnit = inputUnitSelect.value;
        const outputUnit = outputUnitSelect.value;

        if (isNaN(inputValue)) {
            outputValueInput.value = '';
            return;
        }

        let pxValue;

        // Convert input to px first
        switch (inputUnit) {
            case 'px':
                pxValue = inputValue;
                break;
            case 'rem':
                pxValue = inputValue * baseSize;
                break;
            case 'em':
                // Em conversion is tricky as it depends on parent font size.
                // For simplicity, we'll assume it's relative to base font size here.
                pxValue = inputValue * baseSize;
                break;
            case 'pt':
                pxValue = inputValue * (96 / 72); // 1pt = 1/72 inch, 1 inch = 96px
                break;
            case 'percent':
                pxValue = inputValue / 100 * baseSize; // Assuming percentage of base font size
                break;
            default:
                pxValue = inputValue;
        }

        let result;

        // Convert from px to output unit
        switch (outputUnit) {
            case 'px':
                result = pxValue;
                break;
            case 'rem':
                result = pxValue / baseSize;
                break;
            case 'em':
                result = pxValue / baseSize;
                break;
            case 'pt':
                result = pxValue * (72 / 96);
                break;
            case 'percent':
                result = (pxValue / baseSize) * 100;
                break;
            default:
                result = pxValue;
        }

        outputValueInput.value = result.toFixed(4);
    }

    convertBtn.addEventListener('click', convertUnits);
    baseFontSizeInput.addEventListener('input', convertUnits);
    inputValueInput.addEventListener('input', convertUnits);
    inputUnitSelect.addEventListener('change', convertUnits);
    outputUnitSelect.addEventListener('change', convertUnits);

    // Initial conversion
    convertUnits();
});