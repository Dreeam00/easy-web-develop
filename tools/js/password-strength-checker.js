document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let score = 0;

        // Length score
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;

        // Character type score
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        let charTypeCount = 0;
        if (hasLowercase) charTypeCount++;
        if (hasUppercase) charTypeCount++;
        if (hasNumbers) charTypeCount++;
        if (hasSymbols) charTypeCount++;

        if (charTypeCount >= 3) score += 1;
        if (charTypeCount >= 4) score += 1;

        // Update UI based on score
        let strength = '';
        let barWidth = 0;
        let barColor = '';

        if (password.length === 0) {
            strength = '';
            barWidth = 0;
        } else if (score <= 2) {
            strength = '弱い';
            barWidth = 33;
            barColor = '#dc3545'; // Red
        } else if (score <= 4) {
            strength = '中程度';
            barWidth = 66;
            barColor = '#ffc107'; // Yellow
        } else {
            strength = '強い';
            barWidth = 100;
            barColor = '#28a745'; // Green
        }

        strengthBar.style.width = `${barWidth}%`;
        strengthBar.style.backgroundColor = barColor;
        strengthText.textContent = strength;
        strengthText.className = `strength-text ${strength === '弱い' ? 'weak' : strength === '中程度' ? 'medium' : 'strong'}`;
    });
});