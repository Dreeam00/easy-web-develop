document.addEventListener('DOMContentLoaded', () => {
    const userAgentInput = document.getElementById('user-agent');
    const disallowPathsInput = document.getElementById('disallow-paths');
    const allowPathsInput = document.getElementById('allow-paths');
    const sitemapUrlInput = document.getElementById('sitemap-url');
    const generateRobotsBtn = document.getElementById('generate-robots-btn');
    const robotsOutput = document.getElementById('robots-output');
    const copyRobotsBtn = document.getElementById('copy-robots-btn');

    function generateRobotsTxt() {
        const userAgent = userAgentInput.value.trim();
        const disallowPaths = disallowPathsInput.value.trim().split(/\r?\n/).filter(line => line !== '');
        const allowPaths = allowPathsInput.value.trim().split(/\r?\n/).filter(line => line !== '');
        const sitemapUrl = sitemapUrlInput.value.trim();

        let robotsTxt = '';

        robotsTxt += `User-agent: ${userAgent}\n`;

        disallowPaths.forEach(path => {
            robotsTxt += `Disallow: ${path}\n`;
        });

        allowPaths.forEach(path => {
            robotsTxt += `Allow: ${path}\n`;
        });

        if (sitemapUrl) {
            robotsTxt += `Sitemap: ${sitemapUrl}\n`;
        }

        robotsOutput.value = robotsTxt.trim();
    }

    generateRobotsBtn.addEventListener('click', generateRobotsTxt);

    copyRobotsBtn.addEventListener('click', () => {
        if (robotsOutput.value) {
            navigator.clipboard.writeText(robotsOutput.value).then(() => {
                copyRobotsBtn.textContent = 'コピーしました！';
                setTimeout(() => {
                    copyRobotsBtn.textContent = 'コピー';
                }, 1500);
            });
        }
    });

    // Initial generation
    generateRobotsTxt();
});
