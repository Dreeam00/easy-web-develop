document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('start-date');
    const yearsInput = document.getElementById('years');
    const monthsInput = document.getElementById('months');
    const daysInput = document.getElementById('days');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDateInput = document.getElementById('result-date');
    const dateFormatSelect = document.getElementById('date-format');

    // Set today's date as default start date
    const today = new Date();
    startDateInput.valueAsDate = today;

    function formatDate(date, format) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        switch (format) {
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'YYYY年MM月DD日':
                return `${year}年${month}月${day}日`;
            case 'ISO':
                return date.toISOString();
            default:
                return date.toLocaleDateString();
        }
    }

    function calculateDate() {
        const startDate = new Date(startDateInput.value);
        if (isNaN(startDate.getTime())) {
            resultDateInput.value = '';
            alert('有効な開始日を選択してください。');
            return;
        }

        const years = parseInt(yearsInput.value) || 0;
        const months = parseInt(monthsInput.value) || 0;
        const days = parseInt(daysInput.value) || 0;
        const operation = operationSelect.value;

        let resultDate = new Date(startDate);

        if (operation === 'add') {
            resultDate.setFullYear(resultDate.getFullYear() + years);
            resultDate.setMonth(resultDate.getMonth() + months);
            resultDate.setDate(resultDate.getDate() + days);
        } else {
            resultDate.setFullYear(resultDate.getFullYear() - years);
            resultDate.setMonth(resultDate.getMonth() - months);
            resultDate.setDate(resultDate.getDate() - days);
        }

        resultDateInput.value = formatDate(resultDate, dateFormatSelect.value);
    }

    calculateBtn.addEventListener('click', calculateDate);
    dateFormatSelect.addEventListener('change', calculateDate);

    // Initial calculation
    calculateDate();
});