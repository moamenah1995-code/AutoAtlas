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
  "فولكسفاغن": ["Golf", "Passat", "Tiguan", "Touareg", "Jetta"],
  "بي واي دي": ["Seal", "Dolphin", "Atto 3", "Han", "Tang"],
  "تسلا": ["Model 3", "Model Y", "Model S", "Model X"]
};

const modelFuelTypes = {
  Corolla: ["petrol", "hybrid"], Camry: ["petrol", "hybrid"], "Land Cruiser": ["petrol"], Hilux: ["diesel"], Yaris: ["petrol", "hybrid"],
  "C-Class": ["petrol", "hybrid"], "E-Class": ["petrol", "hybrid"], "S-Class": ["petrol", "hybrid"], GLC: ["petrol", "hybrid"], "G-Class": ["petrol"],
  "3 Series": ["petrol", "hybrid"], "5 Series": ["petrol", "hybrid"], "7 Series": ["petrol", "hybrid"], X5: ["petrol", "hybrid"], X3: ["petrol", "hybrid"],
  Focus: ["petrol"], Mustang: ["petrol"], Explorer: ["petrol", "hybrid"], "F-150": ["petrol", "hybrid"], Edge: ["petrol"],
  Elantra: ["petrol", "hybrid"], Sonata: ["petrol", "hybrid"], Tucson: ["petrol", "hybrid"], "Santa Fe": ["petrol", "hybrid"], Accent: ["petrol"],
  Cerato: ["petrol"], Sportage: ["petrol", "hybrid"], Sorento: ["petrol", "hybrid"], Rio: ["petrol"], K5: ["petrol", "hybrid"],
  Civic: ["petrol", "hybrid"], Accord: ["petrol", "hybrid"], "CR-V": ["petrol", "hybrid"], Pilot: ["petrol"], City: ["petrol"],
  Sunny: ["petrol"], Altima: ["petrol"], Patrol: ["petrol"], "X-Trail": ["petrol", "hybrid"], Maxima: ["petrol"],
  A3: ["petrol", "hybrid"], A4: ["petrol", "hybrid"], A6: ["petrol", "hybrid"], Q5: ["petrol", "hybrid"], Q7: ["petrol", "hybrid"],
  Golf: ["petrol", "hybrid"], Passat: ["petrol", "hybrid"], Tiguan: ["petrol", "hybrid"], Touareg: ["petrol", "hybrid"], Jetta: ["petrol"],
  Seal: ["electric"], Dolphin: ["electric"], "Atto 3": ["electric", "suv"], Han: ["electric"], Tang: ["electric", "suv"],
  "Model 3": ["electric"], "Model Y": ["electric", "suv"], "Model S": ["electric", "luxury"], "Model X": ["electric", "suv", "luxury"]
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
  { name: "BYD", url: "https://www.byd.com/" },
  { name: "Tesla", url: "https://www.tesla.com/" },
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
  "فولكسفاغن": "https://www.volkswagen.com/en/models.html",
  "بي واي دي": "https://www.byd.com/",
  "تسلا": "https://www.tesla.com/"
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

let companiesList = document.getElementById("companies-list");
let carsList = document.getElementById("cars-list");
let carDetails = document.getElementById("car-details");
let articlesList = document.getElementById("articles-list");
let officialSourcesList = document.getElementById("official-sources-list");
let articlesSourcesList = document.getElementById("articles-sources-list");

let companySearchInput = document.getElementById("company-search");
let articleSearchInput = document.getElementById("article-search");
let backToTopBtn = document.getElementById("back-to-top");

let chatMessages = document.getElementById("chat-messages");
let chatInput = document.getElementById("chat-input");
let sendBtn = document.getElementById("send-btn");

let compareCompany1 = document.getElementById("compare-company-1");
let compareModel1 = document.getElementById("compare-model-1");
let compareCompany2 = document.getElementById("compare-company-2");
let compareModel2 = document.getElementById("compare-model-2");
let compareBtn = document.getElementById("compare-btn");
let compareResetBtn = document.getElementById("compare-reset-btn");
let compareResult = document.getElementById("compare-result");
const langButtons = document.querySelectorAll(".lang-btn");

const locale = document.documentElement.lang || "ar";
const localizedUi = {
  ar: {
    companies: "شركات السيارات", models: "موديلات الشركة", chooseCompany: "اختر شركة لعرض موديلاتها.", chooseCar: "اختر سيارة لعرض الملف المرجعي الكامل مع المصادر.", searchCompany: "ابحث عن شركة أو موديل...", officialSources: "المصادر الرسمية المعتمدة للموقع", compare: "إجراء المقارنة", reset: "مسح الاختيارات", chat: "اكتب سؤالك هنا...", send: "إرسال", articles: "المقالات العلمية", searchArticles: "ابحث داخل المقالات...", articleSources: "مراجع المقالات العلمية"
  },
  en: {
    companies: "Car brands", models: "Brand models", chooseCompany: "Choose a brand to view its models.", chooseCar: "Choose a vehicle to view its full reference profile and sources.", searchCompany: "Search for a brand or model...", officialSources: "Official sources used by AutoAtlas", compare: "Compare vehicles", reset: "Clear selections", chat: "Type your question here...", send: "Send", articles: "Scientific articles", searchArticles: "Search articles...", articleSources: "Article sources"
  },
  fr: {
    companies: "Marques automobiles", models: "Modeles de la marque", chooseCompany: "Choisissez une marque pour voir ses modeles.", chooseCar: "Choisissez un vehicule pour afficher sa fiche de reference et ses sources.", searchCompany: "Rechercher une marque ou un modele...", officialSources: "Sources officielles utilisees par AutoAtlas", compare: "Comparer les vehicules", reset: "Effacer la selection", chat: "Tapez votre question ici...", send: "Envoyer", articles: "Articles scientifiques", searchArticles: "Rechercher des articles...", articleSources: "Sources des articles"
  },
  pt: {
    companies: "Marcas de carros", models: "Modelos da marca", chooseCompany: "Escolha uma marca para ver seus modelos.", chooseCar: "Escolha um veiculo para ver o perfil de referencia completo e as fontes.", searchCompany: "Pesquisar marca ou modelo...", officialSources: "Fontes oficiais usadas pelo AutoAtlas", compare: "Comparar veiculos", reset: "Limpar selecoes", chat: "Digite sua pergunta aqui...", send: "Enviar", articles: "Artigos cientificos", searchArticles: "Buscar artigos...", articleSources: "Fontes dos artigos"
  }
};
const ui = localizedUi[locale] || localizedUi.ar;
const vehicleCategoryLabels = {
  ar: { all: "كل السيارات", petrol: "بنزين", diesel: "ديزل", hybrid: "هجينة", electric: "كهربائية", suv: "SUV", luxury: "فاخرة" },
  en: { all: "All vehicles", petrol: "Petrol", diesel: "Diesel", hybrid: "Hybrid", electric: "Electric", suv: "SUV", luxury: "Luxury" },
  fr: { all: "Tous les vehicules", petrol: "Essence", diesel: "Diesel", hybrid: "Hybride", electric: "Electrique", suv: "SUV", luxury: "Luxe" },
  pt: { all: "Todos os veiculos", petrol: "Gasolina", diesel: "Diesel", hybrid: "Hibrido", electric: "Eletrico", suv: "SUV", luxury: "Luxo" }
};
let selectedVehicleCategory = "all";
const categoryLabels = vehicleCategoryLabels[locale] || vehicleCategoryLabels.ar;

function getModelCategories(model) {
  const categories = modelFuelTypes[model] || ["petrol"];
  if (["Land Cruiser", "Hilux", "Explorer", "F-150", "GLC", "G-Class", "X5", "X3", "Tucson", "Santa Fe", "Sportage", "Sorento", "Pilot", "Patrol", "X-Trail", "Q5", "Q7", "Tiguan", "Touareg", "Model Y"].includes(model)) categories.push("suv");
  if (["S-Class", "7 Series", "A6", "Q7", "G-Class"].includes(model)) categories.push("luxury");
  return [...new Set(categories)];
}
const companyNames = {
  "تويوتا": { en: "Toyota", fr: "Toyota", pt: "Toyota" },
  "مرسيدس": { en: "Mercedes-Benz", fr: "Mercedes-Benz", pt: "Mercedes-Benz" },
  "بي إم دبليو": { en: "BMW", fr: "BMW", pt: "BMW" },
  "فورد": { en: "Ford", fr: "Ford", pt: "Ford" },
  "هيونداي": { en: "Hyundai", fr: "Hyundai", pt: "Hyundai" },
  "كيا": { en: "Kia", fr: "Kia", pt: "Kia" },
  "هوندا": { en: "Honda", fr: "Honda", pt: "Honda" },
  "نيسان": { en: "Nissan", fr: "Nissan", pt: "Nissan" },
  "أودي": { en: "Audi", fr: "Audi", pt: "Audi" },
  "فولكسفاغن": { en: "Volkswagen", fr: "Volkswagen", pt: "Volkswagen" },
  "بي واي دي": { en: "BYD", fr: "BYD", pt: "BYD" },
  "تسلا": { en: "Tesla", fr: "Tesla", pt: "Tesla" }
};

function displayCompany(company) {
  return locale === "ar" ? company : companyNames[company]?.[locale] || company;
}

function localizedText(en, fr, pt, ar) {
  return locale === "en" ? en : locale === "fr" ? fr : locale === "pt" ? pt : ar;
}

function buildLocalizedHomeServices() {
  if (locale === "ar" || !document.querySelector("main.container")) return;

  const companiesSection = document.getElementById("companies");
  if (companiesSection && !document.getElementById("companies-list")) {
    companiesSection.innerHTML = `
      <h2>🏎️ ${ui.companies}</h2>
      <p>${locale === "en" ? "Explore automotive brands, model profiles, official sources, and comparison guidance." : locale === "fr" ? "Explorez les marques, les fiches de modeles, les sources officielles et les guides de comparaison." : "Explore marcas, perfis de modelos, fontes oficiais e orientacoes de comparacao."}</p>
      <div class="tools-row"><input id="company-search" type="search" placeholder="${ui.searchCompany}" aria-label="${ui.searchCompany}" /></div>
      <div class="companies-layout"><div><h3>${ui.companies}</h3><div id="companies-list" class="grid-list"></div></div><div><h3>${ui.models}</h3><div id="cars-list" class="grid-list muted-box">${ui.chooseCompany}</div></div></div>
      <article id="car-details" class="car-details muted-box">${ui.chooseCar}</article>
      <section class="sources-box"><h3>${ui.officialSources}</h3><ul id="official-sources-list"></ul></section>`;
  }

  const compareSection = document.getElementById("compare");
  if (compareSection && !document.getElementById("compare-btn")) {
    const brandLabel = locale === "en" ? "Brand" : locale === "fr" ? "Marque" : "Marca";
    const modelLabel = locale === "en" ? "Model" : locale === "fr" ? "Modele" : "Modelo";
    const firstCar = locale === "en" ? "First vehicle" : locale === "fr" ? "Premier vehicule" : "Primeiro veiculo";
    const secondCar = locale === "en" ? "Second vehicle" : locale === "fr" ? "Deuxieme vehicule" : "Segundo veiculo";
    compareSection.innerHTML = `<h2>⚖️ ${locale === "en" ? "Interactive vehicle comparison" : locale === "fr" ? "Comparaison interactive de vehicules" : "Comparacao interativa de veiculos"}</h2><p>${locale === "en" ? "Select two vehicles to compare the reference information and source links." : locale === "fr" ? "Selectionnez deux vehicules pour comparer les informations de reference et les liens sources." : "Selecione dois veiculos para comparar as informacoes de referencia e os links das fontes."}</p><div class="compare-controls"><div class="compare-col"><h3>${firstCar}</h3><label for="compare-company-1">${brandLabel}</label><select id="compare-company-1"></select><label for="compare-model-1">${modelLabel}</label><select id="compare-model-1" disabled></select></div><div class="compare-col"><h3>${secondCar}</h3><label for="compare-company-2">${brandLabel}</label><select id="compare-company-2"></select><label for="compare-model-2">${modelLabel}</label><select id="compare-model-2" disabled></select></div></div><div class="compare-actions"><button id="compare-btn" type="button">${ui.compare}</button><button id="compare-reset-btn" type="button">${ui.reset}</button></div><article id="compare-result" class="muted-box">${ui.chooseCar}</article>`;
  }

  const articlesSection = document.getElementById("articles");
  if (articlesSection && !document.getElementById("article-search")) {
    articlesSection.innerHTML = `<h2>📚 ${ui.articles}</h2><p>${locale === "en" ? "Browse analytical automotive articles supported by official and scientific sources." : locale === "fr" ? "Consultez des articles automobiles analytiques appuyes par des sources officielles et scientifiques." : "Leia artigos automotivos analiticos com fontes oficiais e cientificas."}</p><div class="tools-row"><input id="article-search" type="search" placeholder="${ui.searchArticles}" aria-label="${ui.searchArticles}" /></div><div id="articles-list" class="articles-list"></div><section class="sources-box"><h3>${ui.articleSources}</h3><ul id="articles-sources-list"></ul></section>`;
  }

  const chatSection = document.getElementById("chat");
  if (chatSection && !document.getElementById("chat-input")) {
    chatSection.querySelector(".chat-box")?.remove();
    chatSection.insertAdjacentHTML("beforeend", `<div class="chat-box"><div id="chat-messages" class="chat-messages"></div><div class="chat-input-row"><input id="chat-input" type="text" placeholder="${ui.chat}" aria-label="${ui.chat}" /><button id="send-btn" type="button">${ui.send}</button></div></div>`);
  }

  if (!document.querySelector(".premium-hero")) {
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.classList.add("premium-hero");
      hero.insertAdjacentHTML("beforeend", `<div class="hero-visual" aria-hidden="true"><div class="vehicle-shot"></div><div class="floating-card top-card"><span class="mini-label">${locale === "en" ? "LATEST TECHNOLOGY" : locale === "fr" ? "TECHNOLOGIE RECENTE" : "TECNOLOGIA RECENTE"}</span><strong>EV / Hybrid</strong><small>${locale === "en" ? "Smart charging and advanced safety" : locale === "fr" ? "Recharge intelligente et securite avancee" : "Recarga inteligente e seguranca avancada"}</small></div><div class="floating-card bottom-card"><span class="mini-label">${locale === "en" ? "OFFICIAL SOURCES" : locale === "fr" ? "SOURCES OFFICIELLES" : "FONTES OFICIAIS"}</span><strong>AutoAtlas</strong><small>${locale === "en" ? "A reliable automotive reference" : locale === "fr" ? "Une reference automobile fiable" : "Uma referencia automotiva confiavel"}</small></div></div>`);
    }
  }

  if (!document.querySelector(".localized-model-showcase")) {
    const showcase = document.createElement("section");
    showcase.className = "card featured-section localized-model-showcase";
    const showcaseCopy = locale === "en"
      ? { kicker: "Featured models", title: "Explore vehicles by type", link: "View all vehicle profiles", cards: [["BYD Seal", "Electric vehicle", "Strong performance and a refined design."], ["Tesla Model Y", "SUV", "Flexible space and an electric driving experience."], ["BMW 3 Series", "Sedan", "A balance of performance, comfort, and technology."]] }
      : locale === "fr"
        ? { kicker: "Modeles en vedette", title: "Explorez les vehicules par type", link: "Voir tous les profils", cards: [["BYD Seal", "Vehicule electrique", "Performances solides et design soigne."], ["Tesla Model Y", "SUV", "Espace modulable et conduite electrique."], ["BMW 3 Series", "Berline", "Un equilibre entre performance, confort et technologie."]] }
        : { kicker: "Modelos em destaque", title: "Explore veiculos por tipo", link: "Ver todos os perfis", cards: [["BYD Seal", "Veiculo eletrico", "Desempenho forte e design refinado."], ["Tesla Model Y", "SUV", "Espaco versatil e experiencia eletrica."], ["BMW 3 Series", "Sedan", "Equilibrio entre desempenho, conforto e tecnologia."]] };
    const images = [modelImageMap.Corolla, modelImageMap["Model Y"] || modelImageMap.Tucson, modelImageMap["3 Series"]];
    showcase.innerHTML = `<div class="section-heading-row"><div><span class="section-kicker">${showcaseCopy.kicker}</span><h2>🏁 ${showcaseCopy.title}</h2></div><a href="${locale === "en" ? "car-detail-en.html" : locale === "fr" ? "car-detail-fr.html" : "car-detail-pt.html"}" class="ghost-link">${showcaseCopy.link}</a></div><div class="model-grid">${showcaseCopy.cards.map((card, index) => `<a class="model-card-link" href="${locale === "en" ? "car-detail-en.html" : locale === "fr" ? "car-detail-fr.html" : "car-detail-pt.html"}"><article class="model-card"><div class="model-image"><img src="${images[index]}" alt="${card[0]}" loading="lazy" /><span class="model-badge">${card[1]}</span></div><div class="model-content"><h3>${card[0]}</h3><p>${card[2]}</p><div class="model-meta"><span>${locale === "en" ? "Official sources" : locale === "fr" ? "Sources officielles" : "Fontes oficiais"}</span><span>${locale === "en" ? "Specifications vary by market" : locale === "fr" ? "Specifications selon le marche" : "Especificacoes variam por mercado"}</span></div></div></article></a>`).join("")}</div>`;
    document.querySelector("main.container")?.insertBefore(showcase, document.getElementById("technology"));
  }

  if (!document.querySelector(".types-grid")) {
    const categorySection = document.createElement("section");
    categorySection.className = "card type-section localized-category-section";
    categorySection.innerHTML = `<div class="section-heading-row"><div><span class="section-kicker">${locale === "en" ? "Filter by powertrain" : locale === "fr" ? "Filtrer par motorisation" : "Filtrar por motorizacao"}</span><h2>🚘 ${locale === "en" ? "Choose a vehicle type" : locale === "fr" ? "Choisissez un type de vehicule" : "Escolha um tipo de veiculo"}</h2></div></div><div class="types-grid"></div>`;
    document.querySelector("main.container")?.insertBefore(categorySection, document.getElementById("articles"));
  }

  document.querySelectorAll(".localized-model-showcase img").forEach((image) => {
    image.addEventListener("error", () => {
      image.src = createModelPlaceholder("AutoAtlas", image.alt);
    }, { once: true });
  });
}

function initVehicleCategories() {
  const grid = document.querySelector(".types-grid");
  if (!grid) return;
  const categories = ["all", "petrol", "diesel", "hybrid", "electric", "suv", "luxury"];
  const icons = { all: "🚘", petrol: "⛽", diesel: "🛢️", hybrid: "🔋", electric: "⚡", suv: "🛻", luxury: "✨" };
  const descriptions = {
    ar: { all: "عرض جميع السيارات", petrol: "محركات الاحتراق التقليدية", diesel: "محركات الديزل والاستخدام الشاق", hybrid: "محرك احتراق مع دعم كهربائي", electric: "قيادة كهربائية وبطارية عالية الجهد", suv: "مركبات مرتفعة متعددة الاستخدامات", luxury: "تجهيزات وراحة من الفئة العليا" },
    en: { all: "Show every vehicle", petrol: "Conventional combustion engines", diesel: "Diesel power for demanding use", hybrid: "Combustion engine with electric support", electric: "Battery-electric driving", suv: "Raised multi-purpose vehicles", luxury: "Premium equipment and comfort" },
    fr: { all: "Afficher tous les vehicules", petrol: "Moteurs thermiques classiques", diesel: "Diesel pour les usages exigeants", hybrid: "Moteur thermique avec assistance electrique", electric: "Conduite electrique sur batterie", suv: "Vehicules polyvalents sur eleves", luxury: "Equipements et confort premium" },
    pt: { all: "Mostrar todos os veiculos", petrol: "Motores a combustao", diesel: "Diesel para uso exigente", hybrid: "Motor a combustao com apoio eletrico", electric: "Conducao eletrica por bateria", suv: "Veiculos altos e versateis", luxury: "Equipamentos e conforto premium" }
  };
  const copy = descriptions[locale] || descriptions.ar;
  grid.innerHTML = "";
  categories.forEach((category) => {
    const card = document.createElement("article");
    card.className = `type-card ${category === "all" ? "active" : category}`;
    card.dataset.category = category;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", category === selectedVehicleCategory ? "true" : "false");
    card.innerHTML = `<div class="type-icon" aria-hidden="true">${icons[category]}</div><h3>${categoryLabels[category]}</h3><p>${copy[category]}</p>`;
    const activate = () => {
      selectedVehicleCategory = category;
      grid.querySelectorAll(".type-card").forEach((item) => {
        const active = item.dataset.category === category;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", active ? "true" : "false");
      });
      renderCompanies(companySearchInput?.value || "");
    };
    card.addEventListener("click", activate);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); }
    });
    grid.appendChild(card);
  });
}

buildLocalizedHomeServices();
initVehicleCategories();

companiesList = document.getElementById("companies-list");
carsList = document.getElementById("cars-list");
carDetails = document.getElementById("car-details");
articlesList = document.getElementById("articles-list");
officialSourcesList = document.getElementById("official-sources-list");
articlesSourcesList = document.getElementById("articles-sources-list");
companySearchInput = document.getElementById("company-search");
articleSearchInput = document.getElementById("article-search");
chatMessages = document.getElementById("chat-messages");
chatInput = document.getElementById("chat-input");
sendBtn = document.getElementById("send-btn");
compareCompany1 = document.getElementById("compare-company-1");
compareModel1 = document.getElementById("compare-model-1");
compareCompany2 = document.getElementById("compare-company-2");
compareModel2 = document.getElementById("compare-model-2");
compareBtn = document.getElementById("compare-btn");
compareResetBtn = document.getElementById("compare-reset-btn");
compareResult = document.getElementById("compare-result");

let activeCompanyBtn = null;

function initLanguageLinks() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const pageVariants = {
    home: { ar: "index.html", en: "en.html", pt: "pt.html", fr: "fr.html" },
    articles: { ar: "articles.html", en: "articles-en.html", pt: "articles-pt.html", fr: "articles-fr.html" },
    privacy: { ar: "privacy.html", en: "privacy-en.html", pt: "privacy-pt.html", fr: "privacy-fr.html" },
    terms: { ar: "terms.html", en: "terms-en.html", pt: "terms-pt.html", fr: "terms-fr.html" },
    contact: { ar: "contact.html", en: "contact-en.html", pt: "contact-pt.html", fr: "contact-fr.html" },
    carDetail: { ar: "car-detail.html", en: "car-detail-en.html", pt: "car-detail-pt.html", fr: "car-detail-fr.html" }
  };
  const languageLabels = { "العربية": "ar", English: "en", "Português": "pt", "Français": "fr" };
  const currentGroup = Object.values(pageVariants).find((variants) => Object.values(variants).includes(currentPage)) || pageVariants.home;
  const activeLanguage = Object.entries(currentGroup).find(([, page]) => page === currentPage)?.[0] || "ar";

  langButtons.forEach((btn) => {
    const language = languageLabels[btn.textContent.trim()];
    if (!language) return;
    btn.href = currentGroup[language];
    btn.classList.toggle("active", language === activeLanguage);
  });

  const localizedNavigation = {
    "articles.html": pageVariants.articles[activeLanguage],
    "privacy.html": pageVariants.privacy[activeLanguage],
    "terms.html": pageVariants.terms[activeLanguage],
    "contact.html": pageVariants.contact[activeLanguage]
  };
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (localizedNavigation[href]) link.href = localizedNavigation[href];
    if (href?.startsWith("index.html#")) {
      link.href = `${pageVariants.home[activeLanguage]}${href.slice("index.html".length)}`;
    }
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
      const inCompany = companyName.toLowerCase().includes(normalizedFilter) || displayCompany(companyName).toLowerCase().includes(normalizedFilter);
      const inModels = companiesData[companyName].some((model) => model.toLowerCase().includes(normalizedFilter));
      const inCategory = selectedVehicleCategory === "all" || companiesData[companyName].some((model) => getModelCategories(model).includes(selectedVehicleCategory));
      return inCategory && (!normalizedFilter || inCompany || inModels);
    })
    .forEach((companyName) => {
      const btn = createButton(displayCompany(companyName), () => {
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
    companiesList.innerHTML = `<div class="muted-box">${localizedText("No brands match your search.", "Aucune marque ne correspond a votre recherche.", "Nenhuma marca corresponde a sua busca.", "لا توجد شركات مطابقة للبحث.")}</div>`;
  }
}

function renderCars(companyName, filterText = "") {
  if (!carsList) return;
  carsList.innerHTML = "";
  if (carDetails) {
    carDetails.className = "car-details muted-box";
    carDetails.textContent = ui.chooseCar;
  }

  const normalizedFilter = filterText.trim().toLowerCase();

  companiesData[companyName]
    .filter((modelName) => {
      const matchesCategory = selectedVehicleCategory === "all" || getModelCategories(modelName).includes(selectedVehicleCategory);
      const matchesSearch = !normalizedFilter || modelName.toLowerCase().includes(normalizedFilter) || companyName.toLowerCase().includes(normalizedFilter);
      return matchesCategory && matchesSearch;
    })
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
    carsList.innerHTML = localizedText("No models match your search.", "Aucun modele ne correspond a votre recherche.", "Nenhum modelo corresponde a sua busca.", "لا توجد موديلات مطابقة لهذا البحث.");
  }
}

function sourceItemHtml(source) {
  if (locale !== "ar") {
    return `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a></li>`;
  }
  const scope = sourceScopes[source.name] || "مرجع عام؛ لا يثبت وحده مواصفات طراز أو رقماً لمبيعاته";
  return `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a><small class="source-scope">${scope}</small></li>`;
}

function renderCarDetails(company, model) {
  if (!carDetails) return;
  const details = carProfiles[company][model];

  if (locale !== "ar") {
    const brand = displayCompany(company);
    const labels = locale === "en"
      ? { overview: "Vehicle overview", source: "Official information", checks: "What to verify", limits: "Comparison notes", parts: "Parts", sources: "Sources" }
      : locale === "fr"
        ? { overview: "Presentation du vehicule", source: "Informations officielles", checks: "Points a verifier", limits: "Notes de comparaison", parts: "Pieces", sources: "Sources" }
        : { overview: "Visao geral do veiculo", source: "Informacoes oficiais", checks: "O que verificar", limits: "Notas de comparacao", parts: "Pecas", sources: "Fontes" };
    const overview = localizedText(`${model} is offered by ${brand} in configurations that vary by model year, trim, and market.`, `${model} est propose par ${brand} avec des configurations variables selon l'annee, la finition et le marche.`, `${model} e oferecido pela ${brand} em configuracoes que variam conforme o ano, a versao e o mercado.`, "");
    const source = localizedText("Use the official manufacturer page for the exact specification and equipment available in your market.", "Utilisez la page officielle du constructeur pour connaitre les specifications et les equipements de votre marche.", "Use a pagina oficial do fabricante para conferir especificacoes e equipamentos do seu mercado.", "");
    const checks = localizedText(["Confirm the model year and trim", "Check the maintenance history", "Match safety ratings to the exact vehicle"], ["Confirmez l'annee et la finition", "Verifiez l'historique d'entretien", "Associez les notes de securite au vehicule exact"], ["Confirme o ano e a versao", "Verifique o historico de manutencao", "Relacione as notas de seguranca ao veiculo exato"], []);
    carDetails.className = "car-details";
    carDetails.innerHTML = `<h3>${brand} - ${model}</h3><img src="${details.image}" alt="${brand} ${model}" loading="lazy" /><div class="detail-grid"><div class="detail-box"><h4>${labels.overview}</h4><p>${overview}</p></div><div class="detail-box"><h4>${labels.source}</h4><p>${source}</p></div><div class="detail-box"><h4>${labels.checks}</h4><ul>${checks.map((item) => `<li>${item}</li>`).join("")}</ul></div><div class="detail-box"><h4>${labels.limits}</h4><p>${localizedText("Prices, safety equipment, and running costs vary by country, year, and condition.", "Les prix, equipements de securite et couts d'utilisation varient selon le pays, l'annee et l'etat.", "Precos, equipamentos de seguranca e custos de uso variam por pais, ano e condicao.", "")}</p></div><div class="detail-box"><h4>${labels.parts}</h4><ul>${details.parts.map((part) => `<li>${part}</li>`).join("")}</ul></div></div><section class="sources-box"><h4>${labels.sources}</h4><ul>${details.sources.map(sourceItemHtml).join("")}</ul></section>`;
    return;
  }

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
        const scope = locale === "ar"
          ? sourceScopes[sourceObj.name] || "مرجع عام؛ يجب مطابقة الادعاء مع التقرير أو الصفحة الأصلية"
          : localizedText("Official or industry reference; check the primary report for the exact claim.", "Reference officielle ou sectorielle; consultez le rapport primaire pour l'affirmation exacte.", "Referencia oficial ou setorial; consulte o relatorio primario para a afirmacao exata.", "");
        return `<li><a href="${sourceObj.url}" target="_blank" rel="noopener noreferrer">${sourceObj.name}</a><small class="source-scope">${scope}</small></li>`;
      })
      .join("");

    const title = locale === "ar" ? article.title : localizedText(`Automotive analysis ${idx + 1}`, `Analyse automobile ${idx + 1}`, `Analise automotiva ${idx + 1}`, article.title);
    const summary = locale === "ar" ? article.summary : localizedText("A source-led overview of automotive technology, safety, markets, or ownership. Consult the listed primary sources for model- and market-specific information.", "Un apercu fonde sur des sources de la technologie, de la securite, des marches ou de l'usage automobile. Consultez les sources primaires pour les informations propres au modele et au marche.", "Uma visao baseada em fontes sobre tecnologia, seguranca, mercados ou uso automotivo. Consulte as fontes primarias para informacoes especificas de modelo e mercado.", article.summary);
    articleElement.innerHTML = `
      <h4>${idx + 1}. ${title}</h4>
      <p>${summary}</p>
      <div class="sources-box">
        <h5>${localizedText("Article sources", "Sources de l'article", "Fontes do artigo", "مراجع المقال")}</h5>
        <ul>${articleSources || `<li>${localizedText("General references are listed below.", "Les references generales sont indiquees ci-dessous.", "As referencias gerais estao listadas abaixo.", "مراجع عامة: راجع قائمة مراجع المقالات أدناه.")}</li>`}</ul>
      </div>
    `;
      articlesList.appendChild(articleElement);
    });

  if (!articlesList.children.length) {
    articlesList.innerHTML = `<div class="muted-box">${localizedText("No articles match your search.", "Aucun article ne correspond a votre recherche.", "Nenhum artigo corresponde a sua busca.", "لا توجد مقالات مطابقة للبحث.")}</div>`;
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

function initChatBridge() {
  const chatBox = document.querySelector(".chat-box");
  if (!chatBox || chatBox.querySelector(".chat-handoff")) return;
  const labels = localizedText("Need a human answer?", "Besoin d'une reponse humaine ?", "Precisa de uma resposta humana?", "هل تحتاج إلى إجابة من شخص؟");
  const emailLabel = localizedText("Email me", "M'envoyer un e-mail", "Enviar e-mail para mim", "أرسل لي بريدًا");
  const whatsappLabel = localizedText("WhatsApp", "WhatsApp", "WhatsApp", "واتساب");
  const subject = encodeURIComponent("AutoAtlas visitor question");
  const body = encodeURIComponent("Hello AutoAtlas, I have a question about a vehicle: ");
  const handoff = document.createElement("div");
  handoff.className = "chat-handoff";
  handoff.innerHTML = `<span>${labels}</span><a href="mailto:moolimat@gmail.com?subject=${subject}&body=${body}">${emailLabel}</a><a href="https://wa.me/962770795947?text=${body}" target="_blank" rel="noopener noreferrer">${whatsappLabel}</a>`;
  chatBox.appendChild(handoff);
}

function getBotReply(message) {
  const msg = message.trim();
  if (!msg) return localizedText("Type a vehicle question and I will provide a general, source-led answer.", "Ecrivez une question automobile et je fournirai une reponse generale fondee sur des sources.", "Escreva uma pergunta sobre carros e fornecerei uma resposta geral baseada em fontes.", "يمكنك كتابة أي سؤال عن السيارات وسأحاول مساعدتك بمعلومة عامة.");

  const normalized = msg.toLowerCase();
  const priceWords = ["price", "cost", "buy", "prix", "acheter", "preco", "comprar", "سعر", "شراء"];
  const safetyWords = ["safety", "secure", "securite", "seguranca", "أمان", "سلامة"];
  const electricWords = ["electric", "battery", "ev", "electrique", "batterie", "eletrico", "bateria", "كهرب", "بطارية", "هجينة"];
  if (priceWords.some((word) => normalized.includes(word))) return localizedText("Prices depend on country, model year, trim, taxes, and condition. Verify the final offer with an authorised local dealer.", "Le prix depend du pays, de l'annee, de la finition, des taxes et de l'etat. Verifiez l'offre finale aupres d'un concessionnaire agree.", "O preco depende do pais, ano, versao, impostos e estado. Confirme a oferta final com um concessionario autorizado.", "للدقة: راجع الوكيل المحلي حسب سنة الصنع والفئة والضرائب والحالة الفنية.");
  if (safetyWords.some((word) => normalized.includes(word))) return localizedText("Use Euro NCAP, IIHS, or NHTSA for the exact model year and equipment; ratings are not interchangeable between markets.", "Utilisez Euro NCAP, IIHS ou NHTSA pour l'annee et l'equipement exacts; les notes ne sont pas interchangeables entre marches.", "Use Euro NCAP, IIHS ou NHTSA para o ano e equipamento exatos; as avaliacoes variam por mercado.", "للمقارنة الدقيقة بالسلامة: راجع Euro NCAP وIIHS وNHTSA مع تحديد الموديل وسنة الصنع.");
  if (electricWords.some((word) => normalized.includes(word))) return localizedText("Compare usable range, charging access, battery warranty, thermal conditions, and service availability rather than headline range alone.", "Comparez l'autonomie utile, la recharge, la garantie batterie, la temperature et le service, pas seulement l'autonomie annoncee.", "Compare autonomia real, recarga, garantia da bateria, temperatura e servico, nao apenas a autonomia anunciada.", "قارن مدى الاستخدام، الشحن، ضمان البطارية، درجات الحرارة، وتوفر الخدمة قبل الاختيار.");

  return localizedText("Thanks. I can provide general information, and you can send the question to the owner for a personalised answer using the links below.", "Merci. Je peux fournir une information generale; vous pouvez envoyer la question au proprietaire pour une reponse personnalisee avec les liens ci-dessous.", "Obrigado. Posso fornecer informacoes gerais; envie a pergunta ao responsavel pelos links abaixo para uma resposta personalizada.", "شكرًا لسؤالك. أقدم معلومات عامة ويمكنك إرسال السؤال إلى صاحب الموقع عبر الروابط أدناه.");
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
  const brands = companies.map((company) => displayCompany(company));
  const companyPlaceholder = localizedText("Choose brand", "Choisir une marque", "Escolha a marca", "اختر الشركة");
  const modelPlaceholder = localizedText("Choose model", "Choisir un modele", "Escolha o modelo", "اختر الموديل");
  setSelectOptions(compareCompany1, companies, companyPlaceholder);
  setSelectOptions(compareCompany2, companies, companyPlaceholder);
  [compareCompany1, compareCompany2].forEach((select) => {
    if (!select) return;
    [...select.options].forEach((option, index) => {
      if (index > 0) option.textContent = brands[index - 1];
    });
  });
  setSelectOptions(compareModel1, [], modelPlaceholder);
  setSelectOptions(compareModel2, [], modelPlaceholder);
  if (compareModel1) compareModel1.disabled = true;
  if (compareModel2) compareModel2.disabled = true;
}

function updateCompareModels(companySelectEl, modelSelectEl) {
  if (!companySelectEl || !modelSelectEl) return;
  const companyName = companySelectEl.value;
  const models = companyName && companiesData[companyName] ? companiesData[companyName] : [];
  setSelectOptions(modelSelectEl, models, localizedText("Choose model", "Choisir un modele", "Escolha o modelo", "اختر الموديل"));
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
    compareResult.textContent = localizedText("Choose a brand and model for both vehicles, then run the comparison.", "Choisissez une marque et un modele pour les deux vehicules, puis lancez la comparaison.", "Escolha uma marca e um modelo para os dois veiculos e execute a comparacao.", "يرجى اختيار شركة وموديل لكل سيارة ثم الضغط على إجراء المقارنة.");
    return;
  }

  compareResult.className = "";
  compareResult.innerHTML = `
    <div class="compare-result-grid">
      <div class="compare-cell head compare-label">${localizedText("Item", "Element", "Item", "البند")}</div>
      <div class="compare-cell head">${displayCompany(car1.company)} - ${car1.model}</div>
      <div class="compare-cell head">${displayCompany(car2.company)} - ${car2.model}</div>

      <div class="compare-cell compare-label">${localizedText("Brand", "Marque", "Marca", "الشركة")}</div>
      <div class="compare-cell">${displayCompany(car1.company)}</div>
      <div class="compare-cell">${displayCompany(car2.company)}</div>

      <div class="compare-cell compare-label">${localizedText("Model", "Modele", "Modelo", "الموديل")}</div>
      <div class="compare-cell">${car1.model}</div>
      <div class="compare-cell">${car2.model}</div>

      <div class="compare-cell compare-label">${localizedText("Model-year range", "Plage d'annees", "Faixa de anos", "نطاق سنة الصنع")}</div>
      <div class="compare-cell">${car1.yearRange}</div>
      <div class="compare-cell">${car2.yearRange}</div>

      <div class="compare-cell compare-label">${localizedText("Parts", "Pieces", "Pecas", "أنواع القطع")}</div>
      <div class="compare-cell">${joinListAsHtml(car1.parts)}</div>
      <div class="compare-cell">${joinListAsHtml(car2.parts)}</div>

      <div class="compare-cell compare-label">${localizedText("Notes", "Notes", "Notas", "المميزات")}</div>
      <div class="compare-cell">${joinListAsHtml(car1.pros)}</div>
      <div class="compare-cell">${joinListAsHtml(car2.pros)}</div>

      <div class="compare-cell compare-label">${localizedText("Considerations", "Considerations", "Consideracoes", "العيوب")}</div>
      <div class="compare-cell">${joinListAsHtml(car1.cons)}</div>
      <div class="compare-cell">${joinListAsHtml(car2.cons)}</div>

      <div class="compare-cell compare-label">${localizedText("Sources", "Sources", "Fontes", "المصادر")}</div>
      <div class="compare-cell">${joinSourcesAsHtml(car1.sources)}</div>
      <div class="compare-cell">${joinSourcesAsHtml(car2.sources)}</div>
    </div>
  `;
}

function resetCompare() {
  if (compareCompany1) compareCompany1.value = "";
  if (compareCompany2) compareCompany2.value = "";
  setSelectOptions(compareModel1, [], localizedText("Choose model", "Choisir un modele", "Escolha o modelo", "اختر الموديل"));
  setSelectOptions(compareModel2, [], localizedText("Choose model", "Choisir un modele", "Escolha o modelo", "اختر الموديل"));
  if (compareModel1) compareModel1.disabled = true;
  if (compareModel2) compareModel2.disabled = true;

  if (compareResult) {
    compareResult.className = "muted-box";
    compareResult.textContent = localizedText("Choose two vehicles, then run the comparison to view the results.", "Choisissez deux vehicules, puis lancez la comparaison pour voir les resultats.", "Escolha dois veiculos e execute a comparacao para ver os resultados.", 'اختر سيارتين ثم اضغط "إجراء المقارنة" لعرض النتائج.');
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

initChatBridge();

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
