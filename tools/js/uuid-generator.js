document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-uuid-btn');
    const copyBtn = document.getElementById('copy-uuid-btn');
    const uuidOutput = document.getElementById('uuid-output');

    function generateUUID() {
        // Standard UUID v4 generation
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    generateBtn.addEventListener('click', () => {
        uuidOutput.value = generateUUID();
    });

    copyBtn.addEventListener('click', () => {
        if (uuidOutput.value) {
            navigator.clipboard.writeText(uuidOutput.value).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });

    // Generate UUID on load
    uuidOutput.value = generateUUID();
});
