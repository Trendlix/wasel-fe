import { LucideIcon, ShieldCheck, User, Lock, CreditCard, Globe, AlertTriangle } from "lucide-react";

export interface ITermItem {
    id: number;
    /** Anchor id for sidebar / in-page navigation (prefer CMS categoryKey). */
    slug?: string;
    title: string;
    higlights: { title: string; descript: string }[];
    icon: LucideIcon;
}

export const termsItems: ITermItem[] = [
    {
        id: 1,
        title: "Account Responsibility",
        higlights: [
            {
                title: "Account Security",
                descript: "You are responsible for keeping your account credentials safe and secure."
            },
            {
                title: "Unauthorized Access",
                descript: "Report any suspicious activity or unauthorized access immediately."
            },
            {
                title: "Accurate Information",
                descript: "Ensure all account information provided is accurate and up to date."
            }
        ],
        icon: User
    },
    {
        id: 2,
        title: "Data Privacy",
        higlights: [
            {
                title: "Data Protection",
                descript: "We apply strong measures to protect your personal and business data."
            },
            {
                title: "Usage of Data",
                descript: "Your data is used only to improve and operate the platform services."
            },
            {
                title: "Third Parties",
                descript: "We do not share your data with third parties without your consent."
            }
        ],
        icon: Lock
    },
    {
        id: 3,
        title: "Payments & Billing",
        higlights: [
            {
                title: "Payment Terms",
                descript: "All payments must be completed according to the agreed billing cycle."
            },
            {
                title: "Subscription Renewal",
                descript: "Subscriptions renew automatically unless canceled before the due date."
            },
            {
                title: "Refund Policy",
                descript: "Refunds are subject to platform policy and usage conditions."
            }
        ],
        icon: CreditCard
    },
    {
        id: 4,
        title: "Platform Usage",
        higlights: [
            {
                title: "Proper Use",
                descript: "Users must use the platform in a lawful and ethical manner."
            },
            {
                title: "Abuse Prevention",
                descript: "Any misuse or abuse of services may result in account suspension."
            },
            {
                title: "Community Standards",
                descript: "Respect other users and follow platform guidelines at all times."
            }
        ],
        icon: Globe
    },
    {
        id: 5,
        title: "Security & Monitoring",
        higlights: [
            {
                title: "Security Systems",
                descript: "We implement continuous monitoring to ensure platform safety."
            },
            {
                title: "Risk Detection",
                descript: "Suspicious activities are automatically flagged and reviewed."
            },
            {
                title: "Account Actions",
                descript: "We may suspend accounts temporarily for security reasons."
            }
        ],
        icon: ShieldCheck
    },
    {
        id: 6,
        title: "Limitations & Liability",
        higlights: [
            {
                title: "No Guarantees",
                descript: "The platform is provided as-is without warranties of any kind."
            },
            {
                title: "Liability Limits",
                descript: "We are not responsible for indirect or consequential damages."
            },
            {
                title: "User Responsibility",
                descript: "You use the platform at your own risk and discretion."
            }
        ],
        icon: AlertTriangle
    }
]



export const termsItemsAr: ITermItem[] = [
    {
        id: 1,
        title: "مسؤولية الحساب",
        higlights: [
            {
                title: "أمان الحساب",
                descript: "أنت مسؤول عن الحفاظ على أمان بيانات حسابك وكلمات المرور الخاصة بك."
            },
            {
                title: "الوصول غير المصرح به",
                descript: "أبلغ عن أي نشاط مريب أو وصول غير مصرح به على الفور."
            },
            {
                title: "معلومات دقيقة",
                descript: "تأكد من أن جميع معلومات الحساب المقدمة دقيقة ومحدثة."
            }
        ],
        icon: User
    },
    {
        id: 2,
        title: "خصوصية البيانات",
        higlights: [
            {
                title: "حماية البيانات",
                descript: "نطبق تدابير قوية لحماية بياناتك الشخصية وبيانات عملك."
            },
            {
                title: "استخدام البيانات",
                descript: "يتم استخدام بياناتك فقط لتحسين وتشغيل خدمات المنصة."
            },
            {
                title: "الأطراف الثالثة",
                descript: "لا نشارك بياناتك مع أطراف ثالثة بدون موافقتك."
            }
        ],
        icon: Lock
    },
    {
        id: 3,
        title: "المدفوعات والفوترة",
        higlights: [
            {
                title: "شروط الدفع",
                descript: "يجب إتمام جميع المدفوعات وفقًا لدورة الفوترة المتفق عليها."
            },
            {
                title: "تجديد الاشتراك",
                descript: "يتم تجديد الاشتراكات تلقائيًا ما لم يتم الإلغاء قبل تاريخ الاستحقاق."
            },
            {
                title: "سياسة الاسترداد",
                descript: "تخضع الاستردادات لسياسات المنصة وشروط الاستخدام."
            }
        ],
        icon: CreditCard
    },
    {
        id: 4,
        title: "استخدام المنصة",
        higlights: [
            {
                title: "الاستخدام السليم",
                descript: "يجب على المستخدمين استخدام المنصة بطريقة قانونية وأخلاقية."
            },
            {
                title: "منع سوء الاستخدام",
                descript: "أي سوء استخدام أو استغلال للخدمات قد يؤدي إلى تعليق الحساب."
            },
            {
                title: "معايير المجتمع",
                descript: "احترم المستخدمين الآخرين واتبع إرشادات المنصة دائمًا."
            }
        ],
        icon: Globe
    },
    {
        id: 5,
        title: "الأمان والمراقبة",
        higlights: [
            {
                title: "أنظمة الأمان",
                descript: "نطبق مراقبة مستمرة لضمان سلامة المنصة."
            },
            {
                title: "كشف المخاطر",
                descript: "يتم تلقائيًا الإبلاغ عن الأنشطة المشبوهة ومراجعتها."
            },
            {
                title: "إجراءات الحساب",
                descript: "قد نقوم بتعليق الحسابات مؤقتًا لأسباب أمنية."
            }
        ],
        icon: ShieldCheck
    },
    {
        id: 6,
        title: "القيود والمسؤولية",
        higlights: [
            {
                title: "بدون ضمانات",
                descript: "تُقدَّم المنصة كما هي دون أي ضمانات من أي نوع."
            },
            {
                title: "حدود المسؤولية",
                descript: "لسنا مسؤولين عن الأضرار غير المباشرة أو التبعية."
            },
            {
                title: "مسؤولية المستخدم",
                descript: "أنت تستخدم المنصة على مسؤوليتك الخاصة."
            }
        ],
        icon: AlertTriangle
    }
]