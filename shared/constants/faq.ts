export interface IFaqItem {
  q: string;
  a: string;
  aHtml?: string;
}

export interface IFaqRecord {
  /** Stable id from CMS (sidebar / routing); falls back to category label for static data */
  categoryKey: string;
  category: string;
  items: IFaqItem[];
  length: number;
}

export const faqData: IFaqRecord[] = [
  {
    categoryKey: "general",
    category: "General",
    length: 4,
    items: [
      { q: "What is this service?", a: "This service provides AI-powered solutions for businesses." },
      { q: "How can I sign up?", a: "You can sign up via our website using your email." },
      { q: "Is there a free trial?", a: "Yes, we offer a 7-day free trial for new users." },
      { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time." }
    ]
  },
  {
    categoryKey: "billing",
    category: "Billing",
    length: 3,
    items: [
      { q: "What payment methods are accepted?", a: "We accept credit cards, PayPal, and bank transfers." },
      { q: "Can I get a refund?", a: "Refunds are available within the first 14 days of subscription." },
      { q: "Do you provide invoices?", a: "Yes, invoices are emailed to you after each payment." }
    ]
  },
  {
    categoryKey: "technical",
    category: "Technical",
    length: 5,
    items: [
      { q: "How do I reset my password?", a: "Click on 'Forgot Password' on the login page." },
      { q: "Is my data secure?", a: "We use industry-standard encryption to protect your data." },
      { q: "Does the app support mobile devices?", a: "Yes, the app works on both iOS and Android." },
      { q: "Can I integrate with third-party apps?", a: "Yes, we provide APIs and integrations for popular platforms." },
      { q: "Who do I contact for technical help?", a: "You can reach our support team via email or live chat." }
    ]
  },
  {
    categoryKey: "account",
    category: "Account",
    length: 4,
    items: [
      { q: "How do I change my email?", a: "Go to account settings and update your email." },
      { q: "Can I delete my account?", a: "Yes, you can delete your account from settings." },
      { q: "How do I upgrade my plan?", a: "You can upgrade from the subscription page in your account." },
      { q: "Can I have multiple users?", a: "Yes, multi-user accounts are available for teams." }
    ]
  }
];


export const faqDataAr: IFaqRecord[] = [
  {
    categoryKey: "general",
    category: "عام",
    length: 4,
    items: [
      { q: "ما هي هذه الخدمة؟", a: "تقدم هذه الخدمة حلول مدعومة بالذكاء الاصطناعي للشركات." },
      { q: "كيف يمكنني التسجيل؟", a: "يمكنك التسجيل عبر موقعنا باستخدام بريدك الإلكتروني." },
      { q: "هل يوجد تجربة مجانية؟", a: "نعم، نوفر تجربة مجانية لمدة 7 أيام للمستخدمين الجدد." },
      { q: "هل يمكنني الإلغاء في أي وقت؟", a: "نعم، يمكنك إلغاء اشتراكك في أي وقت." }
    ]
  },
  {
    categoryKey: "billing",
    category: "الفوترة",
    length: 3,
    items: [
      { q: "ما طرق الدفع المقبولة؟", a: "نقبل بطاقات الائتمان وPayPal والتحويلات البنكية." },
      { q: "هل يمكنني استرداد الأموال؟", a: "يمكن استرداد الأموال خلال أول 14 يومًا من الاشتراك." },
      { q: "هل توفرون فواتير؟", a: "نعم، يتم إرسال الفواتير عبر البريد الإلكتروني بعد كل دفعة." }
    ]
  },
  {
    categoryKey: "technical",
    category: "تقني",
    length: 5,
    items: [
      { q: "كيف أعيد تعيين كلمة المرور؟", a: "اضغط على 'نسيت كلمة المرور' في صفحة تسجيل الدخول." },
      { q: "هل بياناتي آمنة؟", a: "نستخدم تشفيرًا بمعايير الصناعة لحماية بياناتك." },
      { q: "هل التطبيق يدعم الهواتف؟", a: "نعم، التطبيق يعمل على نظامي iOS وAndroid." },
      { q: "هل يمكنني التكامل مع تطبيقات أخرى؟", a: "نعم، نوفر APIs وتكاملات للمنصات الشهيرة." },
      { q: "من أتواصل معه للحصول على دعم تقني؟", a: "يمكنك التواصل مع فريق الدعم عبر البريد الإلكتروني أو المحادثة المباشرة." }
    ]
  },
  {
    categoryKey: "account",
    category: "الحساب",
    length: 4,
    items: [
      { q: "كيف أغير بريدي الإلكتروني؟", a: "اذهب لإعدادات الحساب وقم بتحديث بريدك الإلكتروني." },
      { q: "هل يمكنني حذف حسابي؟", a: "نعم، يمكنك حذف حسابك من الإعدادات." },
      { q: "كيف أطور خطتي؟", a: "يمكنك الترقية من صفحة الاشتراك في حسابك." },
      { q: "هل يمكنني إضافة مستخدمين متعددين؟", a: "نعم، الحسابات متعددة المستخدمين متاحة للفرق." }
    ]
  }
];