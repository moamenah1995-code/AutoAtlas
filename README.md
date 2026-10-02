# ALikhtyar

موقع ثابت عربي بسيط يضم صفحات رئيسية، صفحات قانونية، وملفات SEO جاهزة للنشر.

يتضمن المستودع أيضًا مشروع Azure Functions اختياريًا لإضافة السيارات ومتابعة تغييرات Azure SQL
في [AutoAtlasFunctions](./AutoAtlasFunctions/README.md). يُنشر هذا المشروع بصورة مستقلة عن GitHub Pages.

## ما الذي تم تحضيره
- صفحات: index.html, privacy.html, terms.html, contact.html
- ملفات SEO: robots.txt, sitemap.xml
- نشر GitHub Pages: .github/workflows/deploy.yml
- رابط النشر الافتراضي: https://moamenah1995-code.github.io/AutoAtlas/

## نشر سريع على GitHub Pages
1. أنشئ مستودعاً على GitHub باسم ALikhtyar.
2. ارفع محتويات هذا المجلد إلى المستودع.
3. افتح Settings > Pages.
4. اختر Deployment from GitHub Actions.
5. بعد النشر، افتح: https://moamenah1995-code.github.io/AutoAtlas/

## إعداد النطاق
- لا تستخدم ملف `CNAME` إلا بعد امتلاك نطاق مخصص وضبط سجلات DNS الخاصة به.
- عند استخدام GitHub Pages الافتراضي، اترك ملف `CNAME` محذوفاً.
- يمكن إضافة النطاق المخصص لاحقاً من إعدادات Pages بعد اكتمال إعداد DNS.

## Google Search Console
- أضف الموقع في Search Console.
- أرسل sitemap.xml.
- تأكد من أن الصفحة الرئيسية والصفحات القانونية موجودة وتظهر 200 OK.

## إضافة مقال جديد (أتمتة كاملة)
مصدر المقالات الوحيد هو [articles.json](./articles.json). لإضافة مقال جديد:
1. أضف كائناً جديداً إلى `articles.json` يحوي: `id` (فريد)، `title`، `summary`، `sources` (مصفوفة أسماء مصادر)، و`date` بصيغة `YYYY-MM-DD`.
2. (اختياري أثناء التطوير المحلي) شغّل `node scripts/build-articles.mjs` للتحقق من النتيجة محلياً.
3. ارفع التغيير (commit/push) إلى `main`.

عند كل دفعة إلى `main`، ينفّذ [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) و[.github/workflows/pages.yml](./.github/workflows/pages.yml) خط الأنابيب التالي تلقائياً قبل النشر، تماماً كما هو موصوف في هذا المخطط:

```
إضافة مقال جديد
        ↓
GitHub Action
        ↓
تحديث Sitemap.xml
        ↓
إعادة بناء البحث
        ↓
إنشاء RSS Feed
        ↓
رفع الموقع تلقائياً
```

تفاصيل كل خطوة ينفذها [scripts/build-articles.mjs](./scripts/build-articles.mjs):
- **مزامنة `script.js`**: يعيد توليد مصفوفة `articles` بين الحدين `AUTO-GENERATED:ARTICLES:START/END` من `articles.json`، وهذه المصفوفة هي ما تعرضه فعلياً صفحات `articles*.html` بكل اللغات.
- **تحديث Sitemap.xml**: يضبط `<lastmod>` لصفحات `articles.html`‎/`-en`‎/`-pt`‎/`-fr` على تاريخ آخر بناء.
- **إعادة بناء البحث**: يولّد [search-index.json](./search-index.json)، فهرس بحث مشتق يحتوي نصاً مُطبَّعاً لكل مقال (عنوان + ملخص + مصادر) لاستخدامه مستقبلاً خارج الصفحة.
- **إنشاء RSS Feed**: يولّد [rss.xml](./rss.xml) (RSS 2.0) مرتباً تنازلياً حسب `date`، ويرتبط به تلقائياً وسم `<link rel="alternate" type="application/rss+xml">` في صفحات المقالات.
- **رفع الموقع تلقائياً**: تتولى خطوة `upload-pages-artifact` الموجودة أصلاً في كلا ملفي الـ workflow رفع نتيجة البناء إلى GitHub Pages.

لا تُحرَّر الملفات المولَّدة (`search-index.json`، `rss.xml`، كتلة `articles` داخل `script.js`، و`<lastmod>` في `sitemap.xml`) يدوياً؛ أي تعديل يدوي عليها سيُستبدَل عند تنفيذ `scripts/build-articles.mjs` في الـ CI أو محلياً.

## إضافة سيارة جديدة إلى صفحات الأبحاث/المقارنة (أتمتة كاملة)
مصدر بيانات كتالوج السيارات المبحوثة الوحيد هو [cars.json](./cars.json)، وهو ما تعرضه صفحات `models.html` وبدائلها اللغوية (research/compare). هذا المسار لا علاقة له بمشروع Azure Functions الاختياري في [AutoAtlasFunctions](./AutoAtlasFunctions/README.md)؛ الموقع الثابت لا يعتمد عليه في العرض الفعلي. لإضافة سيارة جديدة:
1. أضف كائناً جديداً إلى `cars.json` يحوي: `id` (فريد، slug)، `brand`، `model`، `origin`، `body`، `powertrain`، `drive`، `officialUrl`، `image`، و`availability` (كائن بالمناطق الأربع: `us`‎/`jordan`‎/`gulf`‎/`europe`‎، وقيمة كل منها واحدة من `official`‎/`dealer`‎/`not-listed`).
2. (اختياري أثناء التطوير المحلي) شغّل `node scripts/build-cars.mjs` للتحقق من النتيجة محلياً.
3. ارفع التغيير (commit/push) إلى `main`.

عند كل دفعة إلى `main`، ينفّذ [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) و[.github/workflows/pages.yml](./.github/workflows/pages.yml) خطوة [scripts/build-cars.mjs](./scripts/build-cars.mjs) تلقائياً قبل النشر: يعيد توليد `researchModelCatalog` و`marketResearchStatus` بين الحدين `AUTO-GENERATED:CARS:START/END` داخل `script.js` من `cars.json`.

لا تُحرَّر كتلة `researchModelCatalog`/`marketResearchStatus` داخل `script.js` يدوياً؛ أي تعديل يدوي عليها سيُستبدَل عند تنفيذ `scripts/build-cars.mjs` في الـ CI أو محلياً.
