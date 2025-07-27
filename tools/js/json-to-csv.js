document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convert-btn');
    const copyBtn = document.getElementById('copy-btn');
    const jsonInput = document.getElementById('json-input');
    const csvOutput = document.getElementById('csv-output');
    const delimiterSelect = document.getElementById('delimiter');

    convertBtn.addEventListener('click', () => {
        const jsonString = jsonInput.value.trim();
        const delimiter = delimiterSelect.value;

        if (!jsonString) {
            csvOutput.value = 'JSONデータを入力してください。';
            return;
        }

        try {
            const data = JSON.parse(jsonString);
            if (!Array.isArray(data) || data.length === 0) {
                csvOutput.value = '有効なJSON配列を入力してください。';
                return;
            }

            const headers = Object.keys(data[0]);
            const csvRows = [];
            csvRows.push(headers.join(delimiter)); // Add header row

            for (const row of data) {
                const values = headers.map(header => {
                    const val = row[header];
                    // Handle commas and quotes in values
                    if (typeof val === 'string' && (val.includes(delimiter) || val.includes('"'))) {
                        return `"${val.replace(/"/g, '""')}"`;
                    }
                    return val;
                });
                csvRows.push(values.join(delimiter));
            }

            csvOutput.value = csvRows.join('\n');

        } catch (e) {
            csvOutput.value = 'JSONパースエラー: ' + e.message;
        }
    });

    copyBtn.addEventListener('click', () => {
        if (csvOutput.value) {
            navigator.clipboard.writeText(csvOutput.value).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });
});