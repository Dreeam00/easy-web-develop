document.addEventListener('DOMContentLoaded', () => {
    const previewBox = document.querySelector('.preview-box');
    const allCorners = document.getElementById('all-corners');
    const topLeft = document.getElementById('top-left');
    const topRight = document.getElementById('top-right');
    const bottomRight = document.getElementById('bottom-right');
    const bottomLeft = document.getElementById('bottom-left');
    const cssOutput = document.getElementById('css-output');

    function updateBorderRadius() {
        const tl = topLeft.value;
        const tr = topRight.value;
        const br = bottomRight.value;
        const bl = bottomLeft.value;

        const borderRadiusValue = `${tl}px ${tr}px ${br}px ${bl}px`;
        previewBox.style.borderRadius = borderRadiusValue;
        cssOutput.value = `border-radius: ${borderRadiusValue};`;
    }

    allCorners.addEventListener('input', (e) => {
        const value = e.target.value;
        topLeft.value = value;
        topRight.value = value;
        bottomRight.value = value;
        bottomLeft.value = value;
        updateBorderRadius();
    });

    [topLeft, topRight, bottomRight, bottomLeft].forEach(slider => {
        slider.addEventListener('input', updateBorderRadius);
    });

    updateBorderRadius();
});
