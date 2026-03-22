import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "dashboard": "Dashboard",
        "education": "Education",
        "valuation": "Valuation",
        "market": "Market",
        "portfolio": "Portfolio",
        "insights": "Insights",
        "newAnalysis": "New Analysis",
        "settings": "Settings",
        "support": "Support"
      },
      "login": {
        "title": "Secure Access",
        "subtitle": "Enter your credentials to manage your ecosystem's assets.",
        "username": "Username or Email",
        "password": "Password",
        "forgot": "Forgot Password?",
        "remember": "Remember this device",
        "submit": "Sign In to Dashboard",
        "newToFlow": "New to CapyFinance?",
        "requestAccess": "Request Access"
      }
    }
  },
  pt: {
    translation: {
      "nav": {
        "dashboard": "Painel",
        "education": "Educação",
        "valuation": "Avaliação",
        "market": "Mercado",
        "portfolio": "Portfólio",
        "insights": "Insights",
        "newAnalysis": "Nova Análise",
        "settings": "Configurações",
        "support": "Suporte"
      },
      "login": {
        "title": "Acesso Seguro",
        "subtitle": "Insira suas credenciais para gerenciar seus ativos.",
        "username": "Usuário ou E-mail",
        "password": "Senha",
        "forgot": "Esqueceu a senha?",
        "remember": "Lembrar deste dispositivo",
        "submit": "Entrar no Painel",
        "newToFlow": "Novo no CapyFinance?",
        "requestAccess": "Solicitar Acesso"
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "dashboard": "Panel",
        "education": "Educación",
        "valuation": "Valoración",
        "market": "Mercado",
        "portfolio": "Portafolio",
        "insights": "Perspectivas",
        "newAnalysis": "Nuevo Análisis",
        "settings": "Ajustes",
        "support": "Soporte"
      },
      "login": {
        "title": "Acceso Seguro",
        "subtitle": "Ingrese sus credenciales para gestionar sus activos.",
        "username": "Usuario o Correo",
        "password": "Contraseña",
        "forgot": "¿Olvidó su contraseña?",
        "remember": "Recordar este dispositivo",
        "submit": "Iniciar Sesión",
        "newToFlow": "¿Nuevo en CapyFinance?",
        "requestAccess": "Solicitar Acceso"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "dashboard": "Tableau de bord",
        "education": "Éducation",
        "valuation": "Évaluation",
        "market": "Marché",
        "portfolio": "Portefeuille",
        "insights": "Aperçus",
        "newAnalysis": "Nouvelle analyse",
        "settings": "Paramètres",
        "support": "Support"
      },
      "login": {
        "title": "Accès Sécurisé",
        "subtitle": "Entrez vos identifiants pour gérer vos actifs.",
        "username": "Nom d'utilisateur ou Email",
        "password": "Mot de passe",
        "forgot": "Mot de passe oublié ?",
        "remember": "Se souvenir de cet appareil",
        "submit": "Se connecter",
        "newToFlow": "Nouveau sur CapyFinance ?",
        "requestAccess": "Demander l'accès"
      }
    }
  },
  it: {
    translation: {
      "nav": {
        "dashboard": "Dashboard",
        "education": "Formazione",
        "valuation": "Valutazione",
        "market": "Mercato",
        "portfolio": "Portafoglio",
        "insights": "Approfondimenti",
        "newAnalysis": "Nuova Analisi",
        "settings": "Impostazioni",
        "support": "Supporto"
      },
      "login": {
        "title": "Accesso Sicuro",
        "subtitle": "Inserisci le tue credenziali per gestire i tuoi asset.",
        "username": "Nome utente o Email",
        "password": "Password",
        "forgot": "Password dimenticata?",
        "remember": "Ricorda questo dispositivo",
        "submit": "Accedi alla Dashboard",
        "newToFlow": "Nuovo su CapyFinance?",
        "requestAccess": "Richiedi Accesso"
      }
    }
  },
  zh: {
    translation: {
      "nav": {
        "dashboard": "仪表板",
        "education": "教育",
        "valuation": "估值",
        "market": "市场",
        "portfolio": "投资组合",
        "insights": "洞察",
        "newAnalysis": "新分析",
        "settings": "设置",
        "support": "支持"
      },
      "login": {
        "title": "安全访问",
        "subtitle": "输入您的凭据以管理您的资产。",
        "username": "用户名或电子邮件",
        "password": "密码",
        "forgot": "忘记密码？",
        "remember": "记住此设备",
        "submit": "登录仪表板",
        "newToFlow": "初次使用 CapyFinance？",
        "requestAccess": "申请访问"
      }
    }
  },
  ja: {
    translation: {
      "nav": {
        "dashboard": "ダッシュボード",
        "education": "教育",
        "valuation": "評価",
        "market": "市場",
        "portfolio": "ポートフォリオ",
        "insights": "インサイト",
        "newAnalysis": "新しい分析",
        "settings": "設定",
        "support": "サポート"
      },
      "login": {
        "title": "安全なアクセス",
        "subtitle": "資産を管理するために資格情報を入力してください。",
        "username": "ユーザー名またはメール",
        "password": "パスワード",
        "forgot": "パスワードを忘れましたか？",
        "remember": "このデバイスを記憶する",
        "submit": "ダッシュボードにサインイン",
        "newToFlow": "CapyFinanceは初めてですか？",
        "requestAccess": "アクセスをリクエスト"
      }
    }
  },
  ko: {
    translation: {
      "nav": {
        "dashboard": "대시보드",
        "education": "교육",
        "valuation": "가치 평가",
        "market": "시장",
        "portfolio": "포트폴리오",
        "insights": "통찰 탐구",
        "newAnalysis": "새 분석",
        "settings": "설정",
        "support": "지원"
      },
      "login": {
        "title": "보안 액세스",
        "subtitle": "자산을 관리하려면 자격 증명을 입력하십시오.",
        "username": "사용자 이름 또는 이메일",
        "password": "비밀번호",
        "forgot": "비밀번호를 잊으셨나요?",
        "remember": "이 장치 기억하기",
        "submit": "대시보드 로그인",
        "newToFlow": "CapyFinance가 처음이신가요?",
        "requestAccess": "액세스 요청"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "dashboard": "لوحة القيادة",
        "education": "التعليم",
        "valuation": "التقييم",
        "market": "السوق",
        "portfolio": "المحفظة",
        "insights": "رؤى",
        "newAnalysis": "تحليل جديد",
        "settings": "الإعدادات",
        "support": "الدعم"
      },
      "login": {
        "title": "دخول آمن",
        "subtitle": "أدخل بيانات الاعتماد الخاصة بك لإدارة أصولك.",
        "username": "اسم المستخدم أو البريد الإلكتروني",
        "password": "كلمة المرور",
        "forgot": "هل نسيت كلمة المرور؟",
        "remember": "تذكر هذا الجهاز",
        "submit": "تسجيل الدخول",
        "newToFlow": "جديد في CapyFinance؟",
        "requestAccess": "طلب وصول"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
