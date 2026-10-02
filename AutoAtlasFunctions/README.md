# دوال AutoAtlas

مشروع Azure Functions مستقل باستخدام .NET 8 isolated وAzure SQL Database.

## الدوال

- `POST /api/AddCar` (`AddCarFunction`): يتحقق من أن نص الطلب JSON صالح، ثم يضيف سجل سيارة
  (`Id`, `Brand`, `Model`, `Year`, `Category`) باستخدام أوامر `Microsoft.Data.SqlClient` ذات
  المعاملات. يجب أن يرسل المستدعي `Id` فريدًا (عمود `Id` مفتاح أساسي وليس `IDENTITY`).
  يُقرأ اتصال قاعدة البيانات من إعداد التطبيق `SqlConnectionString` مباشرةً، ويُعيد استجابة نصية
  بسيطة (وليست JSON) مع رمز الحالة المناسب.
- `CarChangeProcessor`: يراقب تغييرات الصفوف في `[dbo].[Cars]` ويسجل العملية ومُعرّف السيارة.

نقطة HTTP محمية بمفتاح Function. للتشغيل المحلي يلزم Azure Functions Core Tools وAzurite،
أو إعداد حساب تخزين حقيقي لدوال Azure.

## تشغيل بلا موارد Azure

لم تُنشأ موارد سحابية أو قاعدة بيانات في Azure. لتجنب رسوم السحابة، استخدم محليًا:

- .NET 8 SDK وAzure Functions Core Tools v4.
- Azurite لتوفير التخزين المحلي لدوال Azure؛ ثبّته محليًا عبر `npm install -g azurite` وشغّله
  قبل `func start`.
- SQL Server Developer أو Express محليًا، مع قاعدة بيانات مفعّل فيها Change Tracking.

أنشئ الجدول محليًا من `schema.sql` وفعّل Change Tracking كما في قسم إعداد قاعدة البيانات. لا
يشمل ذلك أي موارد Azure. يحتاج اتصال SQL Server المحلي إلى شهادة موثوقة لأن التحقق من الشهادة
مفعّل في التطبيق؛ لا تستخدم `TrustServerCertificate=True` على Azure SQL.

لا يتوفر Docker أو SQL Server محلي في بيئة التطوير الحالية، لذلك تم التحقق من البناء فقط؛
التشغيل المتكامل ينتظر إعداد قاعدة محلية.

## الإعداد المحلي

انسخ `local.settings.example.json` إلى `local.settings.json` واستبدل بيانات قاعدة البيانات
الوهمية ببيانات صحيحة، ثم استخدم اعتماد Microsoft Entra المتاح لحساب المطور. ملف
`local.settings.json` مستثنى من Git عمدًا.

في Azure، اضبط `SqlConnectionString` لاستخدام الهوية المُدارة لتطبيق Functions:

```text
Server=tcp:<server>.database.windows.net,1433;Database=<database>;Authentication=Active Directory Managed Identity;Encrypt=Mandatory;Connect Timeout=30;ConnectRetryCount=0
```

للهوية المُدارة المعيّنة من المستخدم، أضف
`User Id=<managed-identity-client-id>`. لا تضع كلمات المرور أو سلاسل اتصال تحتوي بيانات اعتماد
في المستودع. يجب إنشاء مستخدم لاسم هوية التطبيق في قاعدة البيانات ومنحه الصلاحيات أدناه.

## إعداد قاعدة البيانات

نفذ `schema.sql` في قاعدة البيانات المستهدفة. بعد ذلك فعّل تتبع التغييرات على مستوى قاعدة
البيانات والجدول كلٌّ على حدة؛ لن يبدأ SQL trigger الاستقصاء ما لم يُفعّل الاثنان:

```sql
ALTER DATABASE CURRENT
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 DAYS, AUTO_CLEANUP = ON);

ALTER TABLE [dbo].[Cars]
ENABLE CHANGE_TRACKING;
```

امنح هوية تطبيق Functions صلاحيات الجدول وحالة الـtrigger (استبدل اسم الهوية بين الأقواس).
نفذ هذه الأوامر بصلاحيات مسؤول قاعدة البيانات:

```sql
CREATE USER [<function-app-identity>] FROM EXTERNAL PROVIDER;
GRANT SELECT, INSERT ON OBJECT::[dbo].[Cars] TO [<function-app-identity>];
GRANT VIEW CHANGE TRACKING ON OBJECT::[dbo].[Cars] TO [<function-app-identity>];
GRANT CREATE TABLE TO [<function-app-identity>];
GRANT CREATE SCHEMA TO [<function-app-identity>];

IF SCHEMA_ID(N'az_func') IS NULL
    EXEC(N'CREATE SCHEMA [az_func]');

GRANT ALTER ON SCHEMA::[az_func] TO [<function-app-identity>];
GRANT SELECT, INSERT, UPDATE, DELETE
    ON SCHEMA::[az_func] TO [<function-app-identity>];
```

ينشئ الـtrigger جداول حالته ويديرها بنفسه ضمن المخطط `az_func`. لا تنشئ هذه الجداول يدويًا ولا
تعدّل أسماءها. فترة الاحتفاظ بتغييرات الجدول يومان؛ وقد تحتاج الحالة إلى إعادة التهيئة إذا
توقف التطبيق مدة أطول.

## التشغيل والاختبار

```powershell
Copy-Item local.settings.example.json local.settings.json
func start
```

أرسل طلبًا إلى عنوان الدالة المحلي:

```powershell
Invoke-RestMethod -Method Post `
  -Uri http://localhost:7071/api/AddCar `
  -ContentType 'application/json' `
  -Body '{"id":1,"brand":"Toyota","model":"Corolla","year":2025,"category":"Sedan"}'
```

`AddCarFunction` لا يعيد محاولة الاتصال تلقائيًا عند حدوث خطأ SQL عابر؛ فأي `SqlException` (بما
في ذلك أخطاء الاتصال المؤقتة) تُعاد للمستدعي كرمز حالة `400 Bad Request` مع رسالة الخطأ.
