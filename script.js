window.addEventListener("error", (event) => {
  console.error("AutoAtlas startup error:", event.error || event.message);
  document.documentElement.dataset.autoatlasError = event.message || "startup-error";
});

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
  { title: "مستقبل صناعة السيارات في العالم العربي", summary: "اتجاهات محتملة مرتبطة بالطاقة، البنية التحتية، والتشريعات.", sources: ["IEA - Global EV Outlook", "GCC-STAT", "Jordan Customs"] },
  { title: "إدارة البطارية في السيارات الكهربائية", summary: "كيف تراقب أنظمة إدارة البطارية الجهد والحرارة والتوازن، ولماذا يجب فصل العمر المتوقع عن الوعود التسويقية.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "الشحن السريع وتأثيره على الاستخدام اليومي", summary: "قراءة هندسية لمفاهيم القدرة والطاقة ووقت الشحن، مع التمييز بين قدرة الشاحن وحدود السيارة والبطارية.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "الفرملة المتجددة بين الكفاءة والراحة", summary: "دور استعادة الطاقة في تقليل الفاقد، وحدودها عند امتلاء البطارية أو انخفاض التماسك أو اختلاف معايرة الدواسة.", sources: ["NHTSA", "Euro NCAP"] },
  { title: "الهجين التقليدي والهجين القابل للشحن", summary: "مقارنة بنيوية بين النظامين من حيث حجم البطارية، نمط الاستخدام، الشحن الخارجي، والصيانة المحتملة.", sources: ["IEA - Global EV Outlook", "Toyota Global"] },
  { title: "محركات الاحتراق والانبعاثات الواقعية", summary: "لماذا تختلف نتائج المختبر عن الطريق، وكيف تقرأ معايير الاختبار دون تحويل نتيجة واحدة إلى حكم شامل على كل المركبات.", sources: ["NHTSA", "ACEA"] },
  { title: "الوقود الاصطناعي ومستقبل المحركات", summary: "حدود الوقود الاصطناعي وكلفة الطاقة والبنية التحتية مقارنة بالكهرباء والهيدروجين، دون افتراض حل واحد لكل القطاعات.", sources: ["IEA - Global EV Outlook", "ACEA"] },
  { title: "الهيدروجين في النقل الخفيف والثقيل", summary: "تحليل الفرق بين خلية الوقود والهيدروجين كوقود احتراق، ومتى قد تكون الكثافة والسرعة التشغيلية عوامل حاسمة.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "أنظمة مساعدة السائق وحدود القيادة الذاتية", summary: "تصنيف عملي لمستويات المساعدة، مع التركيز على مسؤولية السائق وحدود المستشعرات والطرق والطقس.", sources: ["NHTSA", "IIHS"] },
  { title: "الرؤية الحاسوبية والرادار في السيارة", summary: "كيف تتكامل الكاميرات والرادارات، ولماذا لا يعني وجود المستشعر أن النظام يفهم كل موقف قيادة.", sources: ["NHTSA", "Euro NCAP"] },
  { title: "تحديثات البرمجيات عبر الهواء", summary: "فوائد ومخاطر تحديث البرمجيات عن بعد، وإدارة الإصدارات والاسترجاع والأمن السيبراني في المركبات المتصلة.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "الأمن السيبراني للمركبات المتصلة", summary: "مبادئ تقليل سطح الهجوم وحماية الاتصالات والهوية وسجل التحديثات في المركبات الحديثة.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "إصلاح البطاريات وإعادة تدويرها", summary: "الفارق بين إصلاح وحدة أو استبدال حزمة كاملة، وأهمية التشخيص والعزل والسلامة قبل التعامل مع الجهد العالي.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "المواد الخام لسلاسل بطاريات السيارات", summary: "كيف تؤثر المعادن والتكرير وإعادة التدوير وتنويع الكيميائيات في استدامة سلسلة التوريد.", sources: ["IEA - Global EV Outlook", "World Bank Data"] },
  { title: "كيميائيات بطاريات الليثيوم", summary: "مقارنة مفاهيمية بين اختلافات الكثافة والطاقة الحرارية والعمر دون اختزال الاختيار في اسم كيميائي واحد.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "ديناميكا الهواء واستهلاك الطاقة", summary: "لماذا تؤثر مساحة الواجهة والإطارات والارتفاع والسرعة في مدى السيارة، وكيف تراجع الادعاءات وفق ظروف الاختبار.", sources: ["NHTSA", "Euro NCAP"] },
  { title: "الإطارات الذكية وكفاءة المركبة", summary: "أثر ضغط الإطارات والمركب والنقشة على الكفاءة والتماسك والضجيج، مع أولوية توصية الصانع والسلامة.", sources: ["NHTSA", "IIHS"] },
  { title: "منصة السيارة والمعمارية الكهربائية", summary: "كيف تؤثر المنصة في توزيع الكتلة، المساحة، التبريد، قابلية التوسع، وكلفة تطوير الطرازات.", sources: ["ACEA", "OICA"] },
  { title: "التصنيع المرن والمصانع الذكية", summary: "دور الأتمتة والتوأم الرقمي ومراقبة الجودة في المصنع، وما لا يمكن استنتاجه من مصطلح مصنع ذكي وحده.", sources: ["OICA", "ACEA"] },
  { title: "إعادة تعريف المقصورة بالبرمجيات", summary: "انتقال وظائف المقصورة من أزرار ثابتة إلى منصات برمجية، وموازنة الراحة وقابلية الاستخدام والسلامة.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "البيانات التليماتية وخصوصية السائق", summary: "ما الذي قد تجمعه المركبة المتصلة، وكيف تميّز بين بيانات الصيانة والتشغيل والبيانات الشخصية الحساسة.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "تقييم دورة حياة السيارة الكهربائية", summary: "قراءة دورة الحياة من التصنيع إلى التشغيل وإعادة التدوير، مع تجنب المقارنات التي تهمل مصدر الكهرباء أو عمر المركبة.", sources: ["IEA - Global EV Outlook", "World Bank Data"] },
  { title: "البنية التحتية للشحن في المدن", summary: "تخطيط الشحن المنزلي والعام والعمل، والتوازن بين قدرة الشبكة وسلوك الاستخدام وتوزيع المحطات.", sources: ["IEA - Global EV Outlook", "World Bank Data"] },
  { title: "الشحن ثنائي الاتجاه والشبكة الكهربائية", summary: "إمكانات V2G وV2H وحدودها المرتبطة بالتوافق، التعرفة، الضمان، وإدارة الطلب على الشبكة.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "السيارات في المناخ الحار", summary: "تأثير الحرارة على التبريد والبطارية والإطارات والراحة، وما يجب قياسه بدل الاعتماد على انطباعات عامة.", sources: ["NHTSA", "IEA - Global EV Outlook"] },
  { title: "الماء والغبار في المركبات الكهربائية", summary: "دور درجات الحماية والعزل وإجراءات الطوارئ، ولماذا لا تعني مقاومة الماء صلاحية القيادة في كل ظرف.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "سلامة المشاة والدراجات", summary: "كيف تغيّر أنظمة التحذير والكبح وتصميم مقدمة السيارة من حماية مستخدمي الطريق الأضعف.", sources: ["Euro NCAP", "IIHS"] },
  { title: "اختبارات التصادم وكيف تقرأها", summary: "الفرق بين درجات الاختبار ومعدلات الحوادث الواقعية، وأهمية الفئة والسنة والتجهيز والسوق.", sources: ["Euro NCAP", "IIHS", "NHTSA"] },
  { title: "أنظمة حماية الأطفال في السيارات", summary: "اختيار التثبيت المناسب وفهم الفروق بين الاختبارات والمقاعد والاستخدام اليومي دون تقديم نصيحة بديلة عن كتيب المركبة.", sources: ["NHTSA", "Euro NCAP"] },
  { title: "اقتصاد التملك لا سعر الشراء فقط", summary: "منهج حساب يجمع الطاقة والصيانة والتأمين والإطارات والاستهلاك والقيمة المتبقية مع اختلاف السوق.", sources: ["World Bank Data", "NHTSA"] },
  { title: "الصيانة الوقائية للمركبات الحديثة", summary: "ما الذي يبقى مهمًا في السيارات المبرمجة والكهربائية: السوائل، الإطارات، الفرامل، العزل، والتشخيص.", sources: ["Toyota Global", "NHTSA"] },
  { title: "تشخيص أعطال الجهد العالي", summary: "مبادئ السلامة والعزل والتشخيص المهني، ولماذا لا يجوز تنفيذ إصلاحات حزمة البطارية دون تدريب وتجهيز معتمد.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "مستقبل سوق السيارات المستعملة", summary: "كيف ستتغير قراءة سجل البطارية والبرمجيات والشحن والضمان عند تقييم سيارة كهربائية مستعملة.", sources: ["IEA - Global EV Outlook", "NHTSA"] },
  { title: "الروبوتاكسي ومستقبل التنقل", summary: "شروط التوسع من خرائط ومجالات تشغيل محددة إلى خدمة أوسع، مع فصل العرض التجريبي عن الاعتماد التجاري.", sources: ["NHTSA", "UNECE Vehicle Regulations"] },
  { title: "المدن القابلة للمشي والسيارة", summary: "كيف تؤثر كثافة المدينة والنقل العام ومواقف السيارات والشحن في نوع السيارة المطلوبة وليس في تقنيتها فقط.", sources: ["World Bank Data", "IEA - Global EV Outlook"] },
  { title: "هل ستختفي ملكية السيارة؟", summary: "مقارنة واقعية بين الملكية والاشتراك والمشاركة حسب المسافة والدخل والبنية التحتية والخصوصية.", sources: ["World Bank Data", "OICA"] },
  { title: "الذكاء الاصطناعي في هندسة المركبات", summary: "استخدام النماذج في التصميم والمحاكاة والتنبؤ بالصيانة، مع بقاء التحقق الهندسي والاختبار الميداني شرطًا.", sources: ["NHTSA", "ACEA"] },
  { title: "توقعات السيارات حتى 2035", summary: "سيناريوهات مشروطة للطاقة والبطاريات والبرمجيات والتنظيم، لا وعود زمنية أو أرقامًا غير مثبتة.", sources: ["IEA - Global EV Outlook", "OICA", "UNECE Vehicle Regulations"] }
];

const modelImageMap = {
  Corolla: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Camry: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "Land Cruiser": "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Hilux: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Yaris: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "C-Class": "https://images.unsplash.com/photo-1617814065893-00757125d2e8?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "E-Class": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "S-Class": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80&fm=webp",
  GLC: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "G-Class": "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "3 Series": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "5 Series": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "7 Series": "https://images.unsplash.com/photo-1549399542-7e82138f24f7?auto=format&fit=crop&w=1200&q=80&fm=webp",
  X5: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80&fm=webp",
  X3: "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Focus: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Mustang: "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Explorer: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "F-150": "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Edge: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Elantra: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Sonata: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Tucson: "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "Santa Fe": "https://images.unsplash.com/photo-1618843479619-e9b4dbda4ac5?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Accent: "https://images.unsplash.com/photo-1549925862-9908f9e3f5c9?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Cerato: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Sportage: "https://images.unsplash.com/photo-1617469767053-d3b523a0b6df?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Sorento: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Rio: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80&fm=webp",
  K5: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Civic: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Accord: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "CR-V": "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Pilot: "https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1200&q=80&fm=webp",
  City: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Sunny: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Altima: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Patrol: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80&fm=webp",
  "X-Trail": "https://images.unsplash.com/photo-1616789916185-5f5f1d8d26ab?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Maxima: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80&fm=webp",
  A3: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80&fm=webp",
  A4: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80&fm=webp",
  A6: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Q5: "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Q7: "https://images.unsplash.com/photo-1549399542-7e82138f24f7?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Golf: "https://images.unsplash.com/photo-1549399542-7e82138f24f7?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Passat: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Tiguan: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Touareg: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80&fm=webp",
  Jetta: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80&fm=webp"
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
let articlesList = document.getElementById("articles-list") || document.querySelector(".articles-list");
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
const langButtons = document.querySelectorAll(".lang-btn, .lang-pill, .lang-switch a, .lang-switcher a");

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
const AI_CHAT_ENDPOINT = "";
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

function buildExpertArticle(article, index) {
  const title = article.title;
  const sourceNames = (article.sources || []).join(", ");
  const intro = localizedText(
    `This expert briefing examines ${title.toLowerCase()} from an engineering and decision-making perspective. It separates measured evidence from marketing language and does not treat a general source as proof of a specific vehicle specification.`,
    `Cette analyse examine ${title.toLowerCase()} sous un angle d'ingenierie et d'aide a la decision. Elle separe les donnees mesurees du langage marketing et n'utilise pas une source generale pour prouver une specification particuliere.`,
    `Esta analise examina ${title.toLowerCase()} sob uma perspectiva de engenharia e decisao. Ela separa dados medidos de linguagem de marketing e nao usa uma fonte geral como prova de uma especificacao especifica.`,
    `تتناول هذه القراءة موضوع «${title}» من زاوية هندسية تساعد على اتخاذ القرار، مع فصل البيانات المقاسة عن اللغة التسويقية، وعدم اعتبار المصدر العام إثباتًا لمواصفة طراز محدد.`
  );
  const engineering = localizedText(
    `Engineering frame: begin with the system boundary, the operating conditions, and the quantity being measured. For a vehicle, model year, trim, market, software version, temperature, load, and test cycle can change the result. A sound comparison therefore names these variables before drawing a conclusion. The useful question is not whether a technology is “best”, but which constraint it solves and what trade-off it introduces.`,
    `Cadre d'ingenierie : commencez par definir le systeme, les conditions d'utilisation et la grandeur mesuree. Pour un vehicule, l'annee, la finition, le marche, le logiciel, la temperature, la charge et le cycle d'essai peuvent modifier le resultat. Une comparaison serieuse nomme ces variables avant toute conclusion.`,
    `Enquadramento de engenharia: defina o sistema, as condicoes de uso e a grandeza medida. Em um veiculo, ano, versao, mercado, software, temperatura, carga e ciclo de teste podem alterar o resultado. Uma comparacao correta identifica essas variaveis antes da conclusao.`,
    `الإطار الهندسي: ابدأ بتحديد حدود النظام وظروف التشغيل والكمية المقاسة. فسنة الصنع والفئة والسوق وإصدار البرمجيات ودرجة الحرارة والحمل ودورة الاختبار قد تغير النتيجة. لذلك يجب تسمية هذه المتغيرات قبل الاستنتاج، والسؤال الصحيح ليس أي تقنية «أفضل» بل ما القيد الذي تحله وما المقابل الذي تفرضه.`
  );
  const evidence = localizedText(
    `Evidence reading: the primary references listed for this topic are used for their stated scope only. Manufacturer pages describe products and declared equipment; regulators and safety organizations describe rules, recalls, or test results; international agencies describe market, energy, or policy trends. None of these categories should be silently converted into a promise about reliability, resale value, or a particular owner's experience.`,
    `Lecture des preuves : les references primaires listees sont utilisees dans leur domaine declare. Les constructeurs decrivent leurs produits et equipements; les organismes officiels publient regles, rappels ou tests; les agences internationales decrivent les tendances. Ces categories ne doivent pas etre transforme es en promesse de fiabilite ou de valeur residuelle.`,
    `Leitura das evidencias: as fontes primarias listadas sao usadas apenas dentro de seu escopo. Fabricantes descrevem produtos e equipamentos; reguladores e organizacoes de seguranca publicam regras, recalls ou testes; agencias internacionais descrevem tendencias. Nenhuma categoria deve virar promessa de confiabilidade ou valor de revenda.`,
    `قراءة الدليل: تُستخدم المراجع الأصلية المدرجة ضمن نطاقها فقط. صفحات المصنع تصف المنتجات والتجهيزات، والجهات التنظيمية تنشر القواعد والاستدعاءات أو نتائج الاختبارات، والوكالات الدولية تشرح اتجاهات الطاقة والسوق والسياسات. لا يجوز تحويل هذه الأنواع إلى وعد بالاعتمادية أو قيمة إعادة البيع.`
  );
  const practical = localizedText(
    `Practical method: identify the exact vehicle and market; record the source date and test method; compare like with like; ask what is missing; and confirm the final decision with the owner's manual, an authorised service centre, or the relevant regulator. Keep a short audit trail containing the URL, access date, model year, and assumptions. This prevents a headline, a social post, or an image from becoming an unsupported technical claim.`,
    `Methode pratique : identifiez le vehicule et le marche exacts; notez la date et la methode de la source; comparez des donnees comparables; cherchez ce qui manque; puis confirmez la decision avec le manuel, un atelier agree ou l'organisme competent. Conservez l'URL, la date, l'annee et les hypotheses.`,
    `Metodo pratico: identifique o veiculo e o mercado; registre data e metodo da fonte; compare dados equivalentes; procure o que falta; e confirme a decisao no manual, em oficina autorizada ou no orgao competente. Guarde URL, data, ano e premissas para uma trilha de verificacao.`,
    `الطريقة العملية: حدد الطراز والسوق بدقة، وسجل تاريخ المصدر وطريقة الاختبار، وقارن بيانات متشابهة، واسأل عما ينقص، ثم أكد القرار من دليل المالك أو مركز معتمد أو الجهة التنظيمية. احتفظ بالرابط والتاريخ وسنة الطراز والافتراضات حتى لا يتحول العنوان أو المنشور أو الصورة إلى ادعاء فني بلا سند.`
  );
  const future = localizedText(
    `Forward view: the next phase of automotive development will likely be defined by integration rather than one isolated invention: energy storage, thermal management, software, sensing, manufacturing, and regulation must work together. Forecasts remain scenarios. They should be updated when new measurements, rules, costs, or field data appear, rather than presented as guaranteed dates or universal outcomes.`,
    `Perspective : la prochaine phase sera probablement definie par l'integration de l'energie, de la gestion thermique, du logiciel, des capteurs, de la fabrication et de la regulation. Les previsions restent des scenarios et doivent etre mises a jour avec les nouvelles mesures, regles, couts et donnees de terrain.`,
    `Perspectiva: a proxima fase provavelmente sera definida pela integracao de energia, gerenciamento termico, software, sensores, fabricacao e regulacao. Previsoes sao cenarios e devem ser atualizadas quando surgirem novas medicoes, regras, custos ou dados de campo.`,
    `النظرة المستقبلية: ستتحدد المرحلة المقبلة غالبًا بتكامل تخزين الطاقة والإدارة الحرارية والبرمجيات والمستشعرات والتصنيع والتنظيم، لا باختراع منفرد. والتوقعات تظل سيناريوهات تُحدَّث عند ظهور قياسات أو قواعد أو تكاليف أو بيانات ميدانية جديدة، ولا تُعرض كمواعيد مضمونة.`
  );
  return { title, intro, engineering, evidence, practical, future, sourceNames, index };
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
    showcase.innerHTML = `<div class="section-heading-row"><div><span class="section-kicker">${showcaseCopy.kicker}</span><h2>🏁 ${showcaseCopy.title}</h2></div><a href="${locale === "en" ? "car-detail-en.html" : locale === "fr" ? "car-detail-fr.html" : "car-detail-pt.html"}" class="ghost-link">${showcaseCopy.link}</a></div><div class="model-grid">${showcaseCopy.cards.map((card, index) => `<a class="model-card-link" href="${locale === "en" ? "car-detail-en.html" : locale === "fr" ? "car-detail-fr.html" : "car-detail-pt.html"}"><article class="model-card"><div class="model-image"><img src="${images[index]}"     alt="${card[0]}" loading="lazy" decoding="async" /><span class="model-badge">${card[1]}</span></div><div class="model-content"><h3>${card[0]}</h3><p>${card[2]}</p><div class="model-meta"><span>${locale === "en" ? "Official sources" : locale === "fr" ? "Sources officielles" : "Fontes oficiais"}</span><span>${locale === "en" ? "Specifications vary by market" : locale === "fr" ? "Specifications selon le marche" : "Especificacoes variam por mercado"}</span></div></div></article></a>`).join("")}</div>`;
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
    });
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
articlesList = document.getElementById("articles-list") || document.querySelector(".articles-list");
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
    ,companies: { ar: "companies.html", en: "companies-en.html", pt: "companies-pt.html", fr: "companies-fr.html" }
    ,models: { ar: "models.html", en: "models-en.html", pt: "models-pt.html", fr: "models-fr.html" }
    ,compare: { ar: "compare.html", en: "compare-en.html", pt: "compare-pt.html", fr: "compare-fr.html" }
    ,technology: { ar: "technology.html", en: "technology-en.html", pt: "technology-pt.html", fr: "technology-fr.html" }
    ,technologyEv: { ar: "technology-ev.html", en: "technology-ev-en.html", pt: "technology-ev-pt.html", fr: "technology-ev-fr.html" }
    ,technologyCharging: { ar: "technology-charging.html", en: "technology-charging-en.html", pt: "technology-charging-pt.html", fr: "technology-charging-fr.html" }
    ,technologyRenewables: { ar: "technology-renewables.html", en: "technology-renewables-en.html", pt: "technology-renewables-pt.html", fr: "technology-renewables-fr.html" }
    ,technologyFuture: { ar: "technology-future.html", en: "technology-future-en.html", pt: "technology-future-pt.html", fr: "technology-future-fr.html" }
    ,about: { ar: "about.html", en: "about-en.html", pt: "about-pt.html", fr: "about-fr.html" }
  };
  const languageLabels = { "العربية": "ar", English: "en", "Português": "pt", "Français": "fr", AR: "ar", EN: "en", PT: "pt", FR: "fr" };
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

function initLocalizedFooter() {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const language = currentPage === "en.html" || currentPage.endsWith("-en.html") ? "en" : currentPage === "pt.html" || currentPage.endsWith("-pt.html") ? "pt" : currentPage === "fr.html" || currentPage.endsWith("-fr.html") ? "fr" : "ar";
      const copy = {
        ar: [["الخصوصية", "privacy.html"], ["الشروط", "terms.html"], ["تواصل", "contact.html"]],
        en: [["Privacy", "privacy-en.html"], ["Terms", "terms-en.html"], ["Contact", "contact-en.html"]],
        pt: [["Privacidade", "privacy-pt.html"], ["Termos", "terms-pt.html"], ["Contato", "contact-pt.html"]],
        fr: [["Confidentialité", "privacy-fr.html"], ["Conditions", "terms-fr.html"], ["Contact", "contact-fr.html"]]
      }[language];
      document.querySelectorAll(".site-footer .container").forEach((footer) => {
        if (footer.querySelector(".footer-links")) return;
        const nav = document.createElement("nav");
        nav.className = "footer-links";
        nav.setAttribute("aria-label", language === "ar" ? "روابط الموقع" : language === "fr" ? "Liens du site" : language === "pt" ? "Links do site" : "Site links");
        nav.innerHTML = copy.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
        footer.appendChild(nav);
      });
    }
function initSiteNavigation() {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const language = currentPage === "en.html" || currentPage.endsWith("-en.html") ? "en" : currentPage === "pt.html" || currentPage.endsWith("-pt.html") ? "pt" : currentPage === "fr.html" || currentPage.endsWith("-fr.html") ? "fr" : "ar";
      const page = currentPage === "index.html" || currentPage === "en.html" || currentPage === "pt.html" || currentPage === "fr.html" ? "home" :
        currentPage.replace("-en.html", "").replace("-pt.html", "").replace("-fr.html", "").replace(".html", "") || "home";
      const pages = {
        home: { ar: "index.html", en: "en.html", pt: "pt.html", fr: "fr.html" },
        companies: { ar: "companies.html", en: "companies-en.html", pt: "companies-pt.html", fr: "companies-fr.html" },
        models: { ar: "models.html", en: "models-en.html", pt: "models-pt.html", fr: "models-fr.html" },
        compare: { ar: "compare.html", en: "compare-en.html", pt: "compare-pt.html", fr: "compare-fr.html" },
        technology: { ar: "technology.html", en: "technology-en.html", pt: "technology-pt.html", fr: "technology-fr.html" },
        articles: { ar: "articles.html", en: "articles-en.html", pt: "articles-pt.html", fr: "articles-fr.html" },
        about: { ar: "about.html", en: "about-en.html", pt: "about-pt.html", fr: "about-fr.html" },
        privacy: { ar: "privacy.html", en: "privacy-en.html", pt: "privacy-pt.html", fr: "privacy-fr.html" },
        chat: { ar: "index.html#chat", en: "en.html#chat", pt: "pt.html#chat", fr: "fr.html#chat" }
      };
      const labels = {
        ar: ["السيارات", "الموديلات", "المقارنة", "التقنيات", "المقالات", "من نحن", "🔒 الخصوصية", "الدردشة"],
        en: ["Cars", "Models", "Compare", "Technology", "Articles", "About", "🔒 Privacy", "Chat"],
        pt: ["Carros", "Modelos", "Comparar", "Tecnologia", "Artigos", "Sobre", "🔒 Privacidade", "Chat"],
        fr: ["Voitures", "Modèles", "Comparer", "Technologie", "Articles", "À propos", "🔒 Confidentialité", "Chat"]
      }[language];
      const keys = ["companies", "models", "compare", "technology", "articles", "about", "privacy", "chat"];
      document.querySelectorAll(".main-nav").forEach((nav) => {
        nav.innerHTML = keys.map((key, index) => `<a href="${pages[key][language]}">${labels[index]}</a>`).join("");
      });
    }

function initHomePortal() {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      if (!["index.html", "en.html", "pt.html", "fr.html"].includes(currentPage)) return;
      const language = currentPage === "en.html" ? "en" : currentPage === "pt.html" ? "pt" : currentPage === "fr.html" ? "fr" : "ar";
      const copy = {
        ar: { eyebrow: "بوابتك إلى عالم السيارات", title: "اكتشف، قارن، واختر بثقة", text: "تجربة أبسط تبدأ من المعلومة الصحيحة: شركات، موديلات، تقنيات، ومقالات في صفحات واضحة.", cards: [["شركات السيارات", "تعرف على العلامات ومصادرها الرسمية.", "companies.html"], ["الموديلات والسيارات", "بطاقات مختصرة ومواصفات قابلة للتحقق.", "models.html"], ["المقارنات", "ضع سيارتين جنبًا إلى جنب.", "compare.html"], ["التقنيات الكهربائية", "افهم البطارية والشحن والسلامة.", "technology.html"], ["المقالات", "قراءات تحليلية بلا مبالغات.", "articles.html"], ["من نحن", "تعرف على منهجية AutoAtlas.", "about.html"], ["🔒 مركز الخصوصية", "اطلع على سياسة الخصوصية وخيارات ملفات الارتباط.", "privacy.html"]] },
        en: { eyebrow: "Your automotive starting point", title: "Discover, compare, choose with confidence", text: "A clearer experience for researching brands, models, technology, and automotive articles.", cards: [["Car brands", "Explore brands and official sources.", "companies-en.html"], ["Models & cars", "Scan concise cards and key facts.", "models-en.html"], ["Comparisons", "Put two vehicles side by side.", "compare-en.html"], ["Electric technology", "Understand batteries, charging, and safety.", "technology-en.html"], ["Articles", "Read practical, source-aware analysis.", "articles-en.html"], ["About us", "Learn how AutoAtlas works.", "about-en.html"], ["🔒 Privacy center", "Read the privacy policy and cookie choices.", "privacy-en.html"]] },
        pt: { eyebrow: "Seu ponto de partida automotivo", title: "Descubra, compare e escolha melhor", text: "Uma experiência clara para pesquisar marcas, modelos, tecnologia e artigos automotivos.", cards: [["Marcas", "Explore marcas e fontes oficiais.", "companies-pt.html"], ["Modelos e carros", "Veja cartões e dados essenciais.", "models-pt.html"], ["Comparações", "Compare dois veículos lado a lado.", "compare-pt.html"], ["Tecnologia elétrica", "Entenda bateria, recarga e segurança.", "technology-pt.html"], ["Artigos", "Leia análises baseadas em fontes.", "articles-pt.html"], ["Sobre nós", "Conheça a metodologia AutoAtlas.", "about-pt.html"], ["🔒 Central de privacidade", "Leia a politica e as escolhas de cookies.", "privacy-pt.html"]] },
        fr: { eyebrow: "Votre point de départ automobile", title: "Découvrez, comparez, choisissez mieux", text: "Une expérience claire pour explorer les marques, modèles, technologies et articles automobiles.", cards: [["Marques", "Explorez les marques et sources officielles.", "companies-fr.html"], ["Modèles et voitures", "Consultez les fiches et données clés.", "models-fr.html"], ["Comparaisons", "Mettez deux véhicules côte à côte.", "compare-fr.html"], ["Technologie électrique", "Comprenez batterie, recharge et sécurité.", "technology-fr.html"], ["Articles", "Lisez des analyses fondées sur les sources.", "articles-fr.html"], ["À propos", "Découvrez la méthode AutoAtlas.", "about-fr.html"], ["🔒 Centre de confidentialite", "Consultez la politique et les choix de cookies.", "privacy-fr.html"]] }
      }[language];
      const main = document.querySelector("main");
      const hero = main?.querySelector(".hero");
      if (!main || !hero || main.querySelector(".home-portal")) return;
      const portal = document.createElement("section");
      portal.className = "home-portal";
      portal.innerHTML = `<div class="portal-copy"><span class="section-kicker">${copy.eyebrow}</span><h2>${copy.title}</h2><p>${copy.text}</p></div><div class="portal-grid">${copy.cards.map(([title, text, href]) => `<a class="portal-card" href="${href}"><span class="portal-arrow" aria-hidden="true">↗</span><h3>${title}</h3><p>${text}</p></a>`).join("")}</div>`;
      hero.insertAdjacentElement("afterend", portal);
      main.querySelectorAll(":scope > section:not(.hero):not(.home-portal)").forEach((section) => section.classList.add("legacy-home-section"));
    }

    function initLazyBackgrounds() {
      const backgrounds = {
        "electric-image": "linear-gradient(135deg, rgba(15, 23, 42, .18), rgba(37, 99, 235, .35)), url(\"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80&fm=webp\")",
        "suv-image": "linear-gradient(135deg, rgba(15, 23, 42, .2), rgba(6, 182, 212, .35)), url(\"https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80&fm=webp\")",
        "sedan-image": "linear-gradient(135deg, rgba(15, 23, 42, .2), rgba(124, 58, 237, .3)), url(\"https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80&fm=webp\")",
        "model-image-one": "linear-gradient(180deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.48)), url(\"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80&fm=webp\")",
        "model-image-two": "linear-gradient(180deg, rgba(15, 23, 42, 0.12), rgba(15, 23, 42, 0.5)), url(\"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80&fm=webp\")",
        "model-image-three": "linear-gradient(180deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.45)), url(\"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80&fm=webp\")"
      };
      const targets = [];
      Object.entries(backgrounds).forEach(([className, background]) => {
        document.querySelectorAll(`.${className}`).forEach((element) => {
          element.classList.add("lazy-bg");
          element.style.setProperty("--lazy-background", background);
          targets.push(element);
        });
      });
      const load = (element) => {
        element.classList.add("is-loaded");
        element.removeAttribute("data-lazy-background");
      };
      if (!("IntersectionObserver" in window)) {
        targets.forEach(load);
        return;
      }

      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          load(entry.target);
          instance.unobserve(entry.target);
        });
      }, { rootMargin: "240px 0px" });
      targets.forEach((element) => {
        element.setAttribute("data-lazy-background", "true");
        observer.observe(element);
      });
    }

function initThemeControl() {
  const savedTheme = window.localStorage.getItem("autoatlas-theme");
  const theme = savedTheme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const language = currentPage.endsWith("-en.html") ? "en" : currentPage.endsWith("-pt.html") ? "pt" : currentPage.endsWith("-fr.html") ? "fr" : "ar";
  const labels = {
    ar: { dark: "الوضع الداكن", light: "الوضع الفاتح", switchTo: "تفعيل الوضع الفاتح" },
    en: { dark: "Dark mode", light: "Light mode", switchTo: "Switch to light mode" },
    pt: { dark: "Modo escuro", light: "Modo claro", switchTo: "Ativar modo claro" },
    fr: { dark: "Mode sombre", light: "Mode clair", switchTo: "Activer le mode clair" }
  }[language];
  document.querySelectorAll(".site-header .container").forEach((container) => {
    if (container.querySelector(".theme-toggle")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    button.setAttribute("aria-label", theme === "light" ? labels.dark : labels.switchTo);
    button.innerHTML = `<span aria-hidden="true">${theme === "light" ? "☀" : "☾"}</span><span>${theme === "light" ? labels.light : labels.dark}</span>`;
    button.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem("autoatlas-theme", nextTheme);
      button.setAttribute("aria-pressed", nextTheme === "light" ? "true" : "false");
      button.setAttribute("aria-label", nextTheme === "light" ? labels.dark : labels.switchTo);
      button.innerHTML = `<span aria-hidden="true">${nextTheme === "light" ? "☀" : "☾"}</span><span>${nextTheme === "light" ? labels.light : labels.dark}</span>`;
    });
    const target = container.querySelector(".nav-container, .header-top");
    if (target) target.appendChild(button);
  });
}

function initCookieConsent() {
  const banner = document.getElementById("cookie-consent");
  if (!banner) return;

  const consentKey = "autoatlas-cookie-consent";
  if (window.localStorage.getItem(consentKey)) {
    banner.hidden = true;
    return;
  }

  banner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      window.localStorage.setItem(consentKey, button.dataset.cookieChoice);
      banner.hidden = true;
    });
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

function initSmartVehicleSearch() {
  if (!companySearchInput) return;
  let suggestions = document.getElementById("vehicle-suggestions");
  if (!suggestions) {
    suggestions = document.createElement("datalist");
    suggestions.id = "vehicle-suggestions";
    companySearchInput.parentElement?.appendChild(suggestions);
  }
  const options = [];
  Object.keys(companiesData).forEach((companyName) => {
    options.push({ value: companyName, label: displayCompany(companyName) });
    companiesData[companyName].forEach((modelName) => {
      options.push({ value: modelName, label: `${modelName} - ${displayCompany(companyName)}` });
    });
  });
  suggestions.innerHTML = options.map((option) => `<option value="${option.value}" label="${option.label}"></option>`).join("");
  companySearchInput.setAttribute("autocomplete", "off");
  companySearchInput.setAttribute("aria-autocomplete", "list");
  const updateResults = () => {
    const value = companySearchInput.value.trim();
    const matchingCompany = Object.keys(companiesData).find((companyName) =>
      companyName.toLowerCase() === value.toLowerCase() || displayCompany(companyName).toLowerCase() === value.toLowerCase()
    );
    const matchingModel = Object.keys(companiesData).find((companyName) =>
      companiesData[companyName].some((modelName) => modelName.toLowerCase() === value.toLowerCase())
    );
    if (matchingCompany || matchingModel) {
      selectedCompany = matchingCompany || matchingModel;
      renderCompanies(value);
      renderCars(selectedCompany, matchingModel ? value : "");
      return;
    }
    renderCompanies(value);
    if (selectedCompany) renderCars(selectedCompany, value);
  };
  companySearchInput.addEventListener("input", updateResults);
  companySearchInput.addEventListener("change", updateResults);
  companySearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      companySearchInput.value = "";
      updateResults();
      companySearchInput.blur();
    }
  });
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
    carDetails.innerHTML = `<h3>${brand} - ${model}</h3>    <img src="${details.image}" alt="${brand} ${model}" loading="lazy" decoding="async" /><div class="detail-grid"><div class="detail-box"><h4>${labels.overview}</h4><p>${overview}</p></div><div class="detail-box"><h4>${labels.source}</h4><p>${source}</p></div><div class="detail-box"><h4>${labels.checks}</h4><ul>${checks.map((item) => `<li>${item}</li>`).join("")}</ul></div><div class="detail-box"><h4>${labels.limits}</h4><p>${localizedText("Prices, safety equipment, and running costs vary by country, year, and condition.", "Les prix, equipements de securite et couts d'utilisation varient selon le pays, l'annee et l'etat.", "Precos, equipamentos de seguranca e custos de uso variam por pais, ano e condicao.", "")}</p></div><div class="detail-box"><h4>${labels.parts}</h4><ul>${details.parts.map((part) => `<li>${part}</li>`).join("")}</ul></div></div><section class="sources-box"><h4>${labels.sources}</h4><ul>${details.sources.map(sourceItemHtml).join("")}</ul></section>`;
    return;
  }

  carDetails.className = "car-details";
  carDetails.innerHTML = `
    <h3>${company} - ${model}</h3>
    <img src="${details.image}" alt="صورة توضيحية للطراز ${model} من ${company}" loading="lazy" decoding="async" />
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
  articlesList = document.getElementById("articles-list") || document.querySelector(".articles-list");
  if (!articlesList) return;
  if (!articleSearchInput) {
    const wrapper = document.createElement("div");
    wrapper.className = "tools-row";
    const input = document.createElement("input");
    input.id = "article-search";
    input.type = "search";
    input.placeholder = ui.searchArticles;
    input.setAttribute("aria-label", ui.searchArticles);
    wrapper.appendChild(input);
    articlesList.parentElement?.insertBefore(wrapper, articlesList);
    articleSearchInput = input;
    articleSearchInput.addEventListener("input", () => renderArticles(articleSearchInput.value));
  }
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

    const expertArticle = buildExpertArticle(article, idx + 1);
    const title = locale === "ar"
      ? article.title
      : localizedText(`Engineering briefing ${idx + 1}: ${article.title}`, `Analyse d'ingenierie ${idx + 1} : ${article.title}`, `Analise de engenharia ${idx + 1}: ${article.title}`, article.title);
    const summary = locale === "ar"
      ? article.summary
      : localizedText("A source-led overview of automotive technology, safety, markets, or ownership. Consult the listed primary sources for model- and market-specific information.", "Un apercu fonde sur des sources de la technologie, de la securite, des marches ou de l'usage automobile. Consultez les sources primaires pour les informations propres au modele et au marche.", "Uma visao baseada em fontes sobre tecnologia, seguranca, mercados ou uso automotivo. Consulte as fontes primarias para informacoes especificas de modelo e mercado.", article.summary);
    articleElement.innerHTML = `
      <h4>${idx + 1}. ${title}</h4>
      <p class="article-summary">${summary}</p>
      <div class="article-body">
        <section>
          <h5>${localizedText("Engineering perspective", "Perspective d'ingenierie", "Perspectiva de engenharia", "المنظور الهندسي")}</h5>
          <p>${expertArticle.intro}</p>
          <p>${expertArticle.engineering}</p>
        </section>
        <section>
          <h5>${localizedText("Reading the evidence", "Lire les preuves", "Como ler as evidencias", "قراءة الدليل")}</h5>
          <p>${expertArticle.evidence}</p>
        </section>
        <section>
          <h5>${localizedText("Workshop and ownership checklist", "Liste de controle atelier et usage", "Lista de verificacao da oficina e do uso", "قائمة فحص الصيانة والاستخدام")}</h5>
          <p>${expertArticle.practical}</p>
        </section>
        <section>
          <h5>${localizedText("What to monitor next", "Points a suivre", "O que acompanhar", "ما الذي نتابعه لاحقًا")}</h5>
          <p>${expertArticle.future}</p>
        </section>
      </div>
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

function initArticleSearch() {
  articlesList = document.getElementById("articles-list") || document.querySelector(".articles-list");
  articleSearchInput = document.getElementById("article-search");
  if (!articlesList || articleSearchInput) return;
  const wrapper = document.createElement("div");
  wrapper.className = "tools-row";
  const input = document.createElement("input");
  input.id = "article-search";
  input.type = "search";
  input.placeholder = ui.searchArticles;
  input.setAttribute("aria-label", ui.searchArticles);
  wrapper.appendChild(input);
  articlesList.parentElement?.insertBefore(wrapper, articlesList);
  articleSearchInput = input;
  articleSearchInput.addEventListener("input", () => renderArticles(articleSearchInput.value));
}

function initModelsPage() {
  const catalog = document.querySelector(".model-catalog");
  if (!catalog) return;
  const requestedBrand = new URLSearchParams(window.location.search).get("brand");
  if (!requestedBrand) return;

  const brandNames = {
    toyota: ["Toyota", "تويوتا"],
    bmw: ["BMW", "بي إم دبليو"],
    byd: ["BYD", "بي واي دي"],
    tesla: ["Tesla", "تسلا"]
  };
  const names = brandNames[requestedBrand.toLowerCase()];
  if (!names) return;
  catalog.querySelectorAll(".vehicle-card").forEach((card) => {
    const title = card.querySelector("h2")?.textContent || "";
    card.hidden = !names.some((name) => title.toLowerCase().includes(name.toLowerCase()));
  });
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

async function getAiReply(message) {
  if (AI_CHAT_ENDPOINT) {
    const response = await fetch(AI_CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, locale, site: "AutoAtlas" })
    });
    if (!response.ok) throw new Error(`AI request failed: ${response.status}`);
    const data = await response.json();
    if (!data.reply) throw new Error("AI response did not contain a reply");
    return data.reply;
  }
  return getBotReply(message);
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
    image: profile.image,
    categories: getModelCategories(model),
    yearRange: profile.yearRange || "—",
    parts: profile.parts || [],
    pros: profile.pros || [],
    cons: profile.cons || [],
    sources: profile.sources || []
  };
}

const personalizationCopy = {
  ar: {
    title: "مساعد اختيار السيارة",
    intro: "أجب عن تفضيلاتك ليقترح AutoAtlas سيارات مناسبة من البيانات المتاحة، دون استبدال فحص الوكيل والمصدر الرسمي.",
    usage: "الاستخدام الأساسي", city: "مدينة", family: "عائلة", travel: "سفر", work: "عمل واستخدام متنوع",
    fuel: "نوع الطاقة", any: "أي نوع", electric: "كهربائية", hybrid: "هجينة", petrol: "بنزين أو ديزل",
    people: "عدد الركاب", budget: "أولوية الشراء", value: "قيمة وتشغيل", comfort: "راحة وتجهيز", efficiency: "كفاءة وطاقة",
    submit: "عرض توصياتي", result: "توصيات مناسبة لك", note: "التوصية إرشادية؛ تحقق من الفئة والسوق وسنة الصنع.",
    view: "عرض الملف", score: "مدى الملاءمة"
  },
  en: {
    title: "Smart vehicle guide", intro: "Set your preferences and AutoAtlas will rank suitable vehicles from its available data. Always verify the exact trim and market.",
    usage: "Main use", city: "City", family: "Family", travel: "Travel", work: "Mixed/work",
    fuel: "Powertrain", any: "Any type", electric: "Electric", hybrid: "Hybrid", petrol: "Petrol or diesel",
    people: "Passengers", budget: "Buying priority", value: "Value and running cost", comfort: "Comfort and equipment", efficiency: "Efficiency and energy",
    submit: "Show recommendations", result: "Recommended for you", note: "Guidance only; verify trim, market, and model year.",
    view: "View profile", score: "Fit score"
  },
  pt: {
    title: "Guia inteligente de veículos", intro: "Defina suas preferências e o AutoAtlas classificará veículos adequados com os dados disponíveis. Confirme sempre a versão e o mercado.",
    usage: "Uso principal", city: "Cidade", family: "Família", travel: "Viagem", work: "Uso misto/trabalho",
    fuel: "Motorização", any: "Qualquer tipo", electric: "Elétrico", hybrid: "Híbrido", petrol: "Gasolina ou diesel",
    people: "Passageiros", budget: "Prioridade", value: "Valor e custo", comfort: "Conforto e equipamentos", efficiency: "Eficiência e energia",
    submit: "Ver recomendações", result: "Recomendados para você", note: "Orientação; confirme versão, mercado e ano.",
    view: "Ver perfil", score: "Compatibilidade"
  },
  fr: {
    title: "Guide intelligent automobile", intro: "Définissez vos préférences et AutoAtlas classera les véhicules adaptés selon ses données. Vérifiez toujours la finition et le marché.",
    usage: "Usage principal", city: "Ville", family: "Famille", travel: "Voyage", work: "Mixte/travail",
    fuel: "Motorisation", any: "Tous types", electric: "Électrique", hybrid: "Hybride", petrol: "Essence ou diesel",
    people: "Passagers", budget: "Priorité", value: "Valeur et coût", comfort: "Confort et équipement", efficiency: "Efficacité et énergie",
    submit: "Afficher mes recommandations", result: "Recommandés pour vous", note: "Conseil indicatif; vérifiez finition, marché et année.",
    view: "Voir le profil", score: "Compatibilité"
  }
};

function getPersonalizationStorage(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || fallback;
  } catch (error) {
    return fallback;
  }
}

function savePersonalizationStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("AutoAtlas personalization could not be saved.", error);
  }
}

function getRecommendationScore(company, model, preferences) {
  const categories = getModelCategories(model);
  let score = 45;
  if (preferences.fuel === "electric") score += categories.includes("electric") ? 35 : -18;
  if (preferences.fuel === "hybrid") score += categories.includes("hybrid") ? 25 : -8;
  if (preferences.fuel === "petrol") score += categories.some((item) => ["petrol", "diesel"].includes(item)) ? 16 : -5;
  if (preferences.usage === "city") score += ["petrol", "hybrid", "electric"].some((item) => categories.includes(item)) ? 8 : 0;
  if (preferences.usage === "family") score += categories.includes("suv") ? 18 : 5;
  if (preferences.usage === "travel") score += categories.includes("suv") || categories.includes("luxury") ? 14 : 4;
  if (preferences.priority === "efficiency") score += categories.includes("electric") || categories.includes("hybrid") ? 12 : 0;
  if (preferences.priority === "comfort") score += categories.includes("luxury") ? 15 : 4;
  if (preferences.priority === "value") score += ["petrol", "hybrid"].some((item) => categories.includes(item)) ? 10 : 2;
  if (Number(preferences.people) >= 5 && categories.includes("suv")) score += 10;
  return Math.max(25, Math.min(98, score));
}

function renderRecommendations(container, preferences) {
  const copy = personalizationCopy[locale] || personalizationCopy.ar;
  const ranked = Object.entries(companiesData).flatMap(([company, models]) =>
    models.map((model) => ({ company, model, score: getRecommendationScore(company, model, preferences) }))
  ).sort((a, b) => b.score - a.score).slice(0, 4);
  container.querySelector(".recommendation-results").innerHTML = `
    <div class="recommendation-heading"><h3>${copy.result}</h3><p>${copy.note}</p></div>
    <div class="recommendation-grid">${ranked.map((item) => {
      const profile = carProfiles[item.company][item.model];
      const detailPage = locale === "en" ? "car-detail-en.html" : locale === "pt" ? "car-detail-pt.html" : locale === "fr" ? "car-detail-fr.html" : "car-detail.html";
      return `<article class="recommendation-card"><img src="${profile.image}" alt="${displayCompany(item.company)} ${item.model}" loading="lazy" decoding="async"><div><span class="model-tag">${copy.score}: ${item.score}%</span><h4>${displayCompany(item.company)} - ${item.model}</h4><a class="text-link" href="${detailPage}">${copy.view}</a></div></article>`;
    }).join("")}</div>`;
}

function initPersonalization() {
  const home = ["index.html", "en.html", "pt.html", "fr.html"].includes(window.location.pathname.split("/").pop() || "index.html");
  if (!home || document.querySelector(".personalization-card")) return;
  const copy = personalizationCopy[locale] || personalizationCopy.ar;
  const saved = getPersonalizationStorage("autoatlas-preferences", { usage: "city", fuel: "any", people: "4", priority: "value" });
  const section = document.createElement("section");
  section.className = "card personalization-card";
  section.innerHTML = `<div class="section-heading-row"><div><span class="section-kicker">AutoAtlas AI</span><h2>${copy.title}</h2><p>${copy.intro}</p></div></div><form class="preference-form"><label>${copy.usage}<select name="usage"><option value="city">${copy.city}</option><option value="family">${copy.family}</option><option value="travel">${copy.travel}</option><option value="work">${copy.work}</option></select></label><label>${copy.fuel}<select name="fuel"><option value="any">${copy.any}</option><option value="electric">${copy.electric}</option><option value="hybrid">${copy.hybrid}</option><option value="petrol">${copy.petrol}</option></select></label><label>${copy.people}<select name="people"><option value="2">2</option><option value="4">4</option><option value="5">5+</option></select></label><label>${copy.budget}<select name="priority"><option value="value">${copy.value}</option><option value="comfort">${copy.comfort}</option><option value="efficiency">${copy.efficiency}</option></select></label><button class="primary-btn" type="submit">${copy.submit}</button></form><div class="recommendation-results" aria-live="polite"></div>`;
  const portal = document.querySelector(".home-portal");
  (portal || document.querySelector("main"))?.insertAdjacentElement("afterend", section);
  const form = section.querySelector("form");
  Object.entries(saved).forEach(([key, value]) => { if (form.elements[key]) form.elements[key].value = value; });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const preferences = Object.fromEntries(new FormData(form).entries());
    savePersonalizationStorage("autoatlas-preferences", preferences);
    renderRecommendations(section, preferences);
  });
  renderRecommendations(section, saved);
}

function initBehaviorAdaptation() {
  const key = "autoatlas-behavior";
  const behavior = getPersonalizationStorage(key, { visits: 0, interests: {} });
  behavior.visits += 1;
  document.querySelectorAll("a[href], button").forEach((control) => {
    control.addEventListener("click", () => {
      const label = (control.textContent || control.getAttribute("aria-label") || "").trim().slice(0, 60);
      if (!label) return;
      behavior.interests[label] = (behavior.interests[label] || 0) + 1;
      savePersonalizationStorage(key, behavior);
    }, { once: true });
  });
  const topInterest = Object.entries(behavior.interests).sort((a, b) => b[1] - a[1])[0];
  if (topInterest) document.body.dataset.topInterest = topInterest[0];
  savePersonalizationStorage(key, behavior);
}

function initMotionStorytelling() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(
    ".page-hero, .content-card, .vehicle-card, .portal-card, .article-item, .feature-box, .detail-specs, .detail-pros, .notice, .compare-page-card, .personalization-card"
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("motion-reveal");
    element.style.setProperty("--motion-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealTargets.forEach((element) => observer.observe(element));
  }

  const detailMain = document.querySelector(".car-detail-page main");
  if (detailMain && !detailMain.querySelector(".motion-story")) {
    const storyCopy = {
      ar: { title: "رحلة السيارة في أربع لقطات", items: [["الفكرة", "تبدأ السيارة من تصميم يوازن بين الاستخدام والشكل."], ["المنظومة", "تتحدد التجربة بالطاقة والدفع والشحن أو الوقود."], ["التقنية", "تضيف الشاشات وأنظمة المساعدة قيمة بشرط مطابقة الفئة."], ["الاستخدام", "يتحول الاختيار إلى قرار عملي حسب الطريق والصيانة والسوق."]] },
      en: { title: "The vehicle story in four beats", items: [["The idea", "Design balances the intended use with the vehicle's form."], ["The system", "Powertrain, drive, and charging or fuel shape the experience."], ["The technology", "Screens and assistance add value when matched to the exact trim."], ["The use", "The final choice depends on roads, service, and the local market."]] },
      pt: { title: "A história do veículo em quatro etapas", items: [["A ideia", "O design equilibra o uso previsto e a forma do veículo."], ["O sistema", "Motorização, tração e recarga ou combustível moldam a experiência."], ["A tecnologia", "Ecrãs e assistência agregam valor quando correspondem à versão."], ["O uso", "A escolha depende das estradas, serviço e mercado local."]] },
      fr: { title: "L'histoire du véhicule en quatre temps", items: [["L'idée", "Le design équilibre l'usage prévu et la forme du véhicule."], ["Le système", "Motorisation, transmission et recharge ou carburant façonnent l'expérience."], ["La technologie", "Écrans et aides ajoutent de la valeur selon la finition exacte."], ["L'usage", "Le choix dépend des routes, du service et du marché local."]] }
    }[locale] || null;
    if (storyCopy) {
      const story = document.createElement("section");
      story.className = "motion-story card";
      story.innerHTML = `<div class="section-heading-row"><div><span class="section-kicker">Motion Storytelling</span><h2>${storyCopy.title}</h2></div></div><div class="story-track">${storyCopy.items.map(([title, text], index) => `<article class="story-step motion-reveal" style="--motion-delay: ${index * 110}ms"><span class="story-index">0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
      detailMain.insertBefore(story, detailMain.children[1] || null);
      if (reducedMotion) story.querySelectorAll(".motion-reveal").forEach((element) => element.classList.add("is-visible"));
      else if ("IntersectionObserver" in window) {
        const storyObserver = new IntersectionObserver((entries, instance) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          });
        }, { threshold: 0.18 });
        story.querySelectorAll(".motion-reveal").forEach((element) => storyObserver.observe(element));
      }
    }
  }
}

function initPageTransitions() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || link.target === "_blank") return;
    link.addEventListener("click", () => {
      document.body.classList.add("is-leaving");
    });
  });
}

function initAccessibilityControls() {
  const languageCopy = {
    ar: { label: "إمكانية الوصول", increase: "تكبير النص", decrease: "تصغير النص", contrast: "تباين عالٍ" },
    en: { label: "Accessibility", increase: "Increase text size", decrease: "Decrease text size", contrast: "High contrast" },
    pt: { label: "Acessibilidade", increase: "Aumentar texto", decrease: "Diminuir texto", contrast: "Alto contraste" },
    fr: { label: "Accessibilité", increase: "Agrandir le texte", decrease: "Réduire le texte", contrast: "Contraste élevé" }
  }[locale] || null;
  if (!languageCopy || document.querySelector(".accessibility-tools")) return;
  const tools = document.createElement("div");
  tools.className = "accessibility-tools";
  tools.setAttribute("role", "group");
  tools.setAttribute("aria-label", languageCopy.label);
  tools.innerHTML = `<button type="button" data-a11y="increase" aria-label="${languageCopy.increase}">A+</button><button type="button" data-a11y="decrease" aria-label="${languageCopy.decrease}">A-</button><button type="button" data-a11y="contrast" aria-pressed="false" aria-label="${languageCopy.contrast}">◐</button>`;
  const target = document.querySelector(".nav-container, .header-top");
  if (!target) return;
  target.appendChild(tools);
  const savedScale = Number(window.localStorage.getItem("autoatlas-text-scale")) || 1;
  const savedContrast = window.localStorage.getItem("autoatlas-high-contrast") === "true";
  document.documentElement.style.setProperty("--text-scale", String(Math.max(0.9, Math.min(1.25, savedScale))));
  document.documentElement.classList.toggle("high-contrast", savedContrast);
  tools.querySelector('[data-a11y="contrast"]').setAttribute("aria-pressed", savedContrast ? "true" : "false");
  tools.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.a11y === "increase" || button.dataset.a11y === "decrease") {
      const direction = button.dataset.a11y === "increase" ? 0.05 : -0.05;
      const current = Number(getComputedStyle(document.documentElement).getPropertyValue("--text-scale")) || 1;
      const next = Math.max(0.9, Math.min(1.25, current + direction));
      document.documentElement.style.setProperty("--text-scale", String(next));
      window.localStorage.setItem("autoatlas-text-scale", String(next));
    }
    if (button.dataset.a11y === "contrast") {
      const enabled = !document.documentElement.classList.contains("high-contrast");
      document.documentElement.classList.toggle("high-contrast", enabled);
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
      window.localStorage.setItem("autoatlas-high-contrast", String(enabled));
    }
  });
}

function initImageAccessibility() {
  document.querySelectorAll("img").forEach((image) => {
    if (image.hasAttribute("alt")) return;
    const context = image.closest("article, section, .card")?.querySelector("h1, h2, h3, h4")?.textContent?.trim();
    image.alt = context || "";
  });
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
    <div class="smart-compare-visual">
      <div class="compare-vehicle-visual"><img src="${car1.image}" alt="${displayCompany(car1.company)} ${car1.model}" loading="lazy" decoding="async"><strong>${displayCompany(car1.company)} - ${car1.model}</strong></div>
      <div class="compare-vs" aria-hidden="true">VS</div>
      <div class="compare-vehicle-visual"><img src="${car2.image}" alt="${displayCompany(car2.company)} ${car2.model}" loading="lazy" decoding="async"><strong>${displayCompany(car2.company)} - ${car2.model}</strong></div>
    </div>
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
    <p class="smart-compare-note">${localizedText("Smart reading: the stronger choice depends on your market, charging access, exact trim, and priorities. The table is a structured reference, not a universal winner.", "Lecture intelligente : le meilleur choix dépend du marché, de la recharge, de la finition et de vos priorités. Le tableau est une référence structurée, pas un gagnant universel.", "Leitura inteligente: a melhor escolha depende do mercado, recarga, versão e prioridades. A tabela é uma referência estruturada, não um vencedor universal.", "القراءة الذكية: الاختيار الأفضل يعتمد على السوق وتوفر الشحن والفئة وأولوياتك. الجدول مرجع منظم وليس فائزًا مطلقًا.")}</p>
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
  compareCompany1 = document.getElementById("compare-company-1");
  compareModel1 = document.getElementById("compare-model-1");
  compareCompany2 = document.getElementById("compare-company-2");
  compareModel2 = document.getElementById("compare-model-2");
  compareBtn = document.getElementById("compare-btn");
  compareResetBtn = document.getElementById("compare-reset-btn");
  compareResult = document.getElementById("compare-result");

  if (!compareCompany1 || !compareCompany2 || !compareModel1 || !compareModel2 || !compareBtn || !compareResetBtn || !compareResult) {
    return;
  }

  renderCompareCompanies();

  if (compareCompany1.dataset.enhanced === "true") return;
  compareCompany1.dataset.enhanced = "true";
  compareCompany1.addEventListener("change", () => {
    updateCompareModels(compareCompany1, compareModel1);
  });

  compareCompany2.addEventListener("change", () => {
    updateCompareModels(compareCompany2, compareModel2);
  });

  compareBtn.addEventListener("click", renderCompareResult);
  compareResetBtn.addEventListener("click", resetCompare);
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  addChatMessage(message, "user");
  chatInput.value = "";
  sendBtn.disabled = true;
  sendBtn.setAttribute("aria-busy", "true");
  const waiting = localizedText("Thinking...", "Reflexion...", "Pensando...", "جارٍ التفكير...");
  const error = localizedText("The assistant is temporarily unavailable. Please use the email or WhatsApp links below.", "L'assistant est temporairement indisponible. Utilisez les liens e-mail ou WhatsApp ci-dessous.", "O assistente esta temporariamente indisponivel. Use os links de e-mail ou WhatsApp abaixo.", "المساعد غير متاح مؤقتًا. استخدم رابط البريد أو واتساب أدناه.");
  const pending = document.createElement("div");
  pending.className = "msg bot pending";
  pending.textContent = waiting;
  chatMessages.appendChild(pending);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  try {
    pending.textContent = await getAiReply(message);
  } catch (requestError) {
    pending.textContent = `${error} ${requestError.message ? "" : ""}`;
  } finally {
    pending.classList.remove("pending");
    sendBtn.disabled = false;
    sendBtn.removeAttribute("aria-busy");
  }
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
initSiteNavigation();
initPersonalization();
initCompareFeature();
initSmartVehicleSearch();
initArticleSearch();
initModelsPage();
initBehaviorAdaptation();
initMotionStorytelling();
initPageTransitions();
initAccessibilityControls();
initImageAccessibility();
window.setTimeout(initArticleSearch, 0);
initHomePortal();
initLocalizedFooter();
initLazyBackgrounds();
initThemeControl();
initCookieConsent();

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
