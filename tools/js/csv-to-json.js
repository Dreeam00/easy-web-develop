document.addEventListener('DOMContentLoaded', () => {
    const convertBtn = document.getElementById('convert-btn');
    const copyBtn = document.getElementById('copy-btn');
    const csvInput = document.getElementById('csv-input');
    const jsonOutput = document.getElementById('json-output');
    const delimiterSelect = document.getElementById('delimiter');

    convertBtn.addEventListener('click', () => {
        const csv = csvInput.value.trim();
        const delimiter = delimiterSelect.value;

        if (!csv) {
            jsonOutput.value = 'CSVデータを入力してください。';
            return;
        }

        const lines = csv.split(/\r\n|\n/);
        const headers = lines[0].split(delimiter);
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(delimiter);

            if (currentline.length !== headers.length) {
                jsonOutput.value = 'エラー: ヘッダーと行の列数が一致しません。';
                return;
            }

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }

        try {
            jsonOutput.value = JSON.stringify(result, null, 4);
        } catch (e) {
            jsonOutput.value = 'JSON変換エラー: ' + e.message;
        }
    });

    copyBtn.addEventListener('click', () => {
        if (jsonOutput.value) {
            navigator.clipboard.writeText(jsonOutput.value).then(() => {
                copyBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });
});