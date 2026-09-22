const companiesData = {
  "تويوتا": ["Corolla", "Camry", "Land Cruiser", "Hilux", "Yaris"],
  "مرسيدس": ["C-Class", "E-Class", "S-Class", "GLC", "G-Class"],
  "بي إم دبليو": ["3 Series", "5 Series", "7 Series", "X5", "X3"],
  "فورد": ["Focus", "Mustang", "Explorer", "F-150", "Edge"],
  "هيونداي": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Accent"],
  "كيا": ["Cerato", "Sportage", "Sorento", "Rio", "K5"],
  "هوندا": ["Civic", "Accord", "CR-V", "Pilot", "City"],
  "نيسان": ["Sunny", "Altima", "Patrol", "X-Trail", "Maxima"],
  "أودي": ["A3", "A4", "A6", "Q5", "Q7"],
  "فولكسفاغن": ["Golf", "Passat", "Tiguan", "Touareg", "Jetta"]
};

const officialSources = [
  { name: "Toyota Global", url: "https://global.toyota/en/" },
  { name: "Toyota (Models)", url: "https://www.toyota.com/" },
  { name: "Mercedes-Benz", url: "https://www.mercedes-benz.com/en/" },
  { name: "BMW", url: "https://www.bmw.com/en/all-models.html" },
  { name: "Ford", url: "https://www.ford.com/" },
  { name: "Hyundai Worldwide", url: "https://www.hyundai.com/worldwide/en" },
  { name: "Kia Worldwide", url: "https://www.kia.com/worldwide/en/" },
  { name: "Honda Global", url: "https://global.honda/en/" },
  { name: "Nissan Global", url: "https://www.nissan-global.com/EN/" },
  { name: "Audi", url: "https://www.audi.com/en/models.html" },
  { name: "Volkswagen", url: "https://www.volkswagen.com/en/models.html" },
  { name: "Euro NCAP", url: "https://www.euroncap.com/" },
  { name: "IIHS", url: "https://www.iihs.org/" },
  { name: "NHTSA", url: "https://www.nhtsa.gov/ratings" },
  { name: "OICA (Production Data)", url: "https://www.oica.net/" },
  { name: "ACEA (European Market Data)", url: "https://www.acea.auto/" }
];

const companySourceMap = {
  "تويوتا": "https://global.toyota/en/",
  "مرسيدس": "https://www.mercedes-benz.com/en/",
  "بي إم دبليو": "https://www.bmw.com/en/all-models.html",
  "فورد": "https://www.ford.com/",
  "هيونداي": "https://www.hyundai.com/worldwide/en",
  "كيا": "https://www.kia.com/worldwide/en/",
  "هوندا": "https://global.honda/en/",
  "نيسان": "https://www.nissan-global.com/EN/",
  "أودي": "https://www.audi.com/en/models.html",
  "فولكسفاغن": "https://www.volkswagen.com/en/models.html"
};

const articlesSources = [
  { name: "OICA", url: "https://www.oica.net/" },
  { name: "ACEA", url: "https://www.acea.auto/" },
  { name: "IEA - Global EV Outlook", url: "https://www.iea.org/reports/global-ev-outlook-2024" },
  { name: "World Bank Data", url: "https://data.worldbank.org/" },
  { name: "GCC-STAT", url: "https://gccstat.org/" },
  { name: "Jordan Department of Statistics", url: "http://dosweb.dos.gov.jo/" },
  { name: "Jordan Customs", url: "https://www.customs.gov.jo/" }
];

const sourceScopes = {
  "Toyota Global": "معلومات الشركة والمنتجات المنشورة من تويوتا",
  "Toyota (Models)": "صفحات الطرازات والمواصفات في سوق تويوتا الأمريكي",
  "Mercedes-Benz": "معلومات الشركة والتقنيات التي تعلنها مرسيدس",
  BMW: "معلومات الشركة وصفحات الطرازات لدى BMW",
  Ford: "معلومات الشركة وصفحات المنتجات لدى فورد",
  "Hyundai Worldwide": "معلومات الشركة والطرازات حسب السوق لدى هيونداي",
  "Kia Worldwide": "معلومات الشركة والطرازات حسب السوق لدى كيا",
  "Honda Global": "معلومات الشركة والمنتجات لدى هوندا",
  "Nissan Global": "معلومات الشركة والمنتجات لدى نيسان",
  Audi: "معلومات الشركة وصفحات الطرازات لدى أودي",
  Volkswagen: "معلومات الشركة وصفحات الطرازات لدى فولكسفاغن",
  "Euro NCAP": "نتائج اختبارات السلامة الأوروبية لطراز وسنة محددين",
  IIHS: "نتائج اختبارات السلامة الأمريكية لطراز وسنة وتجهيز محددين",
  NHTSA: "تقييمات السلامة والاستدعاءات والبيانات التنظيمية الأمريكية",
  OICA: "إحصاءات إنتاج السيارات بحسب الدولة أو المصنعين والتقرير المحدد",
  "OICA (Production Data)": "إحصاءات إنتاج السيارات بحسب الدولة أو المصنعين والتقرير المحدد",
  ACEA: "تقارير صناعة وسوق السيارات الأوروبية",
  "ACEA (European Market Data)": "تقارير صناعة وسوق السيارات الأوروبية",
  "IEA - Global EV Outlook": "اتجاهات الطاقة والسيارات الكهربائية والبنية التحتية",
  "World Bank Data": "مؤشرات اقتصادية وتنموية عامة، وليست مبيعات طرازات بعينها",
  "GCC-STAT": "إحصاءات خليجية منشورة بحسب الدولة والمؤشر والسنة",
  "Jordan Department of Statistics": "إحصاءات الأردن الرسمية بحسب المؤشر والسنة",
  "Jordan Customs": "إجراءات وبيانات الاستيراد والرسوم الجمركية في الأردن"
};

const articles = [
  { title: "المنافسة بين شركات السيارات العالمية", summary: "تحليل المنافسة بناءً على الإنتاج العالمي وحصص السوق من مصادر مثل OICA وتقارير الشركات الرسمية.", sources: ["OICA", "ACEA"] },
  { title: "أفضل التصاميم في تاريخ السيارات", summary: "مراجعة معايير التصميم الصناعي وعلاقتها بالديناميكا الهوائية والسلامة وفق نشرات الشركات.", sources: ["Euro NCAP", "IIHS"] },
  { title: "كيف نقرأ مبيعات السيارات في العالم العربي؟", summary: "منهجية لقراءة أرقام التسجيلات والمبيعات حسب الدولة والسنة، مع التنبيه إلى أن البيانات الإقليمية ليست جدولاً موحداً دائماً.", sources: ["GCC-STAT", "Jordan Department of Statistics"] },
  { title: "مقارنة السيارات القديمة بالحديثة", summary: "تطور السلامة والكفاءة والانبعاثات عبر العقود وفق معايير تنظيمية وتقارير مصنّعين.", sources: ["NHTSA", "IIHS"] },
  { title: "ظهور السيارات الصينية", summary: "قراءة موضوعية لمزايا الانتشار والتسعير مقابل تحديات إعادة البيع والخدمة.", sources: ["OICA", "World Bank Data"] },
  { title: "سياسة صناعة السيارات", summary: "تأثير الضرائب والمواصفات والاستيراد على توافر المركبات في المنطقة العربية.", sources: ["Jordan Customs", "ACEA"] },
  { title: "شروط تصميم السيارات الحديثة", summary: "الاشتراطات الأساسية: السلامة، الكفاءة، الانبعاثات، والتكلفة التشغيلية.", sources: ["Euro NCAP", "NHTSA"] },
  { title: "احتياجات السيارات الأساسية", summary: "ما الذي يحتاجه المستخدم العربي فعلياً: اعتمادية، قطع، وكيل، وكفاءة تشغيل.", sources: ["Toyota Global", "Hyundai Worldwide"] },
  { title: "السلامة العامة وتطورها في السيارات", summary: "من أنظمة ABS إلى ADAS مع الرجوع لتقييمات Euro NCAP وIIHS وNHTSA.", sources: ["Euro NCAP", "IIHS", "NHTSA"] },
  { title: "قوة الصناعة الألمانية مقارنة بغيرها", summary: "تحليل التميز الألماني في الجودة والهندسة وسلاسل التوريد.", sources: ["ACEA", "OICA"] },
  { title: "التنافس بين السيارات الكهربائية والبنزين", summary: "مقارنة كلفة التملك والبنية التحتية والشحن ضمن الواقع العربي.", sources: ["IEA - Global EV Outlook", "World Bank Data"] },
  { title: "أثر التكنولوجيا الرقمية على السيارات", summary: "دور البرمجيات والاتصال والذكاء الاصطناعي في المركبات الحديثة.", sources: ["BMW", "Mercedes-Benz"] },
  { title: "السيارات الرياضية وأثرها على السوق", summary: "كيف تؤثر الفئات الرياضية على صورة العلامة التجارية والطلب.", sources: ["Ford", "Audi"] },
  { title: "تاريخ صناعة السيارات في العالم العربي", summary: "مراجعة تاريخية لتطور الاستيراد والتجميع المحلي.", sources: ["Jordan Customs", "GCC-STAT"] },
  { title: "السيارات الاقتصادية مقابل الفاخرة", summary: "مقارنة موضوعية لقيمة الشراء والتشغيل على المدى الطويل.", sources: ["Toyota Global", "Mercedes-Benz"] },
  { title: "أهمية الصيانة الدورية للسيارات", summary: "أثر الالتزام بجداول الصيانة على الاعتمادية والقيمة السوقية.", sources: ["Honda Global", "Toyota (Models)"] },
  { title: "السيارات الهجينة: حل وسط؟", summary: "تحليل جدوى الهجينة في المدن العربية مقارنة بالبنزين والكهرباء.", sources: ["IEA - Global EV Outlook", "Toyota Global"] },
  { title: "أثر التصميم الداخلي على تجربة القيادة", summary: "أهمية بيئة المقصورة في السلامة والراحة وتقليل الإرهاق.", sources: ["BMW", "Audi"] },
  { title: "السيارات الأكثر أماناً في العالم", summary: "قراءة التقييمات الرسمية مع التنبيه لاختلاف النتائج بين الفئات والأسواق.", sources: ["Euro NCAP", "IIHS", "NHTSA"] },
  { title: "تأثير البيئة على صناعة السيارات", summary: "كيف تدفع قوانين الانبعاثات المصنعين لتطوير تقنيات أنظف.", sources: ["IEA - Global EV Outlook", "World Bank Data"] },
  { title: "السيارات ذاتية القيادة: المستقبل القريب", summary: "الوضع الحالي للتقنيات المساعدة وحدود الاعتماد الكامل على القيادة الذاتية.", sources: ["NHTSA", "IIHS"] },
  { title: "أهمية الابتكار في صناعة السيارات", summary: "الابتكار كعامل تنافس رئيسي في المحركات والبرمجيات والسلامة.", sources: ["BMW", "Mercedes-Benz"] },
  { title: "السيارات الكلاسيكية وقيمتها اليوم", summary: "عوامل قيمة السيارات الكلاسيكية: الندرة، الحالة، وتاريخ الصيانة.", sources: ["OICA", "World Bank Data"] },
  { title: "السيارات اليابانية مقابل الأمريكية", summary: "مقارنة فلسفة التصنيع من حيث الاعتمادية والأداء والتكلفة.", sources: ["Toyota Global", "Ford"] },
  { title: "السيارات الفرنسية والإيطالية: فن التصميم", summary: "مقاربة تصميمية تبرز اختلاف مدارس التصميم الأوروبية.", sources: ["ACEA", "OICA"] },
  { title: "أثر التسويق على نجاح السيارات", summary: "كيف يؤثر التموضع والعرض التسويقي في قرارات الشراء.", sources: ["World Bank Data", "ACEA"] },
  { title: "السيارات متعددة الاستخدامات (SUV)", summary: "أسباب الانتشار الواسع لهذه الفئة في المنطقة العربية.", sources: ["GCC-STAT", "Jordan Department of Statistics"] },
  { title: "مستقبل صناعة السيارات في العالم العربي", summary: "اتجاهات محتملة مرتبطة بالطاقة، البنية التحتية، والتشريعات.", sources: ["IEA - Global EV Outlook", "GCC-STAT", "Jordan Customs"] }
];

const modelImageMap = {
  Corolla: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
  Camry: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
  "Land Cruiser": "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1200&q=80",
  Hilux: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  Yaris: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
  "C-Class": "https://images.unsplash.com/photo-1617814065893-00757125d2e8?auto=format&fit=crop&w=1200&q=80",
  "E-Class": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
  "S-Class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  GLC: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "G-Class": "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=80",
  "3 Series": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  "5 Series": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "7 Series": "https://images.unsplash.com/photo-1549399542-7e82138f24f7?auto=format&fit=crop&w=1200&q=80",
  X5: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80",
  X3: "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&w=1200&q=80",
  Focus: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
  Mustang: "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?auto=format&fit=crop&w=1200&q=80",
  Explorer: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
  "F-150": "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80",
  Edge: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  Elantra: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80",
  Sonata: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1200&q=80",
  Tucson: "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=1200&q=80",
  "Santa Fe": "https://images.unsplash.com/photo-1618843479619-e9b4dbda4ac5?auto=format&fit=crop&w=1200&q=80",
  Accent: "https://images.unsplash.com/photo-1549925862-9908f9e3f5c9?auto=format&fit=crop&w=1200&q=80",
  Cerato: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
  Sportage: "https://images.unsplash.com/photo-1617469767053-d3b523a0b6df?auto=format&fit=crop&w=1200&q=80",
  Sorento: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80",
  Rio: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80",
  K5: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
  Civic: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
  Accord: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
  "CR-V": "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1200&q=80",
  Pilot: "https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1200&q=80",
  City: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80",
  Sunny: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
  Altima: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1200&q=80",
  Patrol: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
  "X-Trail": "https://images.unsplash.com/photo-1616789916185-5f5f1d8d26ab?auto=format&fit=crop&w=1200&q=80",
  Maxima: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
  A3: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
  A4: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
  A6: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=1200&q=80",
  Q5: "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=1200&q=80",
  Q7: "https://images.unsplash.com/photo-1549399542-7e82138f24f7?auto=format&fit=crop&w=1200&q=80",
  Golf: "https://images.unsplash.com/photo-1549399542-7e82138f24f7?auto=format&fit=crop&w=1200&q=80",
  Passat: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
  Tiguan: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  Touareg: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
  Jetta: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80"
};

function createModelPlaceholder(company, model) {
  const label = `${company} - ${model}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#dbe7f4"/><path d="M220 430h760l-80-150H390z" fill="#2563eb" opacity=".85"/><circle cx="400" cy="455" r="58" fill="#102a43"/><circle cx="800" cy="455" r="58" fill="#102a43"/><text x="600" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="#102a43">${label}</text><text x="600" y="590" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#334e68">صورة توضيحية حتى تتوفر صورة موثقة للطراز</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const carProfiles = {};
Object.keys(companiesData).forEach((company) => {
  carProfiles[company] = {};
  companiesData[company].forEach((model) => {
    carProfiles[company][model] = {
      image: modelImageMap[model] || createModelPlaceholder(company, model),
      history: `معلومة مرجعية عن ${model} من ${company}: يرجى مراجعة صفحة الطراز الرسمية في موقع الشركة الأم.`,
      report: `التقرير الرسمي: يعتمد على نشرات الشركة المصنّعة الخاصة بالطراز ${model} وتجهيزاته لكل سوق.`,
      pros: ["تختلف المواصفات والتجهيزات حسب الفئة والسوق", "يجب فحص سجل الصيانة والتجهيز الفعلي قبل الشراء", "الاعتمادية لا تُستنتج من اسم العلامة وحده"],
      cons: ["اختلاف التجهيزات ووسائل الأمان بين الأسواق", "السعر يتغير حسب السنة والحالة والضرائب والعرض", "تكاليف التشغيل تعتمد على الاستخدام وتوفر القطع"],
      modifications: "لا يُثبت التغيير بين الأجيال من دون تحديد سنة الصنع والسوق؛ راجع أرشيف الشركة المصنّعة للطراز.",
      priceJordanArab: "لا يوجد رقم عام دقيق صالح لكل الأسواق. يجب مقارنة عرض الوكيل المحلي مع سنة الصنع والفئة والضرائب وحالة السيارة.",
      yearRange: "سنة الصنع غير محددة هنا لأن الاسم نفسه قد يغطي أجيالاً وفئات وأسواقاً مختلفة.",
      parts: ["قطع وكالة أصلية", "قطع OEM معتمدة", "بدائل تجارية حسب السوق"],
      sources: [
        { name: `الموقع الرسمي لشركة ${company}`, url: companySourceMap[company] },
        { name: "قاعدة Euro NCAP للتحقق من اختبارات السلامة", url: "https://www.euroncap.com/en/ratings-rewards/latest-safety-ratings/" },
        { name: "قاعدة IIHS للتحقق من اختبارات السلامة", url: "https://www.iihs.org/ratings" },
        { name: "قاعدة NHTSA للتحقق من التقييمات", url: "https://www.nhtsa.gov/ratings" }
      ]
    };
  });
});

const companiesList = document.getElementById("companies-list");
const carsList = document.getElementById("cars-list");
const carDetails = document.getElementById("car-details");
const articlesList = document.getElementById("articles-list");
const officialSourcesList = document.getElementById("official-sources-list");
const articlesSourcesList = document.getElementById("articles-sources-list");

const companySearchInput = document.getElementById("company-search");
const articleSearchInput = document.getElementById("article-search");
const backToTopBtn = document.getElementById("back-to-top");

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

const compareCompany1 = document.getElementById("compare-company-1");
const compareModel1 = document.getElementById("compare-model-1");
const compareCompany2 = document.getElementById("compare-company-2");
const compareModel2 = document.getElementById("compare-model-2");
const compareBtn = document.getElementById("compare-btn");
const compareResetBtn = document.getElementById("compare-reset-btn");
const compareResult = document.getElementById("compare-result");
const langButtons = document.querySelectorAll(".lang-btn");

let activeCompanyBtn = null;

function initLanguageLinks() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const localizedPages = new Set(["index.html", "en.html", "pt.html", "fr.html"]);
  const activePage = localizedPages.has(currentPage) ? currentPage : "index.html";

  langButtons.forEach((btn) => {
    const href = btn.getAttribute("href") || "";
    btn.classList.toggle("active", href === activePage);
  });
}

let activeCarBtn = null;
let selectedCompany = null;

function createButton(text, onClick) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.type = "button";
  btn.addEventListener("click", onClick);
  return btn;
}

function renderCompanies(filterText = "") {
  if (!companiesList) return;
  const normalizedFilter = filterText.trim().toLowerCase();
  companiesList.innerHTML = "";

  Object.keys(companiesData)
    .filter((companyName) => {
      if (!normalizedFilter) return true;
      const inCompany = companyName.toLowerCase().includes(normalizedFilter);
      const inModels = companiesData[companyName].some((model) => model.toLowerCase().includes(normalizedFilter));
      return inCompany || inModels;
    })
    .forEach((companyName) => {
      const btn = createButton(companyName, () => {
        if (activeCompanyBtn) activeCompanyBtn.classList.remove("active");
        btn.classList.add("active");
        activeCompanyBtn = btn;
        selectedCompany = companyName;
        renderCars(companyName, companySearchInput?.value || "");
      });

      if (selectedCompany === companyName) {
        btn.classList.add("active");
        activeCompanyBtn = btn;
      }

      companiesList.appendChild(btn);
    });

  if (!companiesList.children.length) {
    companiesList.innerHTML = `<div class="muted-box">لا توجد شركات مطابقة للبحث.</div>`;
  }
}

function renderCars(companyName, filterText = "") {
  if (!carsList) return;
  carsList.innerHTML = "";
  if (carDetails) {
    carDetails.className = "car-details muted-box";
    carDetails.textContent = "اختر سيارة لعرض التفاصيل الكاملة.";
  }

  const normalizedFilter = filterText.trim().toLowerCase();

  companiesData[companyName]
    .filter((modelName) => !normalizedFilter || modelName.toLowerCase().includes(normalizedFilter) || companyName.toLowerCase().includes(normalizedFilter))
    .forEach((modelName) => {
      const btn = createButton(modelName, () => {
        if (activeCarBtn) activeCarBtn.classList.remove("active");
        btn.classList.add("active");
        activeCarBtn = btn;
        renderCarDetails(companyName, modelName);
      });
      carsList.appendChild(btn);
    });

  if (!carsList.children.length) {
    carsList.innerHTML = "لا توجد موديلات مطابقة لهذا البحث.";
  }
}

function sourceItemHtml(source) {
  const scope = sourceScopes[source.name] || "مرجع عام؛ لا يثبت وحده مواصفات طراز أو رقماً لمبيعاته";
  return `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a><small class="source-scope">${scope}</small></li>`;
}

function renderCarDetails(company, model) {
  if (!carDetails) return;
  const details = carProfiles[company][model];

  carDetails.className = "car-details";
  carDetails.innerHTML = `
    <h3>${company} - ${model}</h3>
    <img src="${details.image}" alt="صورة توضيحية للطراز ${model} من ${company}" loading="lazy" />
    <p class="image-disclaimer">الصورة توضيحية للمساعدة على التعرف البصري، وليست مصدراً للمواصفات أو الفئة أو سنة الصنع.</p>
    <div class="detail-grid">
      <div class="detail-box"><h4>تاريخ السيارة</h4><p>${details.history}</p></div>
      <div class="detail-box"><h4>تقارير الشركة الرسمية</h4><p>${details.report}</p></div>
      <div class="detail-box"><h4>نقاط فحص محتملة</h4><ul>${details.pros.map((p) => `<li>${p}</li>`).join("")}</ul></div>
      <div class="detail-box"><h4>قيود المقارنة</h4><ul>${details.cons.map((c) => `<li>${c}</li>`).join("")}</ul></div>
      <div class="detail-box"><h4>هل تم تعديلها عبر السنوات؟</h4><p>${details.modifications}</p></div>
      <div class="detail-box"><h4>السعر المتوقع عند الشراء</h4><p>${details.priceJordanArab}</p></div>
      <div class="detail-box"><h4>سنة الصنع</h4><p>${details.yearRange}</p></div>
      <div class="detail-box"><h4>أنواع القطع المتوفرة</h4><ul>${details.parts.map((part) => `<li>${part}</li>`).join("")}</ul></div>
    </div>
    <section class="sources-box">
      <h4>مصادر هذه المعلومات</h4>
      <ul>${details.sources.map(sourceItemHtml).join("")}</ul>
    </section>
  `;

  const detailImage = carDetails.querySelector("img");
  if (detailImage) {
    detailImage.addEventListener("error", () => {
      detailImage.src = createModelPlaceholder(company, model);
      detailImage.alt = `صورة توضيحية بديلة للطراز ${model} من ${company}`;
    }, { once: true });
  }
}

function renderArticles(filterText = "") {
  if (!articlesList) return;
  const normalizedFilter = filterText.trim().toLowerCase();
  articlesList.innerHTML = "";

  articles
    .filter((article) => {
      if (!normalizedFilter) return true;
      return (
        article.title.toLowerCase().includes(normalizedFilter) ||
        article.summary.toLowerCase().includes(normalizedFilter) ||
        (article.sources || []).some((s) => s.toLowerCase().includes(normalizedFilter))
      );
    })
    .forEach((article, idx) => {
    const articleElement = document.createElement("article");
    articleElement.className = "article-item";

    const articleSources = (article.sources || [])
      .map((sourceName) => {
        const sourceObj = [...articlesSources, ...officialSources].find((s) => s.name === sourceName);
        if (!sourceObj) return `<li>${sourceName}</li>`;
        const scope = sourceScopes[sourceObj.name] || "مرجع عام؛ يجب مطابقة الادعاء مع التقرير أو الصفحة الأصلية";
        return `<li><a href="${sourceObj.url}" target="_blank" rel="noopener noreferrer">${sourceObj.name}</a><small class="source-scope">${scope}</small></li>`;
      })
      .join("");

    articleElement.innerHTML = `
      <h4>${idx + 1}. ${article.title}</h4>
      <p>${article.summary}</p>
      <div class="sources-box">
        <h5>مراجع المقال</h5>
        <ul>${articleSources || "<li>مراجع عامة: راجع قائمة مراجع المقالات أدناه.</li>"}</ul>
      </div>
    `;
      articlesList.appendChild(articleElement);
    });

  if (!articlesList.children.length) {
    articlesList.innerHTML = `<div class="muted-box">لا توجد مقالات مطابقة للبحث.</div>`;
  }
}

function renderSources() {
  if (officialSourcesList) {
    officialSourcesList.innerHTML = "";
    officialSources.forEach((source) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a>`;
      officialSourcesList.appendChild(li);
    });
  }

  if (articlesSourcesList) {
    articlesSourcesList.innerHTML = "";
    articlesSources.forEach((source) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a>`;
      articlesSourcesList.appendChild(li);
    });
  }
}

function addChatMessage(text, role = "user") {
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(message) {
  const msg = message.trim();
  if (!msg) return "يمكنك كتابة أي سؤال عن السيارات وسأحاول مساعدتك بمعلومة عامة.";

  if (msg.includes("سعر") || msg.includes("شراء")) {
    return "للدقة: راجع الوكيل المحلي أو المنصات المعتمدة في الأردن/المنطقة حسب سنة الصنع، الفئة، والحالة الفنية.";
  }
  if (msg.includes("سلامة") || msg.includes("أمان")) {
    return "للمقارنة الدقيقة بالسلامة: راجع Euro NCAP وIIHS وNHTSA مع تحديد الموديل وسنة الصنع.";
  }
  if (msg.includes("مصدر") || msg.includes("مرجع")) {
    return "ستجد المصادر الرسمية داخل كل قسم، ويمكنك البدء من قائمة (المصادر الرسمية المعتمدة للموقع).";
  }
  if (msg.includes("كهرباء") || msg.includes("كهربائية") || msg.includes("هجينة")) {
    return "قبل اختيار سيارة كهربائية أو هجينة، قارن بين تكلفة الشحن/الوقود، الصيانة، ومدى توفر البنية التحتية في مدينتك.";
  }

  return "شكراً لسؤالك. نلتزم بعرض معلومات عامة موثقة دون جمع أي بيانات شخصية.";
}

function setSelectOptions(selectEl, values, placeholder) {
  if (!selectEl) return;
  selectEl.innerHTML = "";
  const firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = placeholder;
  selectEl.appendChild(firstOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectEl.appendChild(option);
  });
}

function renderCompareCompanies() {
  const companies = Object.keys(companiesData);
  setSelectOptions(compareCompany1, companies, "اختر الشركة");
  setSelectOptions(compareCompany2, companies, "اختر الشركة");
  setSelectOptions(compareModel1, [], "اختر الموديل");
  setSelectOptions(compareModel2, [], "اختر الموديل");
  if (compareModel1) compareModel1.disabled = true;
  if (compareModel2) compareModel2.disabled = true;
}

function updateCompareModels(companySelectEl, modelSelectEl) {
  if (!companySelectEl || !modelSelectEl) return;
  const companyName = companySelectEl.value;
  const models = companyName && companiesData[companyName] ? companiesData[companyName] : [];
  setSelectOptions(modelSelectEl, models, "اختر الموديل");
  modelSelectEl.disabled = !models.length;
}

function joinListAsHtml(items) {
  if (!items || !items.length) return "—";
  return `<ul class="compare-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function joinSourcesAsHtml(sources) {
  if (!sources || !sources.length) return "—";
  return `<ul class="compare-list">${sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a></li>`).join("")}</ul>`;
}

function getCompareCarData(company, model) {
  if (!company || !model) return null;
  const profile = carProfiles?.[company]?.[model];
  if (!profile) return null;

  return {
    company,
    model,
    yearRange: profile.yearRange || "—",
    parts: profile.parts || [],
    pros: profile.pros || [],
    cons: profile.cons || [],
    sources: profile.sources || []
  };
}

function renderCompareResult() {
  if (!compareResult) return;

  const car1 = getCompareCarData(compareCompany1?.value, compareModel1?.value);
  const car2 = getCompareCarData(compareCompany2?.value, compareModel2?.value);

  if (!car1 || !car2) {
    compareResult.className = "muted-box";
    compareResult.textContent = "يرجى اختيار شركة وموديل لكل سيارة ثم الضغط على إجراء المقارنة.";
    return;
  }

  compareResult.className = "";
  compareResult.innerHTML = `
    <div class="compare-result-grid">
      <div class="compare-cell head compare-label">البند</div>
      <div class="compare-cell head">${car1.company} - ${car1.model}</div>
      <div class="compare-cell head">${car2.company} - ${car2.model}</div>

      <div class="compare-cell compare-label">الشركة</div>
      <div class="compare-cell">${car1.company}</div>
      <div class="compare-cell">${car2.company}</div>

      <div class="compare-cell compare-label">الموديل</div>
      <div class="compare-cell">${car1.model}</div>
      <div class="compare-cell">${car2.model}</div>

      <div class="compare-cell compare-label">نطاق سنة الصنع</div>
      <div class="compare-cell">${car1.yearRange}</div>
      <div class="compare-cell">${car2.yearRange}</div>

      <div class="compare-cell compare-label">أنواع القطع</div>
      <div class="compare-cell">${joinListAsHtml(car1.parts)}</div>
      <div class="compare-cell">${joinListAsHtml(car2.parts)}</div>

      <div class="compare-cell compare-label">المميزات</div>
      <div class="compare-cell">${joinListAsHtml(car1.pros)}</div>
      <div class="compare-cell">${joinListAsHtml(car2.pros)}</div>

      <div class="compare-cell compare-label">العيوب</div>
      <div class="compare-cell">${joinListAsHtml(car1.cons)}</div>
      <div class="compare-cell">${joinListAsHtml(car2.cons)}</div>

      <div class="compare-cell compare-label">المصادر</div>
      <div class="compare-cell">${joinSourcesAsHtml(car1.sources)}</div>
      <div class="compare-cell">${joinSourcesAsHtml(car2.sources)}</div>
    </div>
  `;
}

function resetCompare() {
  if (compareCompany1) compareCompany1.value = "";
  if (compareCompany2) compareCompany2.value = "";
  setSelectOptions(compareModel1, [], "اختر الموديل");
  setSelectOptions(compareModel2, [], "اختر الموديل");
  if (compareModel1) compareModel1.disabled = true;
  if (compareModel2) compareModel2.disabled = true;

  if (compareResult) {
    compareResult.className = "muted-box";
    compareResult.textContent = 'اختر سيارتين ثم اضغط "إجراء المقارنة" لعرض النتائج.';
  }
}

function initCompareFeature() {
  if (!compareCompany1 || !compareCompany2 || !compareModel1 || !compareModel2 || !compareBtn || !compareResetBtn || !compareResult) {
    return;
  }

  renderCompareCompanies();

  compareCompany1.addEventListener("change", () => {
    updateCompareModels(compareCompany1, compareModel1);
  });

  compareCompany2.addEventListener("change", () => {
    updateCompareModels(compareCompany2, compareModel2);
  });

  compareBtn.addEventListener("click", renderCompareResult);
  compareResetBtn.addEventListener("click", resetCompare);
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  addChatMessage(message, "user");
  chatInput.value = "";
  setTimeout(() => addChatMessage(getBotReply(message), "bot"), 300);
}

if (sendBtn && chatInput) {
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

history.scrollRestoration = 'manual';

function resetScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function handleAnchorNavigation(event) {
  const link = event.currentTarget;
  const targetId = link.getAttribute('href');

  if (!targetId || targetId === '#') return;

  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  event.preventDefault();
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  history.pushState(null, '', targetId);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    resetScrollToTop();

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top, behavior: 'auto' });
      }
    }
  });
} else {
  resetScrollToTop();
}

for (const btn of langButtons) {
  btn.addEventListener('click', () => {
    resetScrollToTop();
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', handleAnchorNavigation);
});

initLanguageLinks();

if (companySearchInput) {
  companySearchInput.addEventListener("input", () => {
    const value = companySearchInput.value;
    renderCompanies(value);
    if (selectedCompany) renderCars(selectedCompany, value);
  });
}

if (articleSearchInput) {
  articleSearchInput.addEventListener("input", () => {
    renderArticles(articleSearchInput.value);
  });
}

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 260) backToTopBtn.classList.add("show");
    else backToTopBtn.classList.remove("show");
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (companiesList) renderCompanies();
if (articlesList) renderArticles();
if (officialSourcesList || articlesSourcesList) renderSources();
initCompareFeature();
