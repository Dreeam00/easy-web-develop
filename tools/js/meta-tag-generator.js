document.addEventListener('DOMContentLoaded', () => {
    const pageTitleInput = document.getElementById('page-title');
    const descriptionInput = document.getElementById('description');
    const keywordsInput = document.getElementById('keywords');
    const authorInput = document.getElementById('author');
    const ogUrlInput = document.getElementById('og-url');
    const ogTypeInput = document.getElementById('og-type');
    const ogImageInput = document.getElementById('og-image');
    const ogSiteNameInput = document.getElementById('og-site-name');
    const twitterCardTypeSelect = document.getElementById('twitter-card-type');
    const twitterSiteInput = document.getElementById('twitter-site');
    const twitterCreatorInput = document.getElementById('twitter-creator');
    const generateMetaBtn = document.getElementById('generate-meta-btn');
    const metaOutput = document.getElementById('meta-output');
    const copyMetaBtn = document.getElementById('copy-meta-btn');

    function generateMetaTags() {
        const title = pageTitleInput.value.trim();
        const description = descriptionInput.value.trim();
        const keywords = keywordsInput.value.trim();
        const author = authorInput.value.trim();
        const ogUrl = ogUrlInput.value.trim();
        const ogType = ogTypeInput.value.trim();
        const ogImage = ogImageInput.value.trim();
        const ogSiteName = ogSiteNameInput.value.trim();
        const twitterCardType = twitterCardTypeSelect.value;
        const twitterSite = twitterSiteInput.value.trim();
        const twitterCreator = twitterCreatorInput.value.trim();

        let metaTags = '';

        // Basic Meta Tags
        metaTags += `<meta charset="UTF-8">\n`;
        metaTags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
        if (title) metaTags += `<title>${title}</title>\n`;
        if (description) metaTags += `<meta name="description" content="${description}">\n`;
        if (keywords) metaTags += `<meta name="keywords" content="${keywords}">\n`;
        if (author) metaTags += `<meta name="author" content="${author}">\n`;

        // Open Graph (OGP) Tags
        if (title) metaTags += `<meta property="og:title" content="${title}">\n`;
        if (description) metaTags += `<meta property="og:description" content="${description}">\n`;
        if (ogUrl) metaTags += `<meta property="og:url" content="${ogUrl}">\n`;
        if (ogType) metaTags += `<meta property="og:type" content="${ogType}">\n`;
        if (ogImage) metaTags += `<meta property="og:image" content="${ogImage}">\n`;
        if (ogSiteName) metaTags += `<meta property="og:site_name" content="${ogSiteName}">\n`;

        // Twitter Card Tags
        metaTags += `<meta name="twitter:card" content="${twitterCardType}">\n`;
        if (title) metaTags += `<meta name="twitter:title" content="${title}">\n`;
        if (description) metaTags += `<meta name="twitter:description" content="${description}">\n`;
        if (ogImage) metaTags += `<meta name="twitter:image" content="${ogImage}">\n`;
        if (twitterSite) metaTags += `<meta name="twitter:site" content="${twitterSite}">\n`;
        if (twitterCreator) metaTags += `<meta name="twitter:creator" content="${twitterCreator}">\n`;

        metaOutput.value = metaTags.trim();
    }

    generateMetaBtn.addEventListener('click', generateMetaTags);

    copyMetaBtn.addEventListener('click', () => {
        if (metaOutput.value) {
            navigator.clipboard.writeText(metaOutput.value).then(() => {
                copyMetaBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyMetaBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });

    // Initial generation
    generateMetaTags();
});