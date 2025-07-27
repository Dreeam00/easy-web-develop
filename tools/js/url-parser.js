document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const parseBtn = document.getElementById('parse-btn');
    const protocolSpan = document.getElementById('protocol');
    const hostSpan = document.getElementById('host');
    const hostnameSpan = document.getElementById('hostname');
    const portSpan = document.getElementById('port');
    const pathnameSpan = document.getElementById('pathname');
    const searchSpan = document.getElementById('search');
    const queryParamsOutput = document.getElementById('query-params-output');
    const hashSpan = document.getElementById('hash');

    function parseUrl() {
        const urlString = urlInput.value.trim();
        if (!urlString) {
            clearOutput();
            return;
        }

        try {
            const url = new URL(urlString);
            protocolSpan.textContent = url.protocol;
            hostSpan.textContent = url.host;
            hostnameSpan.textContent = url.hostname;
            portSpan.textContent = url.port;
            pathnameSpan.textContent = url.pathname;
            searchSpan.textContent = url.search;
            hashSpan.textContent = url.hash;

            // Parse query parameters
            queryParamsOutput.innerHTML = '';
            if (url.search) {
                const params = new URLSearchParams(url.search);
                params.forEach((value, key) => {
                    const paramDiv = document.createElement('div');
                    paramDiv.innerHTML = `<strong>${key}:</strong> ${value} <button class="btn btn-sm btn-outline-secondary copy-param-btn" data-value="${value}">コピー</button>`;
                    queryParamsOutput.appendChild(paramDiv);
                });
            }

        } catch (e) {
            clearOutput();
            protocolSpan.textContent = '無効なURL';
        }
    }

    function clearOutput() {
        protocolSpan.textContent = '';
        hostSpan.textContent = '';
        hostnameSpan.textContent = '';
        portSpan.textContent = '';
        pathnameSpan.textContent = '';
        searchSpan.textContent = '';
        queryParamsOutput.innerHTML = '';
        hashSpan.textContent = '';
    }

    parseBtn.addEventListener('click', parseUrl);
    urlInput.addEventListener('input', parseUrl);

    queryParamsOutput.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-param-btn')) {
            const valueToCopy = e.target.dataset.value;
            navigator.clipboard.writeText(valueToCopy).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'コピーしました！';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1500);
            });
        }
    });

    // Initial parse if there's a default value
    parseUrl();
});