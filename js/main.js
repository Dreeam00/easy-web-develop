document.addEventListener('DOMContentLoaded', () => {
    const allTools = [
        // Colors
        { name: 'カラーピッカー', description: '色を選択してカラーコードを取得', url: 'tools/color-picker.html', icon: 'fas fa-eye-dropper', category: 'Colors' },
        { name: 'カラーパレット', description: '定番カラーの一覧とコピー機能', url: 'tools/color-palette.html', icon: 'fas fa-palette', category: 'Colors' },
        { name: 'グラデーションクリエイター', description: 'CSSグラデーションを生成', url: 'tools/gradient-generator.html', icon: 'fas fa-paint-brush', category: 'Colors' },
        { name: '関連色ジェネレーター', description: '補色・類似色などを生成', url: 'tools/related-colors.html', icon: 'fas fa-sitemap', category: 'Colors' },
        { name: 'カラーコードコンバーター', description: 'HEX, RGB, HSL形式を相互変換', url: 'tools/color-converter.html', icon: 'fas fa-exchange-alt', category: 'Colors' },
        { name: 'カラーコントラストチェッカー', description: '2つの色のWCAGコントラスト比をチェック', url: 'tools/color-contrast-checker.html', icon: 'fas fa-adjust', category: 'Colors' },
        { name: 'カラーブレンダー', description: '2つの色を指定比率で混合', url: 'tools/color-blender.html', icon: 'fas fa-fill-drip', category: 'Colors' },

        // CSS & Design
        { name: 'Box Shadow ジェネレーター', description: 'box-shadowのCSSコードを視覚的に生成', url: 'tools/box-shadow-generator.html', icon: 'fas fa-box-open', category: 'CSS & Design' },
        { name: 'CSS Minifier', description: 'CSSコードを圧縮してファイルサイズを削減', url: 'tools/css-minifier.html', icon: 'fa-solid fa-file-zipper', category: 'CSS & Design' },
        { name: 'CSS Reset/Normalize', description: '基本的なCSSリセット/Normalizeスタイルシートを生成', url: 'tools/css-reset-normalize.html', icon: 'fas fa-eraser', category: 'CSS & Design' },
        { name: 'Flexbox プレイグラウンド', description: 'Flexboxプロパティを視覚的に操作', url: 'tools/flexbox-playground.html', icon: 'fas fa-grip-lines', category: 'CSS & Design' },
        { name: 'Grid Layout プレイグラウンド', description: 'CSS Gridプロパティを視覚的に操作', url: 'tools/grid-playground.html', icon: 'fas fa-th', category: 'CSS & Design' },
        { name: 'CSS Selector Tester', description: 'サンプルHTMLに対してCSSセレクターをテスト', url: 'tools/css-selector-tester.html', icon: 'fas fa-crosshairs', category: 'CSS & Design' },

        // Text & Content
        { name: 'Lorem Ipsum ジェネレーター', description: 'ダミーテキストを生成', url: 'tools/lorem-ipsum-generator.html', icon: 'fas fa-paragraph', category: 'Text & Content' },
        { name: '文字数・単語数カウンター', description: 'テキストの文字と単語の数をカウント', url: 'tools/text-counter.html', icon: 'fas fa-calculator', category: 'Text & Content' },
        { name: 'Markdown プレビューア', description: 'Markdown記法をリアルタイムでプレビュー', url: 'tools/markdown-previewer.html', icon: 'fab fa-markdown', category: 'Text & Content' },
        { name: '正規表現テスター', description: '入力テキストに対して正規表現をテスト', url: 'tools/regex-tester.html', icon: 'fas fa-code-branch', category: 'Text & Content' },
        { name: 'Base64 エンコーダー/デコーダー (テキスト)', description: 'テキストをBase64形式にエンコード/デコード', url: 'tools/text-base64-converter.html', icon: 'fas fa-file-code', category: 'Text & Content' },
        { name: 'HTML Entity Converter', description: 'HTML特殊文字のエンコード/デコード', url: 'tools/html-entity-converter.html', icon: 'fas fa-code', category: 'Text & Content' },

        // Web Utilities
        { name: 'CDNリンク集', description: '主要ライブラリのCDNリンク一覧', url: 'tools/cdn-links.html', icon: 'fas fa-link', category: 'Web Utilities' },
        { name: 'JSON フォーマッター', description: 'JSONデータを整形＆検証', url: 'tools/json-formatter.html', icon: 'fas fa-code', category: 'Web Utilities' },
        { name: 'URL エンコーダー / デコーダー', description: 'URL文字列をエンコード・デコード', url: 'tools/url-encoder.html', icon: 'fas fa-globe', category: 'Web Utilities' },
        { name: 'QRコードジェネレーター', description: 'テキストやURLからQRコードを生成', url: 'tools/qr-code-generator.html', icon: 'fas fa-qrcode', category: 'Web Utilities' },
        { name: 'パスワードジェネレーター', description: '安全なパスワードを生成', url: 'tools/password-generator.html', icon: 'fas fa-key', category: 'Web Utilities' },
        { name: 'タイムスタンプコンバーター', description: '人間が読める日付とUnixタイムスタンプを相互変換', url: 'tools/timestamp-converter.html', icon: 'fas fa-clock', category: 'Web Utilities' },
        { name: 'UUID ジェネレーター', description: '汎用一意識別子 (UUID) を生成', url: 'tools/uuid-generator.html', icon: 'fas fa-fingerprint', category: 'Web Utilities' },
        { name: 'URL Parser', description: 'URLをコンポーネントに分解', url: 'tools/url-parser.html', icon: 'fas fa-sitemap', category: 'Web Utilities' },
        { name: 'Meta Tag Generator', description: 'SEOおよびソーシャルメディア用のメタタグを生成', url: 'tools/meta-tag-generator.html', icon: 'fas fa-tags', category: 'Web Utilities' },
        { name: 'Robots.txt Generator', description: '基本的なrobots.txtファイルを生成', url: 'tools/robots-txt-generator.html', icon: 'fas fa-robot', category: 'Web Utilities' },
        { name: 'Password Strength Checker', description: 'パスワードの強度を評価', url: 'tools/password-strength-checker.html', icon: 'fas fa-shield-alt', category: 'Web Utilities' },
        { name: 'Date Calculator', description: '日付に日、月、年を加算/減算', url: 'tools/date-calculator.html', icon: 'fas fa-calendar-alt', category: 'Web Utilities' },

        // Converters
        { name: '単位コンバーター', description: 'px, rem, em, %などを相互変換', url: 'tools/unit-converter.html', icon: 'fas fa-ruler-horizontal', category: 'Converters' },
        { name: '画像 → Base64コンバーター', description: '画像をBase64文字列に変換', url: 'tools/image-to-base64.html', icon: 'fas fa-image', category: 'Converters' },
        { name: 'SVG to Data URL', description: 'SVGコードをデータURLに変換', url: 'tools/svg-to-data-url.html', icon: 'fas fa-code', category: 'Converters' },

        // File Converters
        { name: 'CSV to JSON', description: 'CSVデータをJSONに変換', url: 'tools/csv-to-json.html', icon: 'fas fa-file-csv', category: 'File Converters' },
        { name: 'JSON to CSV', description: 'JSONデータをCSVに変換', url: 'tools/json-to-csv.html', icon: 'fas fa-file-excel', category: 'File Converters' },
        { name: 'Image to WebP', description: '画像をWebP形式に変換', url: 'tools/image-to-webp.html', icon: 'fas fa-file-image', category: 'File Converters' },

        // Image & Graphics
        { name: 'Favicon ジェネレーター', description: '画像をアップロードし、様々なサイズのファビコンを生成', url: 'tools/favicon-generator.html', icon: 'fas fa-star', category: 'Image & Graphics' },
        { name: '画像圧縮ツール', description: '画像ファイルをクライアントサイドで圧縮', url: 'tools/image-compressor.html', icon: 'fas fa-compress-arrows-alt', category: 'Image & Graphics' },
        { name: 'Image Placeholder Generator', description: 'カスタムの寸法とテキストでプレースホルダー画像を生成', url: 'tools/image-placeholder-generator.html', icon: 'fas fa-image', category: 'Image & Graphics' },

        // Code Utilities
        { name: 'JavaScript Beautifier/Minifier', description: 'JavaScriptコードの整形または圧縮', url: 'tools/js-beautifier-minifier.html', icon: 'fab fa-js', category: 'Code Utilities' },
    ];

    const toolsGrid = document.getElementById('tools-grid');
    const toolSearchInput = document.getElementById('tool-search');
    const categoryFilters = document.getElementById('category-filters');

    let currentCategory = 'all';

    function renderTools() {
        toolsGrid.innerHTML = '';
        const searchTerm = toolSearchInput.value.toLowerCase();

        const filteredTools = allTools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchTerm) || tool.description.toLowerCase().includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || tool.category === currentCategory;
            return matchesSearch && matchesCategory;
        });

        if (filteredTools.length === 0) {
            toolsGrid.innerHTML = '<div class="col-12 text-center"><p class="lead">該当するツールが見つかりませんでした。</p></div>';
            return;
        }

        filteredTools.forEach(tool => {
            const toolCardHTML = `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 tool-card">
                        <div class="card-body d-flex flex-column text-center">
                            <div class="mb-3">
                                <i class="${tool.icon} fa-3x text-primary"></i>
                            </div>
                            <h5 class="card-title">${tool.name}</h5>
                            <p class="card-text flex-grow-1">${tool.description}</p>
                            <a href="${tool.url}" class="btn btn-outline-primary mt-auto">ツールを開く</a>
                        </div>
                    </div>
                </div>
            `;
            toolsGrid.innerHTML += toolCardHTML;
        });
    }

    // Event Listeners
    toolSearchInput.addEventListener('input', renderTools);

    categoryFilters.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // Remove active class from all buttons
            categoryFilters.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderTools();
        }
    });

    // Initial render
    renderTools();
});
