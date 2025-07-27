document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp-input');
    const dateOutput = document.getElementById('date-output');
    const dateInput = document.getElementById('date-input');
    const timestampOutput = document.getElementById('timestamp-output');
    const getCurrentTimeBtn = document.getElementById('get-current-time-btn');

    function convertTimestampToDate() {
        const timestamp = parseInt(timestampInput.value, 10);
        if (isNaN(timestamp)) {
            dateOutput.value = '';
            return;
        }
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        dateOutput.value = date.toUTCString();
    }

    function convertDateToTimestamp() {
        const dateString = dateInput.value;
        if (!dateString) {
            timestampOutput.value = '';
            return;
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            timestampOutput.value = '無効な日付';
            return;
        }
        timestampOutput.value = Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
    }

    timestampInput.addEventListener('input', convertTimestampToDate);
    dateInput.addEventListener('input', convertDateToTimestamp);

    getCurrentTimeBtn.addEventListener('click', () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // offset in milliseconds
        const localIsoString = (new Date(now - offset)).toISOString().slice(0, -1);
        dateInput.value = localIsoString.substring(0, 19); // Format for datetime-local
        convertDateToTimestamp();
    });

    // Initial conversion if values exist
    convertTimestampToDate();
    convertDateToTimestamp();
});
