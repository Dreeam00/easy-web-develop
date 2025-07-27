document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const charCountEl = document.getElementById('char-count');
    const wordCountEl = document.getElementById('word-count');
    const readingTimeEl = document.getElementById('reading-time');

    const WORDS_PER_MINUTE = 200; // 一般的な読書速度 (単語/分)

    textInput.addEventListener('input', () => {
        const text = textInput.value;

        // 文字数をカウント (改行も1文字としてカウント)
        charCountEl.textContent = text.length;

        // 単語数をカウント (スペースや改行で区切られた単語)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCountEl.textContent = words.length;
        
        // テキストが空の場合は0にする
        if (text.length === 0) {
            wordCountEl.textContent = 0;
        }

        // 読了時間の目安を計算
        const readingTimeMinutes = words.length / WORDS_PER_MINUTE;
        if (words.length === 0) {
            readingTimeEl.textContent = '0分';
        } else if (readingTimeMinutes < 1) {
            readingTimeEl.textContent = '< 1分';
        } else {
            readingTimeEl.textContent = `${Math.ceil(readingTimeMinutes)}分`;
        }
    });
});