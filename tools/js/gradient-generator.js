document.addEventListener('DOMContentLoaded', () => {
    const gradientTypeSelect = document.getElementById('gradient-type');
    const linearOptions = document.getElementById('linear-options');
    const radialOptions = document.getElementById('radial-options');
    const directionSelect = document.getElementById('direction');
    const angleInput = document.getElementById('angle');
    const radialShapeSelect = document.getElementById('radial-shape');
    const radialSizeSelect = document.getElementById('radial-size');
    const colorsContainer = document.getElementById('colors-container');
    const addColorBtn = document.getElementById('add-color-btn');
    const preview = document.getElementById('gradient-preview');
    const cssOutput = document.getElementById('css-output');
    const copyBtn = document.getElementById('copy-css-btn');

    function generateGradient() {
        const type = gradientTypeSelect.value;
        const colors = Array.from(colorsContainer.querySelectorAll('input[type="color"]')).map(input => input.value);

        let gradientCss = '';

        if (type === 'linear') {
            const direction = directionSelect.value;
            const angle = angleInput.value;
            const dir = direction === 'custom-angle' ? `${angle}deg` : direction;
            gradientCss = `background: linear-gradient(${dir}, ${colors.join(', ')});`;
        } else if (type === 'radial') {
            const shape = radialShapeSelect.value;
            const size = radialSizeSelect.value;
            gradientCss = `background: radial-gradient(${shape} ${size}, ${colors.join(', ')});`;
        }

        preview.style.background = gradientCss.replace('background: ', '');
        cssOutput.textContent = gradientCss;
    }

    function addColorInput(initialColor = '#ffffff') {
        const colorInputGroup = document.createElement('div');
        colorInputGroup.className = 'color-input-group';
        colorInputGroup.innerHTML = `
            <input type="color" class="form-control form-control-color" value="${initialColor}">
            <button class="btn btn-danger remove-color-btn"><i class="fas fa-times"></i></button>
        `;
        colorsContainer.appendChild(colorInputGroup);
        colorInputGroup.querySelector('input[type="color"]').addEventListener('input', generateGradient);
        colorInputGroup.querySelector('.remove-color-btn').addEventListener('click', (e) => {
            if (colorsContainer.children.length > 2) { // 最低2色は残す
                colorsContainer.removeChild(colorInputGroup);
                generateGradient();
            }
        });
        generateGradient();
    }

    // Event Listeners
    gradientTypeSelect.addEventListener('change', () => {
        if (gradientTypeSelect.value === 'linear') {
            linearOptions.style.display = 'block';
            radialOptions.style.display = 'none';
        } else {
            linearOptions.style.display = 'none';
            radialOptions.style.display = 'block';
        }
        generateGradient();
    });

    directionSelect.addEventListener('change', () => {
        if (directionSelect.value === 'custom-angle') {
            angleInput.style.display = 'block';
        } else {
            angleInput.style.display = 'none';
        }
        generateGradient();
    });

    angleInput.addEventListener('input', generateGradient);
    radialShapeSelect.addEventListener('change', generateGradient);
    radialSizeSelect.addEventListener('change', generateGradient);

    addColorBtn.addEventListener('click', () => addColorInput());

    // Initial setup
    Array.from(colorsContainer.querySelectorAll('input[type="color"]')).forEach(input => {
        input.addEventListener('input', generateGradient);
    });
    Array.from(colorsContainer.querySelectorAll('.remove-color-btn')).forEach(button => {
        button.addEventListener('click', (e) => {
            if (colorsContainer.children.length > 2) {
                colorsContainer.removeChild(e.target.closest('.color-input-group'));
                generateGradient();
            }
        });
    });

    generateGradient();

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