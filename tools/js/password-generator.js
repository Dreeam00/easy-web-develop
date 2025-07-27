document.addEventListener('DOMContentLoaded', () => {
    const lengthRange = document.getElementById('length');
    const lengthLabel = document.getElementById('length-label');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generateBtn = document.getElementById('generate-password-btn');
    const passwordOutput = document.getElementById('password-output');
    const copyBtn = document.getElementById('copy-password-btn');

    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?'
    };

    lengthRange.addEventListener('input', (e) => {
        lengthLabel.textContent = e.target.value;
        generatePassword(); // Regenerate and check strength on length change
    });

    function checkPasswordStrength(password) {
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
    }

    function generatePassword() {
        const length = parseInt(lengthRange.value, 10);
        let charset = '';
        let password = '';

        if (includeUppercase.checked) charset += charSets.uppercase;
        if (includeLowercase.checked) charset += charSets.lowercase;
        if (includeNumbers.checked) charset += charSets.numbers;
        if (includeSymbols.checked) charset += charSets.symbols;

        if (charset === '') {
            passwordOutput.value = '少なくとも1つの文字種を選択してください。';
            checkPasswordStrength(''); // Clear strength display
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordOutput.value = password;
        checkPasswordStrength(password);
    }

    generateBtn.addEventListener('click', generatePassword);
    includeUppercase.addEventListener('change', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSymbols.addEventListener('change', generatePassword);

    copyBtn.addEventListener('click', () => {
        if (passwordOutput.value && !passwordOutput.value.startsWith('少なくとも')) {
            navigator.clipboard.writeText(passwordOutput.value).then(() => {
                const icon = copyBtn.innerHTML;
                copyBtn.innerHTML = `<i class="fas fa-check"></i>`;
                setTimeout(() => {
                    copyBtn.innerHTML = icon;
                }, 1500);
            });
        }
    });

    // Initial password
    generatePassword();
});