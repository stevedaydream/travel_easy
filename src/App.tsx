import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Clock, Edit2, Plus, Trash2, Send, Printer, Settings, 
  Calendar, Users, Map as MapIcon, MessageSquare, CheckCircle2, 
  Sparkles, DollarSign, RefreshCw, X, ChevronRight, HelpCircle, 
  Compass, Info, Heart, Gift, BookOpen
} from 'lucide-react';


// --- 預設三大旅行範本 (Preset Itineraries) ---
const PRESETS = {
  tokyo: [
    {
      dayNum: 1,
      title: "原宿旗艦探索與銀座都會美學",
      companion: "單人獨旅",
      path: "日暮里 ➔ 原宿 ➔ 銀座 ➔ 返回日暮里",
      spots: [
        {
          time: "08:30",
          name: "明治神宮",
          desc: "清晨漫步於幽靜的都市森林中，享受東京難得的寧靜神聖時刻。",
          tip: "可購買交通安全御守保平安。",
          tagType: "sightseeing",
          tagName: "🌸 觀光祈福",
          cost: 500,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=明治神宮+東京",
          memo: "記得帶新買的御朱印帳！"
        },
        {
          time: "10:00",
          name: "3COINS 原宿本店",
          desc: "全日本規模最大、商品品項最齊全的3COINS旗艦店。",
          tip: "表參道店限定的獨特美妝和生活小物是這裡的挖寶首選。",
          tagType: "shopping",
          tagName: "🛍️ 旗艦購物",
          cost: 3500,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=3COINS+原宿本店+東京",
          memo: "幫媽媽買兩個透明收納盒"
        },
        {
          time: "11:45",
          name: "炸豬排 邁泉 青青山店",
          desc: "隱身在青山住宅區的老字號炸豬排店，設有優雅的單人吧台位。",
          tip: "招牌黑豚炸豬排外層麵衣酥脆金黃。",
          tagType: "food",
          tagName: "🍽️ 酥脆炸物",
          cost: 2800,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=まい泉+青山本店+東京",
          memo: "非尖峰時間去排隊比較不用等"
        },
        {
          time: "15:00",
          name: "無印良品 銀座旗艦店 & Loft",
          desc: "世界級旗艦店與文具控天堂，非常適合消磨整個下午。",
          tip: "推薦試香 J-Scent 焙茶香味。",
          tagType: "shopping",
          tagName: "🌿 質感香氛",
          cost: 8000,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=無印良品+銀座+東京",
          memo: "尋找適合放辦公室的擴香"
        }
      ]
    },
    {
      dayNum: 2,
      title: "新宿百貨美學與職人烘焙",
      companion: "單人獨旅",
      path: "日暮里 ➔ 新宿御苑 ➔ 伊勢丹 ➔ 返回日暮里",
      spots: [
        {
          time: "09:00",
          name: "新宿御苑",
          desc: "在繁華的新宿市中心享受綠意盎然的日式幾何庭園。",
          tip: "清晨人潮最少，非常適合散步拍照。",
          tagType: "sightseeing",
          tagName: "🌸 城市綠洲",
          cost: 500,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=新宿御苑+東京",
          memo: "溫室溫暖好拍"
        },
        {
          time: "11:00",
          name: "伊勢丹 新宿店",
          desc: "東京最指標性的高級百貨。匯集了日本最頂尖的保養品與限定甜點。",
          tip: "推薦尋找純淨極簡品牌 SHIRO。",
          tagType: "shopping",
          tagName: "🌿 頂級美妝",
          cost: 15000,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=伊勢丹+新宿店+東京",
          memo: "預算控管！最多只能買兩瓶香水！"
        }
      ]
    }
  ],
  kyoto: [
    {
      dayNum: 1,
      title: "清水舞台朝聖與東山石疊古道",
      companion: "雙人閨蜜遊",
      path: "京都車站 ➔ 清水寺 ➔ 三年坂 ➔ 祇園祇園",
      spots: [
        {
          time: "07:30",
          name: "音羽山 清水寺",
          desc: "世界文化遺產，宏偉的木造清水舞台，四季皆美。",
          tip: "越早出發人越少，能拍到無人的舞台全景！",
          tagType: "sightseeing",
          tagName: "⛩️ 歷史朝聖",
          cost: 400,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=清水寺+京都",
          memo: "順便喝音羽瀑布的三股清泉，祈求健康、學業、戀愛！"
        },
        {
          time: "10:30",
          name: "產寧坂與二年坂",
          desc: "充滿江戶風情的傳統木造建築群，沿路有非常多和風小物店。",
          tip: "小心石階不要跌倒，傳說跌倒會倒楣三年呢！",
          tagType: "shopping",
          tagName: "🛍️ 古街挖寶",
          cost: 1200,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=二年坂+京都",
          memo: "去星巴克清水二寧坂茶屋店（榻榻米限定座位）喝杯抹茶拿鐵！"
        },
        {
          time: "12:30",
          name: "鍵善良房 四条本店",
          desc: "享譽京都百年的葛切甜點名店，用冰涼冰鎮黑糖蜜享用。",
          tip: "必點「黑糖葛切」，口感Ｑ彈沁涼。",
          tagType: "food",
          tagName: "🍵 百年甜點",
          cost: 1500,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=鍵善良房+京都",
          memo: "週一公休！要避開。"
        }
      ]
    }
  ],
  osaka: [
    {
      dayNum: 1,
      title: "道頓堀運河與黑門市場舌尖狂熱",
      companion: "好友狂歡",
      path: "心齋橋 ➔ 黑門市場 ➔ 道頓堀 ➔ 通天閣",
      spots: [
        {
          time: "10:00",
          name: "黑門市場",
          desc: "大阪著名的「廚房」，可以大啖生鮮和牛肉串燒。",
          tip: "推薦挑選有座位的海鮮店家，吃得更舒適寫意。",
          tagType: "food",
          tagName: "🦀 海鮮盛宴",
          cost: 4500,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=黑門市場+大阪",
          memo: "預算開足！生海膽跟烤明蝦必點。"
        },
        {
          time: "14:00",
          name: "心齋橋筋商店街",
          desc: "超長的大阪流行指標商店街，藥妝、服飾店林立，好逛到腳酸。",
          tip: "藥妝店可以多比價，部分店家有專屬大額折扣券。",
          tagType: "shopping",
          tagName: "🛍️ 藥妝狂掃",
          cost: 12000,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=心齋橋筋+大阪",
          memo: "幫朋友帶常備感冒藥跟眼藥水！"
        },
        {
          time: "18:00",
          name: "道頓堀 固力果跑跑人",
          desc: "大阪代表性地標！運河旁的霓虹招牌非常壯觀璀璨。",
          tip: "在「戎橋」上以跑跑人經典姿勢合照是標準公式！",
          tagType: "sightseeing",
          tagName: "📸 地標打卡",
          cost: 0,
          mapUrl: "https://www.google.com/maps/search/?api=1&query=固力果+大阪",
          memo: "拍完照去旁邊吃章魚燒「本家日本一」。"
        }
      ]
    }
  ]
};


// --- 標籤類型清單 ---
const SPOT_TAGS = [
  { type: "sightseeing", name: "🌸 觀光祈福" },
  { type: "shopping", name: "🛍️ 旗艦購物" },
  { type: "food", name: "🍽️ 美食饗宴" },
  { type: "hotel", name: "🏨 優質住宿" },
  { type: "transport", name: "🎫 交通移動" },
  { type: "custom", name: "✨ 個人自訂" }
];

// --- 吉祥物：摺紙柴犬 (使用者提供的紙藝柴犬圖，已去背) ---
const ShibaInk = ({ className = "" }) => (
  <img
    src="/mascot/shiba-origami.png"
    alt="小柴導遊"
    draggable={false}
    className={`object-contain select-none ${className}`}
  />
);

// --- 交通方式清單 (偏好與景點間移動共用) ---
const TRANSPORT_MODES = [
  { key: "transit", label: "🚃 大眾運輸", mapsMode: "transit", defaultMin: 25 },
  { key: "walking", label: "🚶 步行", mapsMode: "walking", defaultMin: 15 },
  { key: "driving", label: "🚗 自駕 / 計程車", mapsMode: "driving", defaultMin: 15 },
  { key: "bicycling", label: "🚲 單車", mapsMode: "bicycling", defaultMin: 20 }
];

export default function App() {
  const [view, setView] = useState('welcome'); // 'welcome' | 'planner'
  const [itinerary, setItinerary] = useState(() => {
    // 試圖自 LocalStorage 恢復
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oritour_itinerary');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return PRESETS.tokyo; }
      }
    }
    return PRESETS.tokyo;
  });
  
  const [activeDay, setActiveDay] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: '你好！我是小柴導遊 🐕。我已經準備好協助你客製化精緻行程！你可以告訴我「幫我在下午加個甜點行程」、「調整我的花費預算」或直接與我聊聊！' }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  // 匯率狀態 (預設日幣對台幣約 0.21, 對美金約 0.0065)
  const [exchangeRate, setExchangeRate] = useState({ twd: 0.21, usd: 0.0065 });
  const [twdInput, setTwdInput] = useState('5000');
  const [jpyOutput, setJpyOutput] = useState('23800');

  // 本地設定
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_gemini_key') || '';
    }
    return '';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 景點編輯 Modal 狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null); // { dayIdx, spotIdx, data }

  // 天數編輯 Modal 狀態
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [editDayData, setEditDayData] = useState(null); // { dayNum, title, path, companion }

  // 天數管理模式（批次刪除 / 交換位置 / 任意位置插入）
  const [isDayManageMode, setIsDayManageMode] = useState(false);
  const [selectedDayNums, setSelectedDayNums] = useState([]);

  // 行李清單 (以 LocalStorage 為主)
  const [packingList, setPackingList] = useState([
    { id: 1, text: "護照與簽證 (確認效期 6 個月以上)", checked: true },
    { id: 2, text: "日幣現金 & 回饋高信用卡", checked: true },
    { id: 3, text: "上網 SIM 卡 / eSIM 或分享器", checked: false },
    { id: 4, text: "萬國轉接頭與行動電源", checked: false },
    { id: 5, text: "保養品與常備藥品", checked: false },
    { id: 6, text: "小收納袋與舒適好走路的鞋子", checked: false }
  ]);
  const [newPackingText, setNewPackingText] = useState('');

  // 旅遊備忘便籤
  const [quickNotes, setQuickNotes] = useState("【待辦提醒】\n1. 提前在網上填好 Visit Japan Web (入境免排長龍)。\n2. 帶一個輕量環保袋備用，日本購物塑膠袋要付費。\n3. 日暮里舍人線可以多利用。");

  // 通知吐司訊息 (Toast)
  const [toast, setToast] = useState(null);

  // 開場柴犬 Logo 動畫
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);

  const dismissIntro = () => {
    if (introFading) return;
    setIntroFading(true);
    setTimeout(() => setShowIntro(false), 700);
  };

  // 安全網：影片無法播放時最多 10 秒自動關閉
  useEffect(() => {
    if (!showIntro) return;
    const failsafe = setTimeout(dismissIntro, 10000);
    return () => clearTimeout(failsafe);
  }, [showIntro]);

  // 懸浮回頂按鈕顯示狀態
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const chatHistoryRef = useRef(null);
  const dayTimelineRef = useRef(null);
  const flightPanelRef = useRef(null);
  const lodgingPanelRef = useRef(null);

  // 總覽列點擊：切換天數並捲動至該天行程區塊
  const jumpToDay = (dayNum) => {
    setActiveDay(dayNum);
    setTimeout(() => {
      if (dayTimelineRef.current) {
        dayTimelineRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // 流程追蹤卡片點擊：捲動至對應設定區塊
  const jumpToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- 機票提醒相關狀態與 LocalStorage 綁定 ---
  const [departureTime, setDepartureTime] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_departure_time') || '';
    }
    return '';
  });
  const [returnTime, setReturnTime] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_return_time') || '';
    }
    return '';
  });
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketInputText, setTicketInputText] = useState('');
  const [ticketImage, setTicketImage] = useState(null); // { data: base64, mimeType, name }

  // 航班資訊：代號與起降機場
  const [flightInfo, setFlightInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oritour_flight_info');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallthrough */ }
      }
    }
    return { depFlightNo: '', depFrom: '', depTo: '', retFlightNo: '', retFrom: '', retTo: '' };
  });
  const [flightGuide, setFlightGuide] = useState('');
  const [isGuideLoading, setIsGuideLoading] = useState(false);

  // --- 住宿清單與偏好交通方式 ---
  const [lodgings, setLodgings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oritour_lodgings');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return []; }
      }
    }
    return [];
  });
  const [newLodging, setNewLodging] = useState({ name: '', checkIn: '', checkOut: '' });
  const [lodgingUrlInput, setLodgingUrlInput] = useState('');

  // 旅遊地區 / 目的地（提供給 AI 規劃使用）
  const [destination, setDestination] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_destination') || '';
    }
    return '';
  });
  const [transportPref, setTransportPref] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_transport_pref') || 'transit';
    }
    return 'transit';
  });
  const [notificationPermission, setNotificationPermission] = useState(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  // --- 雲端同步與範本分享相關狀態 ---
  const [shareId, setShareId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('oritour_share_id');
      if (!id) {
        id = 'ori-' + Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('oritour_share_id', id);
      }
      return id;
    }
    return '';
  });

  const [gasUrl, setGasUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_gas_url') || '';
    }
    return '';
  });

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);
  const [isCloudLoading, setIsCloudLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('oritour_gas_url', gasUrl);
  }, [gasUrl]);

  useEffect(() => {
    localStorage.setItem('oritour_departure_time', departureTime);
  }, [departureTime]);

  useEffect(() => {
    localStorage.setItem('oritour_return_time', returnTime);
  }, [returnTime]);

  // 依機票出發/回國日期自動同步旅行天數分頁
  useEffect(() => {
    if (!departureTime || !returnTime) return;
    const dep = new Date(departureTime);
    const ret = new Date(returnTime);
    if (isNaN(dep.getTime()) || isNaN(ret.getTime())) return;

    const depDay = new Date(dep.getFullYear(), dep.getMonth(), dep.getDate());
    const retDay = new Date(ret.getFullYear(), ret.getMonth(), ret.getDate());
    const tripDays = Math.round((retDay.getTime() - depDay.getTime()) / 86400000) + 1;
    if (tripDays < 1 || tripDays > 60) return;

    setItinerary(prev => {
      if (prev.length < tripDays) {
        // 天數不足：自動補上空白天
        const added = [];
        for (let i = prev.length + 1; i <= tripDays; i++) {
          added.push({ dayNum: i, title: "", companion: "", path: "", spots: [] });
        }
        setTimeout(() => showToast(`已依機票日期自動同步為 ${tripDays} 天行程，新增了 ${added.length} 天空白分頁汪！`), 0);
        return [...prev, ...added];
      }
      if (prev.length > tripDays) {
        // 天數過多：只移除尾端「完全空白」的天數，有內容的保留
        const trimmed = [...prev];
        while (trimmed.length > tripDays) {
          const last = trimmed[trimmed.length - 1];
          const isEmpty = (!last.spots || last.spots.length === 0) && !last.title;
          if (!isEmpty) break;
          trimmed.pop();
        }
        if (trimmed.length !== prev.length) {
          setTimeout(() => {
            showToast(`已依機票日期移除尾端 ${prev.length - trimmed.length} 天空白分頁汪！（有內容的天數不會被刪除）`);
            setActiveDay(d => Math.min(d, trimmed.length));
          }, 0);
          return trimmed;
        }
      }
      return prev;
    });
  }, [departureTime, returnTime]);

  useEffect(() => {
    localStorage.setItem('oritour_lodgings', JSON.stringify(lodgings));
  }, [lodgings]);

  useEffect(() => {
    localStorage.setItem('oritour_flight_info', JSON.stringify(flightInfo));
  }, [flightInfo]);

  useEffect(() => {
    localStorage.setItem('oritour_destination', destination);
  }, [destination]);

  useEffect(() => {
    localStorage.setItem('oritour_transport_pref', transportPref);
  }, [transportPref]);

  // 定時檢查出發前一天提醒
  useEffect(() => {
    if (!departureTime) return;

    const checkReminder = () => {
      if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') return;

      const departureDate = new Date(departureTime);
      if (isNaN(departureDate.getTime())) return;

      const now = new Date();
      const reminderTime = new Date(departureDate.getTime() - 24 * 60 * 60 * 1000); // 出發前 24 小時

      // 只有在當前時間已經過了「提醒時間」，且還沒到「出發時間」
      if (now >= reminderTime && now < departureDate) {
        const todayStr = now.toDateString();
        const lastReminded = localStorage.getItem('oritour_last_reminded_date');
        
        if (lastReminded !== todayStr) {
          const uncheckedItems = packingList.filter(item => !item.checked);
          if (uncheckedItems.length > 0) {
            new Notification("🐕 OriTour 行李準備提醒！", {
              body: `您的航班將於明天出發！還有 ${uncheckedItems.length} 項行李尚未準備好喔汪！`,
              icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐕</text></svg>"
            });
            localStorage.setItem('oritour_last_reminded_date', todayStr);
          }
        }
      }
    };

    // 初始化時檢查一次，之後每 60 秒檢查一次
    checkReminder();
    const interval = setInterval(checkReminder, 60 * 1000);
    return () => clearInterval(interval);
  }, [departureTime, packingList]);

  // --- 自動儲存與載入 ---
  useEffect(() => {
    localStorage.setItem('oritour_itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatMessages, isAiLoading]);

  // --- 顯示通知 ---
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // --- 啟用瀏覽器通知提醒 ---
  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast("此瀏覽器不支援本機通知功能汪！", "warning");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        showToast("已成功啟用瀏覽器出發通知提醒！🐕");
        new Notification("🐕 OriTour 提醒已啟用", {
          body: "當機票出發前一天時，小柴會在此提醒您未完成的行李！汪！"
        });
      } else {
        showToast("通知權限被拒絕，請至瀏覽器設定開啟權限汪！", "warning");
      }
    } catch (err) {
      console.error(err);
      showToast("無法設定通知權限汪！", "warning");
    }
  };

  // --- 匯出 .ics 行事曆檔案 ---
  const downloadIcsFile = () => {
    if (!departureTime) {
      showToast("請先設定機票出發時間汪！", "warning");
      return;
    }

    const departureDate = new Date(departureTime);
    if (isNaN(departureDate.getTime())) {
      showToast("機票出發時間格式錯誤汪！", "warning");
      return;
    }

    // 設定為出發前 24 小時 (前一天) 的早上 9 點
    const reminderDate = new Date(departureDate.getTime() - 24 * 60 * 60 * 1000);
    reminderDate.setHours(9, 0, 0, 0);

    // 格式化為 ICS 日期格式: YYYYMMDDTHHMMSSZ (UTC)
    const formatToIcsUtc = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const uncheckedItems = packingList.filter(item => !item.checked);
    const uncheckedListStr = uncheckedItems.length > 0
      ? uncheckedItems.map((item, idx) => `${idx + 1}. ${item.text}`).join('\\n')
      : '所有行李皆已準備就緒！';

    // 組合多個事件：行李提醒 + 出發航班 + 回程航班
    const buildEvent = (uid, start, end, summary, description, withAlarm) => {
      const lines = [
        'BEGIN:VEVENT',
        `UID:${uid}@oritour.vercel.app`,
        `DTSTAMP:${formatToIcsUtc(new Date())}`,
        `DTSTART:${formatToIcsUtc(start)}`,
        `DTEND:${formatToIcsUtc(end)}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`
      ];
      if (withAlarm) {
        lines.push(
          'BEGIN:VALARM',
          'TRIGGER:-PT0M',
          'ACTION:DISPLAY',
          `DESCRIPTION:${summary}`,
          'END:VALARM'
        );
      }
      lines.push('END:VEVENT');
      return lines;
    };

    const events = [
      ...buildEvent(
        `packing-${Date.now()}`,
        reminderDate,
        new Date(reminderDate.getTime() + 30 * 60 * 1000),
        '🐕 OriTour 明日出發行李檢查提醒！',
        `您的航班將於明天出發！請檢查以下尚未準備好的行李事項：\\n\\n${uncheckedListStr}`,
        true
      ),
      ...buildEvent(
        `flight-dep-${Date.now()}`,
        departureDate,
        new Date(departureDate.getTime() + 3 * 60 * 60 * 1000),
        '✈️ 出發航班 (OriTour)',
        '出發日到囉！記得提前 2-3 小時抵達機場辦理報到與行李托運汪！',
        true
      )
    ];

    // 若有設定回程時間，追加回程航班事件
    if (returnTime) {
      const returnDate = new Date(returnTime);
      if (!isNaN(returnDate.getTime())) {
        events.push(...buildEvent(
          `flight-ret-${Date.now()}`,
          returnDate,
          new Date(returnDate.getTime() + 3 * 60 * 60 * 1000),
          '🛬 回程航班 (OriTour)',
          '回國日！記得確認退稅文件、伴手禮與護照都帶齊了汪！',
          true
        ));
      }
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//OriTour//Travel Planner//EN',
      'CALSCALE:GREGORIAN',
      ...events,
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oritour-packing-reminder.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("成功生成行事曆提醒，請點擊下載的檔案以匯入！");
  };

  // --- 機票截圖轉 Base64 ---
  const handleTicketImageSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("請選擇圖片檔案（截圖）汪！", "warning");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result).split(',')[1];
      setTicketImage({ data: base64, mimeType: file.type, name: file.name });
      showToast("截圖已載入，點擊「開始解析」進行辨識汪！");
    };
    reader.onerror = () => showToast("讀取圖片失敗，請重試汪！", "warning");
    reader.readAsDataURL(file);
  };

  // --- 機票解析函式 (文字 + 截圖辨識，結合 Gemini API 與 Regex) ---
  const handleParseTicket = async () => {
    if (!ticketInputText.trim() && !ticketImage) {
      showToast("請先貼入機票文字或上傳機票截圖汪！", "warning");
      return;
    }

    // 截圖辨識必須透過 AI 視覺模型
    if (ticketImage && !apiKey) {
      showToast("截圖辨識需要 Gemini API Key，請先至「AI 設定」填入金鑰汪！", "warning");
      setIsSettingsOpen(true);
      return;
    }

    setIsAiLoading(true);

    // 1. 若有 API Key，優先使用 Gemini API 智慧識別（支援圖片視覺辨識）
    if (apiKey) {
      try {
        const systemPrompt = `你是一位專業的助理。請解析使用者提供的機票資訊（可能是文字或機票截圖圖片），提取去程與回程的「出發日期時間」、「航班代號」與「起降機場」。
        回覆格式必須是嚴格合法的 JSON，時間格式為 "YYYY-MM-DDTHH:mm"，機場請用 IATA 代碼加城市（例: "TPE 台北桃園"）。找不到的欄位請回傳空字串。
        絕對不要包含 markdown 標籤（除了 json 包裹）：
        {
          "departureTime": "YYYY-MM-DDTHH:mm",
          "returnTime": "YYYY-MM-DDTHH:mm",
          "depFlightNo": "BR198",
          "depFrom": "TPE 台北桃園",
          "depTo": "NRT 東京成田",
          "retFlightNo": "BR197",
          "retFrom": "NRT 東京成田",
          "retTo": "TPE 台北桃園"
        }`;

        const parts = [];
        if (ticketInputText.trim()) {
          parts.push({ text: `機票文字：\n${ticketInputText}` });
        }
        if (ticketImage) {
          parts.push({ text: "以下是機票截圖，請以視覺辨識提取航班時間：" });
          parts.push({ inline_data: { mime_type: ticketImage.mimeType, data: ticketImage.data } });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (!response.ok) throw new Error("API 呼叫失敗");
        const resData = await response.json();
        const rawText = resData.candidates[0].content.parts[0].text;
        const result = JSON.parse(rawText.trim());

        if (result.departureTime || result.returnTime) {
          if (result.departureTime) setDepartureTime(result.departureTime);
          if (result.returnTime) setReturnTime(result.returnTime);
          // 航班代號與機場：只覆蓋有辨識到的欄位
          setFlightInfo(prev => ({
            depFlightNo: result.depFlightNo || prev.depFlightNo,
            depFrom: result.depFrom || prev.depFrom,
            depTo: result.depTo || prev.depTo,
            retFlightNo: result.retFlightNo || prev.retFlightNo,
            retFrom: result.retFrom || prev.retFrom,
            retTo: result.retTo || prev.retTo
          }));
          const gotBoth = result.departureTime && result.returnTime;
          showToast(gotBoth
            ? "成功透過 AI 提取去程與回程時間汪！"
            : `成功透過 AI 提取${result.departureTime ? '出發' : '回程'}時間！${result.departureTime ? '未找到回程，可手動補上' : ''}汪！`);
          setIsTicketModalOpen(false);
          setTicketInputText('');
          setTicketImage(null);
          setIsAiLoading(false);
          return;
        }
      } catch (err) {
        console.error("AI 機票解析失敗，將降級使用 Regex：", err);
      }
    }

    // 2. 降級或無 Key 時，使用 Regex 匹配文字（第一組時間視為去程、第二組視為回程）
    // 支援格式：2026/07/06 08:30, 2026-07-06 08:30, 2026.07.06 08:30 等
    const dateTimeRegex = /(\d{4})[-/\.](\d{1,2})[-/\.](\d{1,2})(?:[^\d]{0,10}?(\d{1,2}):(\d{2}))?/g;
    const matches = [...ticketInputText.matchAll(dateTimeRegex)];

    if (matches.length > 0) {
      const toDatetimeLocal = (m) => {
        const year = m[1];
        const month = m[2].padStart(2, '0');
        const day = m[3].padStart(2, '0');
        const hour = (m[4] || '08').padStart(2, '0');
        const minute = m[5] || '00';
        return `${year}-${month}-${day}T${hour}:${minute}`;
      };

      setDepartureTime(toDatetimeLocal(matches[0]));
      if (matches.length > 1) {
        setReturnTime(toDatetimeLocal(matches[1]));
        showToast("成功提取去程與回程時間！(使用規則匹配) 汪！");
      } else {
        showToast("成功提取出發時間！未偵測到回程，可手動補上汪！");
      }

      // 航班代號 (第一組=去程, 第二組=回程) 與 IATA 機場代碼 (依出現順序配對)
      const flightNos = [...ticketInputText.matchAll(/\b([A-Z]{2}\s?\d{2,4})\b/g)].map(m => m[1].replace(/\s/, ''));
      const iatas = [...ticketInputText.matchAll(/\(([A-Z]{3})\)/g)].map(m => m[1]);
      if (flightNos.length > 0 || iatas.length > 0) {
        setFlightInfo(prev => ({
          depFlightNo: flightNos[0] || prev.depFlightNo,
          retFlightNo: flightNos[1] || prev.retFlightNo,
          depFrom: iatas[0] || prev.depFrom,
          depTo: iatas[1] || prev.depTo,
          retFrom: iatas[2] || prev.retFrom,
          retTo: iatas[3] || prev.retTo
        }));
      }
      setIsTicketModalOpen(false);
      setTicketInputText('');
      setTicketImage(null);
    } else {
      showToast("無法自動辨識時間，請手動在欄位中設定出發與回程時間汪！", "warning");
    }

    setIsAiLoading(false);
  };

  // --- AI 機場報到指南：報到櫃台 / 關櫃時間 / 登機門提醒 (需 API Key) ---
  const handleFlightGuide = async () => {
    if (!apiKey) {
      showToast("AI 機場報到指南需要 Gemini API Key，請先至「AI 設定」填入金鑰汪！", "warning");
      setIsSettingsOpen(true);
      return;
    }
    if (!flightInfo.depFlightNo && !flightInfo.retFlightNo) {
      showToast("請先填入航班代號汪！", "warning");
      return;
    }

    setIsGuideLoading(true);
    try {
      const prompt = `以下是旅客的航班資訊：
去程：${flightInfo.depFlightNo || '未提供'}｜${flightInfo.depFrom || '?'} ➔ ${flightInfo.depTo || '?'}｜起飛時間 ${departureTime || '未提供'}
回程：${flightInfo.retFlightNo || '未提供'}｜${flightInfo.retFrom || '?'} ➔ ${flightInfo.retTo || '?'}｜起飛時間 ${returnTime || '未提供'}

請以繁體中文、條列式，針對「去程」與「回程」分別提供：
1. 該航班所屬航空公司在出發機場的航廈與報到櫃台區域（依公開常識）
2. 該航空公司的報到開櫃與關櫃時間慣例（例：起飛前幾分鐘關櫃）
3. 建議抵達機場的時間
4. 登機門提醒（登機門為浮動資訊，請提醒以當日機場現場公告與航空公司 App 為準）
每點一句話、簡潔實用。開頭不用客套，結尾加一句小柴風格的提醒（帶「汪」）。`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error("API 呼叫失敗");
      const resData = await response.json();
      const text = resData.candidates[0].content.parts[0].text;
      setFlightGuide(text);
      showToast("機場報到指南已生成汪！");
    } catch (err) {
      console.error("機場指南生成失敗：", err);
      showToast(`指南生成失敗汪！${err.message}`, "warning");
    } finally {
      setIsGuideLoading(false);
    }
  };

  // --- 航班動態查詢連結 ---
  const getFlightStatusUrl = (flightNo) =>
    `https://www.google.com/search?q=${encodeURIComponent(flightNo + ' 航班動態 flight status')}`;

  // --- 備份行程到 Google Sheet 雲端 (POST) ---
  const saveToCloud = async () => {
    if (!gasUrl) {
      showToast("請先在雲端同步設定中填入 GAS API URL 汪！", "warning");
      setIsSyncModalOpen(true);
      return;
    }
    
    setIsCloudLoading(true);
    try {
      const payload = {
        id: shareId,
        itinerary: itinerary,
        packingList: packingList,
        quickNotes: quickNotes,
        departureTime: departureTime,
        returnTime: returnTime,
        lodgings: lodgings,
        transportPref: transportPref,
        flightInfo: flightInfo,
        destination: destination
      };

      // 使用 text/plain 以免觸發 CORS OPTIONS 預檢限制
      const response = await fetch(gasUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("CORS 或 API 無響應");
      const resData = await response.json();
      
      if (resData.status === "success") {
        showToast("行程備份上傳成功！雲端與您的瀏覽器同步完成汪！");
      } else {
        throw new Error(resData.message || "未知伺服器錯誤");
      }
    } catch (err) {
      console.error("雲端同步失敗：", err);
      showToast(`同步失敗，請檢查 GAS 部署與網址正確性汪！\n錯誤: ${err.message}`, "warning");
    } finally {
      setIsCloudLoading(false);
    }
  };

  // --- 自 Google Sheet 載入特定行程 (GET) ---
  const loadFromCloud = async (targetId) => {
    if (!gasUrl) {
      showToast("偵測到分享連結，但未配置 GAS 同步網址。請先配置網址以完成下載！", "warning");
      setIsSyncModalOpen(true);
      return;
    }

    setIsCloudLoading(true);
    try {
      const response = await fetch(`${gasUrl}?id=${targetId}`, {
        method: "GET",
        mode: "cors"
      });

      if (!response.ok) throw new Error("API 響應失敗");
      const resData = await response.json();

      if (resData.status === "success" && resData.data) {
        const cloudData = resData.data;
        if (cloudData.itinerary) setItinerary(cloudData.itinerary);
        if (cloudData.packingList) setPackingList(cloudData.packingList);
        if (cloudData.quickNotes !== undefined) setQuickNotes(cloudData.quickNotes);
        if (cloudData.departureTime !== undefined) setDepartureTime(cloudData.departureTime);
        if (cloudData.returnTime !== undefined) setReturnTime(cloudData.returnTime);
        if (cloudData.lodgings !== undefined) setLodgings(cloudData.lodgings);
        if (cloudData.transportPref !== undefined) setTransportPref(cloudData.transportPref);
        if (cloudData.flightInfo !== undefined) setFlightInfo(cloudData.flightInfo);
        if (cloudData.destination !== undefined) setDestination(cloudData.destination);
        
        // 設定目前的 ShareID 為該下載 ID
        setShareId(cloudData.id);
        localStorage.setItem('oritour_share_id', cloudData.id);
        
        showToast(`成功從雲端載入行程 (ID: ${cloudData.id}) 汪！`);
        setIsSharedView(true);
      } else {
        throw new Error(resData.message || "行程可能已被刪除");
      }
    } catch (err) {
      console.error("載入行程失敗：", err);
      showToast(`載入失敗，可能行程不存在或 GAS URL 錯誤汪！\n錯誤: ${err.message}`, "warning");
    } finally {
      setIsCloudLoading(false);
    }
  };

  // --- 複製為個人行程，防止覆蓋範本 ---
  const cloneAsOwn = () => {
    // 重新生成一個獨立隨機 ID
    const newId = 'ori-' + Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9);
    setShareId(newId);
    localStorage.setItem('oritour_share_id', newId);
    
    // 取消共享檢視標記
    setIsSharedView(false);
    
    // 清除網址的 ?id= 參數，還原為一般網頁
    if (typeof window !== 'undefined') {
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
    
    showToast("已將行程複製為您個人的專屬備份！現在起您可以獨立修改並備份到雲端，不會影響到原來的範本汪！");
  };

  // --- 初始化 URL 參數檢查 ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('id');
      if (urlId) {
        if (gasUrl) {
          loadFromCloud(urlId);
        } else {
          setIsSharedView(true);
          showToast("檢測到分享 ID，請至右上方『雲端同步』填寫您的 GAS URL 以便從 Google 試算表拉取資料汪！", "warning");
          setIsSyncModalOpen(true);
        }
      }
    }
  }, [gasUrl]);


  // --- 統計當天與全部旅程費用 ---
  const getDailyTotalCost = (dayData) => {
    if (!dayData || !dayData.spots) return 0;
    return dayData.spots.reduce((sum, spot) => sum + (Number(spot.cost) || 0), 0);
  };

  const getGrandTotalCost = () => {
    return itinerary.reduce((sum, day) => sum + getDailyTotalCost(day), 0);
  };

  const getCategoryStats = () => {
    const stats = { sightseeing: 0, shopping: 0, food: 0, hotel: 0, transport: 0, custom: 0 };
    itinerary.forEach(day => {
      day.spots.forEach(spot => {
        const type = spot.tagType || 'custom';
        if (stats[type] !== undefined) {
          stats[type] += (Number(spot.cost) || 0);
        } else {
          stats.custom += (Number(spot.cost) || 0);
        }
      });
    });
    return stats;
  };

  // --- 景點間交通估算 ---
  // 景點可自訂 transitMode / transitMin（前往下一站）；未設定時依整體偏好交通推估
  const getTransitMode = (spot) => {
    const key = spot.transitMode && spot.transitMode !== 'default' ? spot.transitMode : transportPref;
    return TRANSPORT_MODES.find(m => m.key === key) || TRANSPORT_MODES[0];
  };

  const getTransitMinutes = (spot) => {
    const n = Number(spot.transitMin);
    if (!isNaN(n) && n > 0) return n;
    return getTransitMode(spot).defaultMin;
  };

  const getDailyTransitMinutes = (dayData) => {
    if (!dayData || !dayData.spots || dayData.spots.length < 2) return 0;
    return dayData.spots.slice(0, -1).reduce((sum, spot) => sum + getTransitMinutes(spot), 0);
  };

  const formatMinutes = (min) => {
    if (min >= 60) {
      const h = Math.floor(min / 60);
      const m = min % 60;
      return m > 0 ? `${h} 小時 ${m} 分` : `${h} 小時`;
    }
    return `${min} 分鐘`;
  };

  const getDirectionsUrl = (fromName, toName, modeKey) => {
    const mode = TRANSPORT_MODES.find(m => m.key === modeKey) || TRANSPORT_MODES[0];
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(fromName)}&destination=${encodeURIComponent(toName)}&travelmode=${mode.mapsMode}`;
  };

  // --- 依出發日推算每天日期，並對應當晚住宿 ---
  const getDayDate = (dayNum) => {
    if (!departureTime) return null;
    const d = new Date(departureTime);
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + (dayNum - 1));
    return d;
  };

  const getLodgingForDay = (dayNum) => {
    const d = getDayDate(dayNum);
    if (!d || lodgings.length === 0) return null;
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return lodgings.find(l => l.checkIn && l.checkOut && ds >= l.checkIn && ds < l.checkOut) || null;
  };

  // --- 住宿：貼上 Google Maps 連結辨識名稱 ---
  const parseLodgingFromUrl = () => {
    const url = lodgingUrlInput.trim();
    if (!url) {
      showToast("請先貼上 Google Maps 住宿連結汪！", "warning");
      return;
    }
    let name = '';
    try {
      const u = new URL(url);
      // 格式 1: /maps/place/<名稱>/...
      const placeMatch = u.pathname.match(/\/place\/([^/]+)/);
      if (placeMatch) {
        name = decodeURIComponent(placeMatch[1]).replace(/\+/g, ' ');
      } else {
        // 格式 2: ?q= 或 ?query= 參數
        const q = u.searchParams.get('q') || u.searchParams.get('query') || '';
        if (q && !/^[-\d.,\s]+$/.test(q)) name = q.replace(/\+/g, ' ');
      }
    } catch (err) { /* 非合法網址 */ }

    if (name) {
      setNewLodging({ ...newLodging, name, mapUrl: url });
      setLodgingUrlInput('');
      showToast(`已辨識住宿「${name}」！請補上入住 / 退房日期後新增汪！`);
    } else {
      showToast("無法從連結辨識名稱汪！（goo.gl 短網址請先在瀏覽器開啟後複製完整網址）", "warning");
    }
  };

  // --- 住宿：訂房截圖 AI 分析 (需 Gemini API Key) ---
  const handleLodgingImageSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("請選擇圖片檔案（截圖）汪！", "warning");
      return;
    }
    if (!apiKey) {
      showToast("截圖分析需要 Gemini API Key，請先至「AI 設定」填入金鑰汪！", "warning");
      setIsSettingsOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = String(reader.result).split(',')[1];
      setIsAiLoading(true);
      try {
        const systemPrompt = `你是一位專業的助理。請分析使用者提供的住宿訂房截圖（可能是 Booking.com / Agoda / 樂天 / 飯店官網的訂單確認畫面或確認信），提取「住宿名稱」、「入住日期」與「退房日期」。
        回覆格式必須是嚴格合法的 JSON，包含 "name"、"checkIn"、"checkOut" 三個欄位，日期格式為 "YYYY-MM-DD"。找不到的欄位請回傳空字串。
        絕對不要包含 markdown 標籤（除了 json 包裹）：
        {
          "name": "住宿名稱",
          "checkIn": "YYYY-MM-DD",
          "checkOut": "YYYY-MM-DD"
        }`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [
              { text: "以下是住宿訂房截圖，請以視覺辨識提取住宿資訊：" },
              { inline_data: { mime_type: file.type, data: base64 } }
            ] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (!response.ok) throw new Error("API 呼叫失敗");
        const resData = await response.json();
        const rawText = resData.candidates[0].content.parts[0].text;
        const result = JSON.parse(rawText.trim());

        if (result.name || result.checkIn || result.checkOut) {
          setNewLodging(prev => ({
            ...prev,
            name: result.name || prev.name,
            checkIn: result.checkIn || prev.checkIn,
            checkOut: result.checkOut || prev.checkOut
          }));
          showToast("已從截圖辨識住宿資訊！確認欄位無誤後按「+ 新增住宿」汪！");
        } else {
          throw new Error("截圖中未辨識到住宿資訊");
        }
      } catch (err) {
        console.error("住宿截圖分析失敗：", err);
        showToast(`截圖分析失敗汪！${err.message}`, "warning");
      } finally {
        setIsAiLoading(false);
      }
    };
    reader.onerror = () => showToast("讀取圖片失敗，請重試汪！", "warning");
    reader.readAsDataURL(file);
  };

  // --- 住宿清單管理 ---
  const addLodging = (e) => {
    e.preventDefault();
    if (!newLodging.name.trim() || !newLodging.checkIn || !newLodging.checkOut) {
      showToast("請填寫住宿名稱與入住 / 退房日期汪！", "warning");
      return;
    }
    if (newLodging.checkOut <= newLodging.checkIn) {
      showToast("退房日期必須晚於入住日期汪！", "warning");
      return;
    }
    setLodgings([...lodgings, { id: Date.now(), ...newLodging, name: newLodging.name.trim() }]);
    setNewLodging({ name: '', checkIn: '', checkOut: '' });
    showToast("成功新增住宿資訊汪！");
  };

  const deleteLodging = (id) => {
    setLodgings(lodgings.filter(l => l.id !== id));
  };

  // --- 一鍵套用範本 ---
  const handleLoadPreset = (key) => {
    setItinerary(PRESETS[key]);
    setActiveDay(1);
    showToast(`成功套用並載入「${key === 'tokyo' ? '東京小眾香氛店' : key === 'kyoto' ? '京都古都歷史' : '大阪舌尖狂熱'}」精選旅程！`);
    setView('planner');
  };

  // --- 匯率換算更新（雙向：台幣 ⇄ 日圓） ---
  const handleTwdChange = (val) => {
    setTwdInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setJpyOutput(Math.round(num / exchangeRate.twd).toString());
    } else {
      setJpyOutput('');
    }
  };

  const handleJpyChange = (val) => {
    setJpyOutput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setTwdInput(Math.round(num * exchangeRate.twd).toString());
    } else {
      setTwdInput('');
    }
  };

  // --- 儲存 API KEY ---
  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('oritour_gemini_key', key);
    showToast("金鑰已成功儲存！現在將連線至您的 Gemini AI 模型。");
    setIsSettingsOpen(false);
  };


  // --- 柴犬導遊本地模擬對話引擎 (High-Fidelity Offline Engine) ---
  const runLocalMockAi = (query) => {
    const lower = query.toLowerCase();
    let reply = "這樣啊汪！這個點子聽起來真不錯，不過小柴正準備帶你探險！";
    let updatedItinerary = [...itinerary];
    const dayIdx = activeDay - 1;

    if (lower.includes("甜點") || lower.includes("下午茶") || lower.includes("蛋糕")) {
      const dessertSpot = {
        time: "15:30",
        name: "HARBS 水果千層蛋糕 (小柴推薦店)",
        desc: "日本超人氣甜點店，新鮮切片，多層卡士達與多樣新鮮水果完美堆疊！",
        tip: "每人低消一杯飲料，招牌水果千層最容易售罄唷！",
        tagType: "food",
        tagName: "🍰 職人甜點",
        cost: 1100,
        mapUrl: "https://www.google.com/maps/search/?api=1&query=HARBS+東京",
        memo: "超大一塊，建議空腹去享用！"
      };
      
      // 插入到 15:00 ~ 16:00 附近
      updatedItinerary[dayIdx].spots = [...updatedItinerary[dayIdx].spots, dessertSpot];
      updatedItinerary[dayIdx].spots.sort((a, b) => a.time.localeCompare(b.time));
      reply = "好的汪！小柴在今天的 15:30 為您悄悄塞進了最有人氣的『HARBS 水果千層蛋糕』🍰！估計花費 ¥1,100，這可是連日本在地人都要排隊的頂級甜品汪！";
    } 
    else if (lower.includes("咖啡") || lower.includes("喝一杯")) {
      const coffeeSpot = {
        time: "14:15",
        name: "Blue Bottle Coffee 藍瓶咖啡",
        desc: "極簡現代的美學空間，香氣四溢的職人手沖單品咖啡。",
        tip: "熱拿鐵拉花非常精美，值得拍照打卡！",
        tagType: "food",
        tagName: "☕ 質感咖啡",
        cost: 650,
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Blue+Bottle+東京",
        memo: "買一包烘焙好的耶加雪菲豆子帶回台灣！"
      };
      updatedItinerary[dayIdx].spots = [...updatedItinerary[dayIdx].spots, coffeeSpot];
      updatedItinerary[dayIdx].spots.sort((a, b) => a.time.localeCompare(b.time));
      reply = "午后需要一杯香氣滿滿的手沖對吧汪！小柴在 14:15 為您加入藍瓶咖啡 ☕，精緻的手沖質感最適合漫步午後囉！";
    }
    else if (lower.includes("省錢") || lower.includes("預算") || lower.includes("降低") || lower.includes("便宜")) {
      // 調低現有景點部分昂貴花費
      updatedItinerary[dayIdx].spots = updatedItinerary[dayIdx].spots.map(spot => {
        if (spot.cost > 3000) {
          return { ...spot, cost: Math.round(spot.cost * 0.7), memo: (spot.memo || "") + " (小柴提醒：今日有購物折扣或改買平價款，節省 30% 支出！)" };
        }
        return spot;
      });
      reply = "遵命！小柴使出『柴犬省錢術』汪！我幫你把大額的花費項目（像是百貨和精品購物）做出了 30% 的折扣修剪與平替建議，預算曲線看起來更和諧了汪！💰";
    }
    else if (lower.includes("藥妝") || lower.includes("買東西") || lower.includes("購物")) {
      const shopSpot = {
        time: "16:45",
        name: "松本清 旗艦免稅店",
        desc: "各類熱門日系彩妝、保養品與平價常備藥一應俱全，店內配有中文翻譯店員服務。",
        tip: "記得下載免稅+5%/7%折價神券，結帳直接出示條碼！",
        tagType: "shopping",
        tagName: "🛍️ 藥妝免稅",
        cost: 6000,
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Matsumoto+Kiyoshi+Tokyo",
        memo: "眼藥水跟合利他命強效錠多帶兩組。"
      };
      updatedItinerary[dayIdx].spots = [...updatedItinerary[dayIdx].spots, shopSpot];
      updatedItinerary[dayIdx].spots.sort((a, b) => a.time.localeCompare(b.time));
      reply = "買買買！日本藥妝最好逛了汪！小柴幫你在下午 16:45 安排了免稅松本清旗艦店 🛍️，出示免稅優惠券，省大錢買爽爽！";
    }
    else {
      reply = "汪嗚～小柴聽到了！這真是一個很特別的主意。我建議可以把這家想去的私房店用下方的『新增景點』功能，寫進我們完美的時間軸中喔！若你有設定 Gemini API Key，我還能上網抓取最新的交通情報呢！";
    }

    setItinerary(updatedItinerary);
    setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    setIsAiLoading(false);
  };

  // --- 發送 AI 規劃請求 ---
  const executeAiQuery = async (query) => {
    if (!query.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
    setIsAiLoading(true);

    // 如果沒有 API 金鑰，使用本地智慧引擎
    if (!apiKey) {
      setTimeout(() => {
        runLocalMockAi(query);
      }, 1200);
      return;
    }

    // 若有 API 金鑰，連線到 Gemini 2.5 API
    try {
      const systemPrompt = `你是一位專業的日本導遊(名為小柴導遊，口吻俏皮溫暖，常帶「汪！」)。請根據要求更新並重塑旅行行程 JSON。
      重點要求：
      1. 請完全保留或合理優化現有的日程格式。
      2. 每個景點必須包含 cost（以日圓預估的數字，不能是字串，不含符號）。
      3. 必須產生 mapUrl（格式：https://www.google.com/maps/search/?api=1&query=景點名稱+城市）。
      4. 請回覆一段小柴導遊的溫暖解說，並在 JSON 中回傳。
      當前行程：${JSON.stringify(itinerary)}
      當前正在檢視的天數：Day ${activeDay}。
      本次旅遊地區：${destination || '未指定'}。若某天有設定 area（活動區域範圍），新增或調整該天景點時必須位於該區域內。
      回覆格式必須是嚴格合法的 JSON，不能包含額外的 markdown 解釋（除了 json 包裹）：
      {
        "itinerary": [ ...完整更新後的行程 ],
        "reply": "小柴導遊的親切說明"
      }`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `處理用戶的要求：${query}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!response.ok) throw new Error("API 響應錯誤，請確認 Key 是否正確");
      const resData = await response.json();
      const rawText = resData.candidates[0].content.parts[0].text;
      
      // 解析 JSON
      const result = JSON.parse(rawText.trim());
      if (result.itinerary) {
        setItinerary(result.itinerary);
        showToast("AI 行程同步成功！");
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: result.reply || "小柴幫您調整好囉！🐕" }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { sender: 'ai', text: `汪嗚！API 連線似乎出了點狀況，小柴暫時切換成『本地離線智慧助理』！\n錯誤說明: ${err.message}` }]);
      // 降級為本地模擬
      runLocalMockAi(query);
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- 由小柴安排當日行程 (匯入前 N 天已排行程、偏好交通、住宿與航班資訊) ---
  const handleAiPlanDay = async () => {
    if (!apiKey) {
      showToast("「由小柴安排」需要 Gemini API Key，請先至「AI 設定」填入金鑰汪！", "warning");
      setIsSettingsOpen(true);
      return;
    }

    const dayIdx = activeDay - 1;
    const dayData = itinerary[dayIdx] || {};
    const prevDays = itinerary.slice(0, dayIdx).map(d => ({
      dayNum: d.dayNum,
      title: d.title,
      spots: (d.spots || []).map(s => ({ time: s.time, name: s.name, tagType: s.tagType }))
    }));
    const dayDate = getDayDate(activeDay);
    const lodging = getLodgingForDay(activeDay);
    const prefLabel = (TRANSPORT_MODES.find(m => m.key === transportPref) || TRANSPORT_MODES[0]).label;

    setChatMessages(prev => [...prev, { sender: 'user', text: `🐾 請小柴幫我安排 Day ${activeDay} 的一整天行程！` }]);
    setIsAiLoading(true);

    try {
      const systemPrompt = `你是一位專業的日本導遊（名為小柴導遊，口吻俏皮溫暖，常帶「汪！」）。請為旅客規劃 Day ${activeDay} 的一整天行程。

【旅行背景資訊】
- 本次旅遊地區：${destination || '未指定（請依住宿地點與抵達機場推斷合理地區）'}
- Day ${activeDay} 指定活動區域範圍：${dayData.area ? `「${dayData.area}」— 所有景點必須嚴格位於此區域範圍內，不可安排範圍外的景點！` : '未指定（請以住宿地點為中心、單一區域內安排，避免跨區奔波）'}
- 去程航班：${flightInfo.depFlightNo || '未提供代號'}｜${flightInfo.depFrom || '?'} ➔ ${flightInfo.depTo || '?'}｜起飛 ${departureTime || '未設定'}
- 回程航班：${flightInfo.retFlightNo || '未提供代號'}｜${flightInfo.retFrom || '?'} ➔ ${flightInfo.retTo || '?'}｜起飛 ${returnTime || '未設定'}
- 若 Day ${activeDay} 是「出發日」：行程請從抵達機場（${flightInfo.depTo || '抵達機場'}）入境後開始安排，第一站考量航班抵達時間與機場進市區的交通時間。
- 若 Day ${activeDay} 是「回國日」：行程要提早收尾，最後安排前往回程出發機場（${flightInfo.retFrom || '出發機場'}），國際線請預留起飛前 3 小時抵達機場辦理報到。
- Day ${activeDay} 的日期：${dayDate ? dayDate.toLocaleDateString('zh-TW') : '未知（未設定出發時間）'}
- 當晚住宿：${lodging ? `${lodging.name}（${lodging.checkIn} 入住 ~ ${lodging.checkOut} 退房）` : '未登記'}。行程動線請以住宿為起點與終點規劃。
- 偏好交通方式：${prefLabel}。景點間移動請以此為主，並填寫 transitMin 預估分鐘數。
- 全部住宿清單：${JSON.stringify(lodgings)}

【前 ${prevDays.length} 天已排行程（請避免重複安排相同景點，並延續旅程節奏）】
${prevDays.length > 0 ? JSON.stringify(prevDays) : '（這是第一天，無先前行程）'}

【規劃要求】
1. 安排 4~6 個景點，時間軸合理（含用餐時段），從早到晚排序。
2. 每個景點必須包含：time ("HH:mm")、name、desc、tip、tagType (sightseeing/shopping/food/hotel/transport/custom 之一)、tagName (含 emoji)、cost (日圓數字，不能是字串)、mapUrl (格式：https://www.google.com/maps/search/?api=1&query=景點名稱+城市)、memo、transitMode ("default")、transitMin (前往下一站的預估分鐘數字)。
3. 同時給這一天取一個 title (主題)、path (動線，例: 日暮里 ➔ 淺草 ➔ 上野)。

回覆格式必須是嚴格合法的 JSON，不能包含額外的 markdown 解釋（除了 json 包裹）：
{
  "title": "這一天的主題",
  "path": "主要動線",
  "spots": [ ...景點陣列 ],
  "reply": "小柴導遊的親切說明"
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `請開始規劃 Day ${activeDay} 的行程汪！` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (!response.ok) throw new Error("API 響應錯誤，請確認 Key 是否正確");
      const resData = await response.json();
      const rawText = resData.candidates[0].content.parts[0].text;
      const result = JSON.parse(rawText.trim());

      if (result.spots && Array.isArray(result.spots) && result.spots.length > 0) {
        const sortedSpots = [...result.spots].sort((a, b) => String(a.time).localeCompare(String(b.time)));
        const newItinerary = itinerary.map(day => {
          if (day.dayNum === activeDay) {
            return {
              ...day,
              title: result.title || day.title || `Day ${activeDay} 小柴推薦行程`,
              path: result.path || day.path,
              spots: sortedSpots
            };
          }
          return day;
        });
        setItinerary(newItinerary);
        showToast(`小柴已為 Day ${activeDay} 排好 ${sortedSpots.length} 個行程汪！`);
        setChatMessages(prev => [...prev, { sender: 'ai', text: result.reply || `Day ${activeDay} 排好囉！小柴依照您的住宿、航班與交通偏好精心規劃，快看看時間軸吧汪！🐕` }]);
      } else {
        throw new Error("AI 未回傳有效的行程內容");
      }
    } catch (err) {
      console.error("小柴安排行程失敗：", err);
      showToast(`小柴安排失敗汪！${err.message}`, "warning");
      setChatMessages(prev => [...prev, { sender: 'ai', text: `汪嗚！安排 Day ${activeDay} 時出了點狀況：${err.message}。請稍後再試，或用對話直接告訴小柴想去哪裡！` }]);
    } finally {
      setIsAiLoading(false);
    }
  };


  // --- 景點 Modal 處理邏輯 ---
  const openEditModal = (dayIdx, spotIdx) => {
    const isEdit = spotIdx !== -1;
    const spotData = isEdit ? itinerary[dayIdx].spots[spotIdx] : {
      time: "12:00", name: "", desc: "", tip: "", tagType: "sightseeing", tagName: "🌸 觀光祈福", cost: 0, mapUrl: "", memo: "",
      transitMode: "default", transitMin: ""
    };
    setEditData({ dayIdx, spotIdx, data: { ...spotData }, targetDay: dayIdx + 1, moveMode: 'insert', swapSpotIdx: 0 });
    setIsModalOpen(true);
  };

  const saveModal = (e) => {
    e.preventDefault();
    const newItinerary = [...itinerary];
    const { dayIdx, spotIdx, data } = editData;

    // 基於所選標籤類型，為其套上對應的 emoji 首碼
    const matchedTag = SPOT_TAGS.find(t => t.type === data.tagType);
    if (matchedTag && data.tagType !== 'custom') {
      data.tagName = matchedTag.name;
    }

    // 搬移到其他天：直接插入或與對方指定行程交換
    const targetIdx = (editData.targetDay || dayIdx + 1) - 1;
    if (targetIdx !== dayIdx && newItinerary[targetIdx]) {
      const sourceSpots = [...(newItinerary[dayIdx].spots || [])];
      const targetSpots = [...(newItinerary[targetIdx].spots || [])];
      if (spotIdx !== -1) sourceSpots.splice(spotIdx, 1);

      let successMsg;
      if (spotIdx !== -1 && editData.moveMode === 'swap' && targetSpots.length > 0) {
        const swapIdx = Math.min(Number(editData.swapSpotIdx) || 0, targetSpots.length - 1);
        const [swapped] = targetSpots.splice(swapIdx, 1, data);
        sourceSpots.push(swapped);
        successMsg = `已將「${data.name}」與 Day ${targetIdx + 1} 的「${swapped.name}」交換汪！`;
      } else {
        targetSpots.push(data);
        successMsg = spotIdx === -1
          ? `已將新行程加入 Day ${targetIdx + 1} 汪！`
          : `已將「${data.name}」搬移至 Day ${targetIdx + 1} 汪！`;
      }

      sourceSpots.sort((a, b) => a.time.localeCompare(b.time));
      targetSpots.sort((a, b) => a.time.localeCompare(b.time));
      newItinerary[dayIdx] = { ...newItinerary[dayIdx], spots: sourceSpots };
      newItinerary[targetIdx] = { ...newItinerary[targetIdx], spots: targetSpots };
      setItinerary(newItinerary);
      setIsModalOpen(false);
      if (!notifyFlowWarnings([newItinerary[dayIdx], newItinerary[targetIdx]])) showToast(successMsg);
      return;
    }

    let successMsg;
    if (spotIdx === -1) {
      // 新增景點
      newItinerary[dayIdx].spots.push(data);
      successMsg = "成功加入全新日程！";
    } else {
      // 編輯既有景點
      newItinerary[dayIdx].spots[spotIdx] = data;
      successMsg = "日程更新成功！";
    }

    // 依據時間順序自動重新排序
    newItinerary[dayIdx].spots.sort((a, b) => a.time.localeCompare(b.time));
    setItinerary(newItinerary);
    setIsModalOpen(false);
    if (!notifyFlowWarnings([newItinerary[dayIdx]])) showToast(successMsg);
  };

  const deleteSpot = () => {
    const { dayIdx, spotIdx } = editData;
    if (spotIdx === -1) return;
    const newItinerary = [...itinerary];
    newItinerary[dayIdx].spots.splice(spotIdx, 1);
    setItinerary(newItinerary);
    setIsModalOpen(false);
    showToast("景點已被移除汪！", "warning");
  };

  // --- 天數 Modal 處理邏輯 ---
  const openDayModal = (day) => {
    setEditDayData({
      dayNum: day.dayNum,
      title: day.title || "",
      path: day.path || "",
      companion: day.companion || "單人獨旅",
      area: day.area || ""
    });
    setIsDayModalOpen(true);
  };

  const saveDayModal = (e) => {
    e.preventDefault();
    const newItinerary = itinerary.map(day => {
      if (day.dayNum === editDayData.dayNum) {
        return {
          ...day,
          title: editDayData.title,
          path: editDayData.path,
          companion: editDayData.companion,
          area: editDayData.area
        };
      }
      return day;
    });
    setItinerary(newItinerary);
    setIsDayModalOpen(false);
    showToast(`Day ${editDayData.dayNum} 主題已更新！`);
  };

  const addNewDay = () => {
    const nextDayNum = itinerary.length + 1;
    const newDay = {
      dayNum: nextDayNum,
      title: "",
      companion: "",
      path: "",
      spots: []
    };
    setItinerary([...itinerary, newDay]);
    setActiveDay(nextDayNum);
    showToast(`成功建立第 ${nextDayNum} 天空白行程汪！可手動編輯，或點「由小柴安排」讓 AI 自動規劃！`);
  };

  const deleteCurrentDay = () => {
    if (itinerary.length <= 1) {
      showToast("最少要保留一天行程唷！", "warning");
      return;
    }
    const filtered = itinerary.filter(day => day.dayNum !== activeDay);
    // 重新排序 Day 數字
    const updated = filtered.map((day, idx) => ({
      ...day,
      dayNum: idx + 1
    }));
    setItinerary(updated);
    setActiveDay(1);
    showToast("成功刪除此日程天數汪！");
  };

  // --- 天數管理：批次刪除 / 交換位置 / 任意位置插入 ---
  const renumberDays = (days) => days.map((day, idx) => ({ ...day, dayNum: idx + 1 }));

  const toggleDaySelected = (dayNum) => {
    setSelectedDayNums(prev => prev.includes(dayNum) ? prev.filter(n => n !== dayNum) : [...prev, dayNum]);
  };

  const batchDeleteDays = () => {
    if (selectedDayNums.length === 0) {
      showToast("請先勾選要刪除的天數汪！", "warning");
      return;
    }
    if (selectedDayNums.length >= itinerary.length) {
      showToast("最少要保留一天行程唷！", "warning");
      return;
    }
    const hasContent = itinerary.some(day => selectedDayNums.includes(day.dayNum) && ((day.spots && day.spots.length > 0) || day.title));
    if (hasContent && !window.confirm(`勾選的天數中含有行程內容，確定要刪除這 ${selectedDayNums.length} 天嗎？`)) return;
    const count = selectedDayNums.length;
    setItinerary(renumberDays(itinerary.filter(day => !selectedDayNums.includes(day.dayNum))));
    setSelectedDayNums([]);
    setActiveDay(1);
    showToast(`已刪除 ${count} 天，後續日期與住宿已重新對應汪！`);
  };

  const moveDay = (dayNum, dir) => {
    const idx = dayNum - 1;
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= itinerary.length) return;
    const arr = [...itinerary];
    [arr[idx], arr[targetIdx]] = [arr[targetIdx], arr[idx]];
    setItinerary(renumberDays(arr));
    setSelectedDayNums([]);
    if (activeDay === dayNum) setActiveDay(targetIdx + 1);
    else if (activeDay === targetIdx + 1) setActiveDay(dayNum);
    showToast(`Day ${dayNum} 已與 Day ${targetIdx + 1} 交換位置，日期與住宿已重新對應汪！`);
  };

  const insertDayAt = (idx) => {
    const arr = [...itinerary];
    arr.splice(idx, 0, { dayNum: 0, title: "", companion: "", path: "", spots: [] });
    setItinerary(renumberDays(arr));
    setSelectedDayNums([]);
    setActiveDay(idx + 1);
    showToast(`已在 Day ${idx + 1} 插入空白的一天，後面的日期自動順延汪！`);
  };

  // --- 行程順暢度檢查（時間重疊 / 間隔小於交通預估） ---
  const timeToMinutes = (t) => {
    const [h, m] = String(t || '00:00').split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const getFlowWarnings = (dayData) => {
    const warnings = [];
    const spots = (dayData && dayData.spots) || [];
    for (let i = 0; i < spots.length - 1; i++) {
      const cur = spots[i];
      const next = spots[i + 1];
      const gap = timeToMinutes(next.time) - timeToMinutes(cur.time);
      const transit = getTransitMinutes(cur);
      if (gap <= 0) {
        warnings.push(`「${cur.name}」與「${next.name}」時間重疊（${cur.time}）`);
      } else if (gap < transit) {
        warnings.push(`「${cur.name}」➔「${next.name}」僅間隔 ${gap} 分鐘，低於交通預估 ${transit} 分鐘`);
      }
    }
    return warnings;
  };

  // 回傳是否有提示（有提示時以警告吐司顯示，取代成功訊息）
  const notifyFlowWarnings = (days) => {
    const all = [];
    days.forEach(dayData => {
      if (!dayData) return;
      getFlowWarnings(dayData).forEach(w => all.push(`Day ${dayData.dayNum} ${w}`));
    });
    if (all.length > 0) {
      showToast(`⚠️ 順暢度提醒：${all.slice(0, 2).join('；')}${all.length > 2 ? `⋯等 ${all.length} 項` : ''}`, "warning");
      return true;
    }
    return false;
  };

  // --- 行李與備忘清單處理 ---
  const togglePackingItem = (id) => {
    setPackingList(packingList.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const addPackingItem = (e) => {
    e.preventDefault();
    if (!newPackingText.trim()) return;
    setPackingList([...packingList, { id: Date.now(), text: newPackingText.trim(), checked: false }]);
    setNewPackingText('');
  };

  const deletePackingItem = (id) => {
    setPackingList(packingList.filter(item => item.id !== id));
  };

  // --- 列印網頁 ---
  const handlePrint = () => {
    window.print();
  };

  const currentDayData = itinerary.find(day => day.dayNum === activeDay) || itinerary[0];

  // 景點 Modal「搬移目的天」的行程清單（供交換選項使用）
  const moveTargetSpots = editData
    ? ((itinerary[(editData.targetDay || editData.dayIdx + 1) - 1] || {}).spots || [])
    : [];


  return (
    <div className="min-h-screen text-[#33302B] font-sans selection:bg-[#EEDBC5]">

      {/* 開場柴犬 Logo 動畫 */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-[100] bg-[#F6F3EA] flex items-center justify-center transition-opacity duration-700 print:hidden ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={dismissIntro}
        >
          <video
            src="/intro/shiba-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={dismissIntro}
            onError={dismissIntro}
            className="w-full max-w-lg px-6 select-none"
          />
          <button
            onClick={dismissIntro}
            className="absolute bottom-8 right-6 px-4 py-1.5 bg-white/70 border border-[#DCCFB4] text-[#85796B] hover:text-[#C75A51] hover:border-[#C75A51] rounded-full text-[11px] font-bold transition-all backdrop-blur-sm"
          >
            跳過 ▸
          </button>
        </div>
      )}

      {/* 懸浮回頂按鈕 */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top fixed bottom-24 right-5 z-50 w-11 h-11 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-[#FBF4E6] rounded-full shadow-lg flex flex-col items-center justify-center print:hidden"
          title="回到最上方"
          aria-label="回到最上方"
        >
          <span className="text-sm leading-none">▲</span>
          <span className="text-[9px] font-black leading-none mt-0.5">頂</span>
        </button>
      )}

      {/* 頂部和紙 Navigation Header：圓相墨圈柴犬 + 朱印章名 */}
      <header className="border-b-2 border-[#DCCFB4] bg-[#FEFCF5]/90 backdrop-blur-sm sticky top-0 z-40 print:hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('welcome')}>
            <span className="relative flex items-center justify-center w-11 h-11">
              {/* 圓相 enso 墨圈 */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-80 group-hover:rotate-[360deg] transition-transform duration-[1.2s] ease-in-out">
                <path d="M 50 8 A 42 42 0 1 0 80 20" fill="none" stroke="#3D362E" strokeWidth="7" strokeLinecap="round" />
              </svg>
              <ShibaInk className="w-7 h-7" />
            </span>
            <div>
              <h1 className="text-xl font-black text-[#4D4137] tracking-wide flex items-center gap-2">
                OriTour
                <span className="text-[10px] px-1.5 py-1 bg-[#C75A51] text-[#FBF4E6] rounded-md leading-none tracking-widest shadow-sm rotate-2" style={{ writingMode: 'initial' }}>
                  和風規劃師
                </span>
              </h1>
              <p className="text-xs text-[#85796B] font-medium flex items-center gap-1">
                <span>隨身助理「小柴」陪伴</span> • <span className="text-[#3B6C57]">本地自動存檔中</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            <button 
              onClick={() => setIsSyncModalOpen(true)}
              className="p-2 border border-[#EADEC6] bg-[#FAF8F5] rounded-xl text-[#593E30] hover:bg-[#F3EFE9] transition-all flex items-center gap-1 text-xs font-bold"
              title="雲端備份與分享設定"
            >
              <span>☁️</span>
              <span>雲端同步</span>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 border border-[#EADEC6] bg-[#FAF8F5] rounded-xl text-[#593E30] hover:bg-[#F3EFE9] transition-all flex items-center gap-1 text-xs font-bold"
              title="設定 API Key"
            >
              <Settings size={14} />
              <span>AI 設定</span>
            </button>
            <button 
              onClick={handlePrint}
              className="px-3 py-2 bg-[#593E30] hover:bg-[#463125] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer size={14} />
              <span>列印行程</span>
            </button>
            <button 
              onClick={() => { setView(view === 'welcome' ? 'planner' : 'welcome') }}
              className="px-3.5 py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-bold transition-all"
            >
              {view === 'welcome' ? '進入規劃板 ➔' : '返回首頁'}
            </button>
          </div>
        </div>
      </header>

      {/* 共享視圖橫幅 Banner */}
      {isSharedView && (
        <div className="bg-[#FAF2EB] border-b border-[#ECD9C9] text-[#C75A51] px-4 py-3 text-xs font-bold flex flex-col sm:flex-row justify-between items-center gap-2.5 shadow-sm sticky top-[73px] z-30 animate-pulse print:hidden">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>🐕</span>
            <span>您目前正在檢視他人分享的日本行程範本 (ID: {shareId})。如果您想修改並保存到自己的雲端，請點擊右側的複製按鈕！</span>
          </div>
          <button 
            onClick={cloneAsOwn}
            className="px-4 py-1.5 bg-[#C75A51] text-white rounded-lg hover:bg-[#B34D44] transition-all active:scale-95 shadow-sm font-extrabold flex items-center gap-1 whitespace-nowrap"
          >
            <span>✨</span> 複製為個人行程
          </button>
        </div>
      )}

      {/* 訊息通知吐司條 (Toast)：朱印蓋章進場 */}
      {toast && (
        <div className={`stamp-in fixed bottom-6 right-6 z-50 max-w-sm px-5 py-3 rounded-[18px_22px_16px_24px] shadow-xl border-2 text-xs font-bold flex items-center gap-2.5 bg-[#FEFCF5] print:hidden ${
          toast.type === 'warning'
            ? 'text-[#9A6B2F] border-[#D9B36C]'
            : 'text-[#3B6C57] border-[#9DBBA9]'
        }`}>
          <span className="flex items-center gap-0.5 flex-shrink-0">
            <ShibaInk className="w-7 h-7" />
            {toast.type === 'warning' && <span className="text-sm">💦</span>}
          </span>
          <span className="leading-relaxed">{toast.msg}</span>
        </div>
      )}

      {/* ==========================================
          首頁/歡迎頁面
          ========================================== */}
      {view === 'welcome' && (
        <div className="min-h-[calc(screen-80px)] max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 print:hidden">
          
          {/* 左側精緻歡迎內容 */}
          <div className="max-w-xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF2EB] border border-[#ECD9C9] text-[#C75A51] rounded-full text-xs font-bold">
              <Sparkles size={14} /> 新增 3 大精美範本，點擊即時暢玩！
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#4D4137] leading-tight">
              打造您靈魂深處的 <br />
              <span className="text-[#C75A51] brush-underline inline-block">
                小眾日本私房旅行
              </span>
            </h2>
            <p className="text-[#6D5D55] leading-relaxed text-sm md:text-base">
              您好汪！我是小柴導遊！這裡不止是一張普通的行程清單。我們將最純粹的「時間軸控制」、「日圓預算分析」、「即時匯率換算」與「地圖直達連結」集於一身。
              更棒的是，您可以向我直接發出指示，讓我幫你修改整個日程！
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <button 
                onClick={() => setView('planner')}
                className="px-8 py-3.5 bg-[#C75A51] text-white rounded-xl font-bold shadow-md hover:bg-[#B34D44] hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm"
              >
                直接進入個人工作區
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="px-5 py-3.5 bg-white border-2 border-[#EADEC6] text-[#593E30] font-bold rounded-xl hover:bg-[#FAF8F5] transition-all text-sm"
              >
                串接個人 Gemini API
              </button>
            </div>

            {/* 一鍵切換熱門範本 */}
            <div className="pt-6 border-t border-[#EADEC6]">
              <h4 className="text-xs font-bold text-[#8C7D73] uppercase tracking-wider mb-3">或者... 從達人精選推薦開始玩起：</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={() => handleLoadPreset('tokyo')}
                  className="p-3 text-left bg-white border border-[#EADEC6] rounded-xl hover:border-[#C75A51] hover:shadow-xs transition-all group"
                >
                  <p className="text-xs font-bold text-[#C75A51] mb-1">🗼 東京・文青與美學</p>
                  <p className="text-[10px] text-[#8C7D73] group-hover:text-[#593E30] transition-colors">尋找銀座美妝、原宿手作旗艦店與小眾香氛。</p>
                </button>
                <button 
                  onClick={() => handleLoadPreset('kyoto')}
                  className="p-3 text-left bg-white border border-[#EADEC6] rounded-xl hover:border-[#C75A51] hover:shadow-xs transition-all group"
                >
                  <p className="text-xs font-bold text-[#3B6C57] mb-1">⛩️ 京都・古都石疊</p>
                  <p className="text-[10px] text-[#8C7D73] group-hover:text-[#593E30] transition-colors">漫步清晨無人清水寺、石疊街道與葛切名店。</p>
                </button>
                <button 
                  onClick={() => handleLoadPreset('osaka')}
                  className="p-3 text-left bg-white border border-[#EADEC6] rounded-xl hover:border-[#C75A51] hover:shadow-xs transition-all group"
                >
                  <p className="text-xs font-bold text-amber-700 mb-1">🐙 大阪・舌尖狂熱</p>
                  <p className="text-[10px] text-[#8C7D73] group-hover:text-[#593E30] transition-colors">大啖黑門市場生鮮、固力果合影與免稅掃貨。</p>
                </button>
              </div>
            </div>
          </div>

          {/* 右側：吉祥物與亮點介紹卡片 */}
          <div className="w-full lg:w-96 flex flex-col gap-4">
            <div className="washi-card p-6 text-center space-y-4">
              <img src="/illustrations/torii.png" alt="" aria-hidden="true" className="sticker w-20 -bottom-6 -left-4 -rotate-6 float-soft" />
              <span className="relative inline-flex items-center justify-center w-32 h-32">
                {/* 圓相 enso 墨圈環繞小柴 */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-75">
                  <path d="M 50 5 A 45 45 0 1 0 83 17" fill="none" stroke="#3D362E" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
                <ShibaInk className="w-[5.5rem] h-[5.5rem] float-soft" />
              </span>
              <h3 className="font-bold text-lg text-[#4D4137]">我是導遊小柴（Shiba）</h3>
              <p className="text-xs text-[#8C7D73] leading-relaxed">
                我會用心打理你旅程中的所有開銷。無論你想吃好吃的炸豬排，還是想去古意盎然的茶屋，只要告訴我，保證為你使命必達！汪！
              </p>
              <div className="bg-white/70 p-3 rounded-lg border border-[#EADEC6] text-[10px] text-[#593E30] flex items-center justify-between">
                <span>⚡ 離線智慧對話引擎</span>
                <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded font-bold">已就緒</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==========================================
          主規劃板頁面
          ========================================== */}
      {view === 'planner' && (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 print:hidden">
          
          {/* 行程總攬 Banner 卡片 */}
          <div className="washi-card ink-wash p-6 mb-8 space-y-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#C75A51] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full inline-block">
                  🇯🇵 專屬客製化旅行手冊
                </span>
                <h2 className="text-2xl font-black text-[#593E30]">{destination ? `日本・${destination} 自主行完美規劃` : '日本自主行完美規劃'}</h2>
                <p className="text-xs text-[#8C7D73]">
                  全體共 {itinerary.length} 日精彩行程 • 全程估計<strong>總預算</strong>為 <span className="font-extrabold text-[#C75A51] text-sm">¥{getGrandTotalCost().toLocaleString()}</span> 日圓
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={addNewDay}
                  className="px-4 py-2 bg-[#3B6C57] hover:bg-[#2D5343] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus size={14} /> 新增天數 (Day {itinerary.length + 1})
                </button>
                <button
                  onClick={deleteCurrentDay}
                  className="px-4 py-2 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  title="刪除當前天數行程"
                >
                  <Trash2 size={14} /> 刪除當天
                </button>
              </div>
            </div>

            {/* 出國流程追蹤：機票 ➔ 住宿 ➔ 偏好交通 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => jumpToRef(flightPanelRef)}
                title="點擊前往航班設定"
                className={`p-3 rounded-xl border-2 bg-white/70 cursor-pointer hover:border-[#C75A51] transition-all ${departureTime && returnTime ? 'border-[#D5E6DF]' : 'border-dashed border-[#EADEC6]'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#8C7D73]">STEP 1 • 機票時間</span>
                  <span className="text-xs">{departureTime && returnTime ? '✅' : '⬜'}</span>
                </div>
                <p className="text-[11px] font-bold text-[#593E30] leading-relaxed">
                  ✈️ 出發：{departureTime ? new Date(departureTime).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : <span className="text-[#C75A51]">尚未設定</span>}
                  {flightInfo.depFlightNo && <span className="text-[#8C7D73]"> {flightInfo.depFlightNo}</span>}
                  <br />
                  🛬 回國：{returnTime ? new Date(returnTime).toLocaleString('zh-TW', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : <span className="text-[#C75A51]">尚未設定</span>}
                  {flightInfo.retFlightNo && <span className="text-[#8C7D73]"> {flightInfo.retFlightNo}</span>}
                </p>
              </div>
              <div
                onClick={() => jumpToRef(lodgingPanelRef)}
                title="點擊前往住宿設定"
                className={`p-3 rounded-xl border-2 bg-white/70 cursor-pointer hover:border-[#C75A51] transition-all ${lodgings.length > 0 ? 'border-[#D5E6DF]' : 'border-dashed border-[#EADEC6]'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#8C7D73]">STEP 2 • 住宿時間</span>
                  <span className="text-xs">{lodgings.length > 0 ? '✅' : '⬜'}</span>
                </div>
                <p className="text-[11px] font-bold text-[#593E30] leading-relaxed">
                  🏨 已登記 {lodgings.length} 筆住宿
                  {lodgings.length > 0
                    ? <><br />{lodgings[0].name}（{lodgings[0].checkIn} 入住）{lodgings.length > 1 ? ` 等 ${lodgings.length} 間` : ''}</>
                    : <><br /><span className="text-[#C75A51]">點擊前往「出國基本資訊」新增</span></>}
                </p>
              </div>
              <div
                onClick={() => jumpToRef(lodgingPanelRef)}
                title="點擊前往偏好交通設定"
                className="p-3 rounded-xl border-2 border-[#D5E6DF] bg-white/70 cursor-pointer hover:border-[#C75A51] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#8C7D73]">STEP 3 • 偏好交通</span>
                  <span className="text-xs">✅</span>
                </div>
                <p className="text-[11px] font-bold text-[#593E30] leading-relaxed">
                  {(TRANSPORT_MODES.find(m => m.key === transportPref) || TRANSPORT_MODES[0]).label}
                  <br />
                  <span className="text-[#8C7D73] font-medium">景點間交通將以此推估時間</span>
                </p>
              </div>
            </div>

            {/* 分天行程總覽表：時間 / 景點 / 住宿 / 交通 / 花費 */}
            <div className="bg-white/80 border border-[#EADEC6] rounded-xl overflow-x-auto">
              <table className="w-full text-left text-[11px] min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#EADEC6] text-[10px] text-[#8C7D73] font-black">
                    <th className="px-3 py-2">天數</th>
                    <th className="px-3 py-2">日期</th>
                    <th className="px-3 py-2">主題</th>
                    <th className="px-3 py-2">活動時間</th>
                    <th className="px-3 py-2">景點</th>
                    <th className="px-3 py-2">住宿</th>
                    <th className="px-3 py-2">交通預估</th>
                    <th className="px-3 py-2 text-right">當日花費</th>
                  </tr>
                </thead>
                <tbody>
                  {itinerary.map(day => {
                    const dayDate = getDayDate(day.dayNum);
                    const lodging = getLodgingForDay(day.dayNum);
                    const spots = day.spots || [];
                    const timeRange = spots.length > 0 ? `${spots[0].time} ~ ${spots[spots.length - 1].time}` : '—';
                    const transitMin = getDailyTransitMinutes(day);
                    return (
                      <tr
                        key={day.dayNum}
                        onClick={() => jumpToDay(day.dayNum)}
                        title={`點擊跳轉至 Day ${day.dayNum} 行程`}
                        className={`border-b border-[#F3EFE9] last:border-0 cursor-pointer transition-all ${activeDay === day.dayNum ? 'bg-[#FCF5F3]' : 'hover:bg-[#FAF8F5]'}`}
                      >
                        <td className="px-3 py-2 font-black text-[#C75A51] whitespace-nowrap">Day {day.dayNum}</td>
                        <td className="px-3 py-2 text-[#8C7D73] whitespace-nowrap">{dayDate ? dayDate.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', weekday: 'short' }) : '—'}</td>
                        <td className="px-3 py-2 font-bold text-[#593E30] max-w-[160px] truncate">{day.title}</td>
                        <td className="px-3 py-2 text-[#6D5D55] whitespace-nowrap">{timeRange}</td>
                        <td className="px-3 py-2 text-[#6D5D55] whitespace-nowrap">{spots.length} 個</td>
                        <td className="px-3 py-2 text-[#6D5D55] max-w-[120px] truncate">{lodging ? `🏨 ${lodging.name}` : '—'}</td>
                        <td className="px-3 py-2 text-[#3B6C57] font-bold whitespace-nowrap">{transitMin > 0 ? `🚃 約 ${formatMinutes(transitMin)}` : '—'}</td>
                        <td className="px-3 py-2 text-right font-black text-[#593E30] whitespace-nowrap">¥{getDailyTotalCost(day).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 左側：AI 小柴對話 與 旅人輔助工具箱 */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* AI 規劃助理小柴對話窗 */}
              <div className="washi-card shadow-xs flex flex-col h-[480px]">
                <div className="bg-[#FAF8F5] px-4 py-3 flex items-center justify-between border-b border-[#EADEC6] rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <ShibaInk className="w-6 h-6" />
                    <h4 className="text-xs font-black text-[#593E30]">小柴導遊 (離線智慧 AI)</h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#3B6C57] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span> 隨侍在側
                  </span>
                </div>
                
                {/* 對話歷史紀錄 */}
                <div ref={chatHistoryRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user' 
                          ? 'bg-[#C75A51] text-white rounded-tr-none shadow-xs' 
                          : 'bg-[#FAF8F5] text-[#2C2421] border border-[#EADEC6] rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  {isAiLoading && (
                    <div className="flex items-center gap-2 text-xs text-[#8C7D73] font-medium animate-pulse">
                      <span className="animate-spin">🌀</span> 小柴正翻箱倒櫃計算中...汪！
                    </div>
                  )}
                </div>

                {/* 智慧一鍵快選提示指令 */}
                <div className="p-2 border-t border-[#EADEC6] flex overflow-x-auto flex-nowrap gap-1 bg-[#FAF8F5] scrollbar-none">
                  <button 
                    onClick={() => executeAiQuery('🍰 推薦在下午 15:00 左右加入好吃的在地人氣甜點店汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all flex-shrink-0 whitespace-nowrap"
                  >
                    🍰 加甜點
                  </button>
                  <button 
                    onClick={() => executeAiQuery('☕ 好想在午後找間質感咖啡廳歇歇腳汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all flex-shrink-0 whitespace-nowrap"
                  >
                    ☕ 找咖啡館
                  </button>
                  <button 
                    onClick={() => executeAiQuery('🛍️ 幫我安插一個松本清藥妝購物行程吧汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all flex-shrink-0 whitespace-nowrap"
                  >
                    🛍️ 免稅藥妝
                  </button>
                  <button 
                    onClick={() => executeAiQuery('💸 請幫我降低現有景點不必要的高預算，改走省錢平替汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all flex-shrink-0 whitespace-nowrap"
                  >
                    💸 降低預算
                  </button>
                </div>
                
                {/* 發送輸入框 */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); if (chatInput.trim()) { executeAiQuery(chatInput); setChatInput(''); } }} 
                  className="border-t border-[#EADEC6] p-2.5 flex gap-2"
                >
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="對小柴輸入指引... (例: 幫我加入藥妝店)" 
                    className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#EADEC6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C75A51] text-[#2C2421]"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#C75A51] text-white p-2.5 rounded-xl hover:bg-[#B34D44] transition-all active:scale-95"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

              {/* 實用工具箱 1：預算分析條 */}
              <div className="washi-card p-5 space-y-4 shadow-xs">
                <div className="border-b border-[#FAF8F5] pb-2">
                  <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                    <DollarSign size={14} className="text-[#C75A51]" />
                    <span>分類支出比例</span>
                  </h4>
                  <p className="text-[10px] text-[#8C7D73]">不含大筆機票交通之日圓預估</p>
                </div>

                <div className="space-y-3 text-xs">
                  {Object.entries(getCategoryStats()).map(([key, val]) => {
                    const tagObj = SPOT_TAGS.find(t => t.type === key) || { name: "✨ 其他備註" };
                    const grandTotal = getGrandTotalCost() || 1;
                    const percent = Math.round((val / grandTotal) * 100);
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between font-bold text-[10px]">
                          <span className="text-[#593E30]">{tagObj.name}</span>
                          <span className="text-[#8C7D73]">¥{val.toLocaleString()} ({percent}%)</span>
                        </div>
                        <div className="w-full bg-[#FAF8F5] h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#C75A51] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${percent}%`, backgroundColor: key === 'sightseeing' ? '#3B6C57' : key === 'food' ? '#E19C6A' : key === 'shopping' ? '#C75A51' : key === 'hotel' ? '#593E30' : '#8C7D73' }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 實用工具箱 2：日幣快速算盤 */}
              <div className="washi-card p-5 space-y-3 shadow-xs">
                <img src="/illustrations/exchange.png" alt="" aria-hidden="true" className="sticker w-14 -top-4 -right-2 -rotate-3" />
                <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                  <RefreshCw size={14} className="text-[#3B6C57]" />
                  <span>台幣 ⇄ 日圓 雙向換算（匯率 {exchangeRate.twd}）</span>
                </h4>
                <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                  <div>
                    <label className="text-[10px] text-[#8C7D73] font-bold block mb-1">台幣 (TWD)</label>
                    <input
                      type="number"
                      value={twdInput}
                      onChange={e => handleTwdChange(e.target.value)}
                      placeholder="輸入台幣"
                      className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs font-extrabold text-[#593E30] focus:outline-none focus:border-[#C75A51]"
                    />
                  </div>
                  <span className="text-[#8C7D73] font-black text-sm pb-1.5">⇄</span>
                  <div>
                    <label className="text-[10px] text-[#8C7D73] font-bold block mb-1">日圓 (JPY)</label>
                    <input
                      type="number"
                      value={jpyOutput}
                      onChange={e => handleJpyChange(e.target.value)}
                      placeholder="輸入日圓"
                      className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs font-extrabold text-[#593E30] focus:outline-none focus:border-[#C75A51]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-[#8C7D73]">💡 任一邊輸入金額，另一邊即時換算。</p>
              </div>

              {/* 實用工具箱 3：行李必備清單 */}
              <div className="washi-card p-5 space-y-3 shadow-xs">
                <img src="/illustrations/suitcase.png" alt="" aria-hidden="true" className="sticker w-14 -top-4 -right-2 rotate-6" />
                <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#3B6C57]" />
                  <span>行李出發檢查點</span>
                </h4>
                
                <form onSubmit={addPackingItem} className="flex gap-1.5">
                  <input 
                    type="text" 
                    value={newPackingText}
                    onChange={e => setNewPackingText(e.target.value)}
                    placeholder="新增私人物品..." 
                    className="flex-1 text-[11px] px-2.5 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                  />
                  <button type="submit" className="bg-[#593E30] text-white px-2.5 rounded-lg text-xs font-bold">+</button>
                </form>

                <div className="space-y-2 pt-1 max-h-[180px] overflow-y-auto">
                  {packingList.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-1 text-[11px]">
                      <label className="flex items-center gap-2 cursor-pointer text-[#6D5D55]">
                        <input 
                          type="checkbox" 
                          checked={item.checked} 
                          onChange={() => togglePackingItem(item.id)}
                          className="rounded text-[#3B6C57] focus:ring-[#3B6C57]" 
                        />
                        <span className={item.checked ? 'line-through text-[#BFB8B2]' : 'font-semibold'}>{item.text}</span>
                      </label>
                      <button onClick={() => deletePackingItem(item.id)} className="text-red-400 hover:text-red-600 p-0.5">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 實用工具箱 4：機票出發提醒 */}
              <div ref={flightPanelRef} className="washi-card p-5 space-y-3 shadow-xs scroll-mt-28">
                <img src="/illustrations/airplane.png" alt="" aria-hidden="true" className="sticker w-16 -top-5 -right-3 -rotate-6" />
                <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                  <Clock size={14} className="text-[#C75A51]" />
                  <span>✈️ 航班提醒與行事曆</span>
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <button 
                      onClick={() => setIsTicketModalOpen(true)}
                      className="w-full py-2 bg-[#593E30] text-white rounded-lg text-[10px] font-bold hover:bg-[#463125] transition-all"
                    >
                      貼上機票文字自動解析
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#8C7D73] font-bold block">✈️ 出發時間（去程）：</label>
                    <input
                      type="datetime-local"
                      value={departureTime}
                      onChange={e => setDepartureTime(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none text-[#593E30] font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#8C7D73] font-bold block">🛬 回國時間（回程）：</label>
                    <input
                      type="datetime-local"
                      value={returnTime}
                      onChange={e => setReturnTime(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none text-[#593E30] font-bold"
                    />
                  </div>

                  {/* 航班代號與起降機場 */}
                  <div className="space-y-1.5 pt-2 border-t border-dashed border-[#EADEC6]">
                    <label className="text-[10px] text-[#8C7D73] font-bold block">🎫 航班代號與起降機場（貼機票可自動填入）：</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <input
                        type="text"
                        value={flightInfo.depFlightNo}
                        onChange={e => setFlightInfo({ ...flightInfo, depFlightNo: e.target.value.toUpperCase() })}
                        placeholder="去程 BR198"
                        className="text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none font-bold text-[#593E30]"
                      />
                      <input
                        type="text"
                        value={flightInfo.depFrom}
                        onChange={e => setFlightInfo({ ...flightInfo, depFrom: e.target.value })}
                        placeholder="起飛 TPE"
                        className="text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                      />
                      <input
                        type="text"
                        value={flightInfo.depTo}
                        onChange={e => setFlightInfo({ ...flightInfo, depTo: e.target.value })}
                        placeholder="降落 NRT"
                        className="text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <input
                        type="text"
                        value={flightInfo.retFlightNo}
                        onChange={e => setFlightInfo({ ...flightInfo, retFlightNo: e.target.value.toUpperCase() })}
                        placeholder="回程 BR197"
                        className="text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none font-bold text-[#593E30]"
                      />
                      <input
                        type="text"
                        value={flightInfo.retFrom}
                        onChange={e => setFlightInfo({ ...flightInfo, retFrom: e.target.value })}
                        placeholder="起飛 NRT"
                        className="text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                      />
                      <input
                        type="text"
                        value={flightInfo.retTo}
                        onChange={e => setFlightInfo({ ...flightInfo, retTo: e.target.value })}
                        placeholder="降落 TPE"
                        className="text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                      />
                    </div>

                    {/* 航班動態查詢 */}
                    {(flightInfo.depFlightNo || flightInfo.retFlightNo) && (
                      <div className="flex flex-wrap gap-1.5">
                        {flightInfo.depFlightNo && (
                          <a
                            href={getFlightStatusUrl(flightInfo.depFlightNo)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-all"
                          >
                            🔍 {flightInfo.depFlightNo} 即時動態
                          </a>
                        )}
                        {flightInfo.retFlightNo && (
                          <a
                            href={getFlightStatusUrl(flightInfo.retFlightNo)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-all"
                          >
                            🔍 {flightInfo.retFlightNo} 即時動態
                          </a>
                        )}
                      </div>
                    )}

                    {/* AI 機場報到指南 */}
                    <button
                      onClick={handleFlightGuide}
                      disabled={!apiKey || isGuideLoading}
                      title={!apiKey ? '需先設定 Gemini API Key' : '生成報到櫃台 / 關櫃時間 / 登機門指南'}
                      className="w-full py-2 bg-[#3B6C57] hover:bg-[#2D5343] text-white rounded-lg text-[10px] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isGuideLoading ? '🌀 小柴查詢中...汪！' : '🤖 AI 機場報到指南（櫃台 / 關櫃 / 登機門）'}
                    </button>

                    {flightGuide && (
                      <div className="relative text-[10px] text-[#593E30] bg-[#F1F6F3] border border-[#D5E6DF] rounded-lg p-2.5 leading-relaxed whitespace-pre-line">
                        <button
                          onClick={() => setFlightGuide('')}
                          className="absolute top-1.5 right-1.5 text-[#8C7D73] hover:text-[#C75A51]"
                        >
                          <X size={11} />
                        </button>
                        <p className="font-black mb-1">🛂 機場報到指南（登機門以現場公告為準）：</p>
                        {flightGuide}
                      </div>
                    )}
                  </div>

                  {departureTime && (
                    <div className="text-[10px] text-[#3B6C57] font-semibold bg-green-50 p-2 rounded-lg leading-relaxed border border-green-100">
                      💡 系統將在 <strong>{new Date(new Date(departureTime).getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()} (出發前一天)</strong> 提醒您檢查行李。
                    </div>
                  )}

                  {departureTime && returnTime && !isNaN(new Date(departureTime).getTime()) && !isNaN(new Date(returnTime).getTime()) && (
                    <div className="text-[10px] text-blue-700 font-semibold bg-blue-50 p-2 rounded-lg leading-relaxed border border-blue-100">
                      ✈️ 本次旅程共 <strong>{Math.round((new Date(new Date(returnTime).getFullYear(), new Date(returnTime).getMonth(), new Date(returnTime).getDate()).getTime() - new Date(new Date(departureTime).getFullYear(), new Date(departureTime).getMonth(), new Date(departureTime).getDate()).getTime()) / 86400000) + 1}</strong> 天，Day 分頁會自動同步（只補空白天、不刪有內容的天）。
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={downloadIcsFile}
                      className="py-1.5 bg-white border border-[#EADEC6] text-[#593E30] rounded-lg text-[10px] font-bold hover:bg-[#FAF8F5] transition-all flex items-center justify-center gap-1"
                    >
                      📅 匯出日曆 (.ics)
                    </button>
                    <button
                      onClick={requestNotificationPermission}
                      className={`py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                        notificationPermission === 'granted'
                          ? 'bg-[#F1F6F3] border border-[#D5E6DF] text-[#3B6C57]'
                          : 'bg-white border border-[#EADEC6] text-[#593E30] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      🔔 {notificationPermission === 'granted' ? '網頁提醒已開' : '開啟網頁提醒'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 實用工具箱 5：出國基本資訊（住宿 & 偏好交通） */}
              <div ref={lodgingPanelRef} className="washi-card p-5 space-y-4 shadow-xs scroll-mt-28">
                <img src="/illustrations/train.png" alt="" aria-hidden="true" className="sticker w-16 -top-5 -right-3 rotate-3" />
                <img src="/illustrations/onsen-saru.png" alt="" aria-hidden="true" className="sticker w-14 -bottom-5 -left-3 -rotate-6" />
                <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                  <Compass size={14} className="text-[#3B6C57]" />
                  <span>🧭 出國基本資訊</span>
                </h4>

                {/* 旅遊地區 / 目的地 */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#8C7D73] font-bold block">🗾 旅遊地區 / 目的地（AI 排程依此安排景點）：</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="例: 東京 / 京都・大阪 / 北海道"
                    className="w-full text-[11px] px-2.5 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none font-bold text-[#593E30]"
                  />
                  <div className="flex flex-wrap gap-1">
                    {['東京', '京都', '大阪', '北海道', '沖繩', '福岡', '名古屋'].map(city => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setDestination(city)}
                        className={`text-[9px] px-2 py-0.5 rounded-full border font-bold transition-all ${
                          destination === city
                            ? 'bg-[#C75A51] text-white border-[#C75A51]'
                            : 'bg-white text-[#8C7D73] border-[#EADEC6] hover:border-[#C75A51] hover:text-[#C75A51]'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-[#8C7D73]">💡 想限制單一天的活動範圍？點該天標題旁的 ✏️ 編輯「本日活動區域範圍」。</p>
                </div>

                {/* 偏好交通方式 */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C7D73] font-bold block">🚃 偏好交通方式（用於景點間時間推估）：</label>
                  <select
                    value={transportPref}
                    onChange={e => setTransportPref(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none text-[#593E30] font-bold"
                  >
                    {TRANSPORT_MODES.map(m => (
                      <option key={m.key} value={m.key}>{m.label}（預設約 {m.defaultMin} 分/段）</option>
                    ))}
                  </select>
                </div>

                {/* 住宿清單 */}
                <div className="space-y-2 pt-1 border-t border-dashed border-[#EADEC6]">
                  <label className="text-[10px] text-[#8C7D73] font-bold block pt-2">🏨 住宿時間登記（依日期自動對應每日行程）：</label>

                  {lodgings.length > 0 && (
                    <div className="space-y-1.5">
                      {lodgings.map(l => (
                        <div key={l.id} className="flex items-center justify-between gap-2 text-[11px] bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5">
                          <div className="min-w-0">
                            <p className="font-bold text-[#593E30] truncate">🏨 {l.name}</p>
                            <p className="text-[10px] text-[#8C7D73]">{l.checkIn} 入住 ➔ {l.checkOut} 退房</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {l.mapUrl && (
                              <a
                                href={l.mapUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 hover:text-blue-700 p-0.5"
                                title="開啟 Google Maps"
                              >
                                <MapPin size={12} />
                              </a>
                            )}
                            <button onClick={() => deleteLodging(l.id)} className="text-red-400 hover:text-red-600 p-0.5">
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={addLodging} className="space-y-1.5">
                    {/* 貼上 Google Maps 連結自動辨識名稱 */}
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={lodgingUrlInput}
                        onChange={e => setLodgingUrlInput(e.target.value)}
                        placeholder="🔗 貼上 Google Maps 住宿連結..."
                        className="flex-1 min-w-0 text-[10px] px-2.5 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={parseLodgingFromUrl}
                        className="px-2.5 py-1.5 bg-[#593E30] hover:bg-[#463125] text-white rounded-lg text-[10px] font-bold transition-all flex-shrink-0"
                      >
                        辨識
                      </button>
                    </div>

                    {/* 訂房截圖 AI 分析 */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-[#8C7D73] font-bold block">
                        📸 或上傳訂房截圖 AI 分析{!apiKey && <span className="text-[#C75A51]">（需 Gemini API Key）</span>}：
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isAiLoading}
                        onChange={e => { handleLodgingImageSelect(e.target.files && e.target.files[0]); e.target.value = ''; }}
                        className="w-full text-[9px] text-[#8C7D73] file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:bg-[#593E30] file:text-white file:text-[9px] file:font-bold file:cursor-pointer bg-[#FAF8F5] border border-[#EADEC6] rounded-lg p-1 disabled:opacity-50"
                      />
                      {isAiLoading && (
                        <p className="text-[9px] text-[#8C7D73] font-bold animate-pulse">🌀 小柴辨識中...汪！</p>
                      )}
                    </div>

                    <input
                      type="text"
                      value={newLodging.name}
                      onChange={e => setNewLodging({ ...newLodging, name: e.target.value })}
                      placeholder="住宿名稱（例: 日暮里 APA Hotel）"
                      className="w-full text-[11px] px-2.5 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[9px] text-[#8C7D73] font-bold block">入住日</label>
                        <input
                          type="date"
                          value={newLodging.checkIn}
                          onChange={e => setNewLodging({ ...newLodging, checkIn: e.target.value })}
                          className="w-full text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] text-[#8C7D73] font-bold block">退房日</label>
                        <input
                          type="date"
                          value={newLodging.checkOut}
                          onChange={e => setNewLodging({ ...newLodging, checkOut: e.target.value })}
                          className="w-full text-[10px] px-2 py-1.5 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-1.5 bg-[#3B6C57] hover:bg-[#2D5343] text-white rounded-lg text-[10px] font-bold transition-all">
                      + 新增住宿
                    </button>
                  </form>
                </div>
              </div>

              {/* 實用工具箱 6：Visit Japan Web 入境準備 */}
              <div className="washi-card p-5 space-y-3 shadow-xs">
                <img src="/illustrations/passport.png" alt="" aria-hidden="true" className="sticker w-12 -top-4 -right-2 rotate-6" />
                <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                  <span>🛂 Visit Japan Web 入境準備</span>
                </h4>
                <p className="text-[10px] text-[#8C7D73] leading-relaxed">
                  日本入境審查與海關申報的官方線上服務，出發前填好可免排長龍快速通關汪！
                </p>

                <a
                  href="https://services.digital.go.jp/zh-cmn-hant/visit-japan-web"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-lg text-[11px] font-black text-center transition-all"
                >
                  🔗 前往 Visit Japan Web（繁中官方頁面）
                </a>

                <div className="bg-[#FAF8F5] border border-[#EADEC6] rounded-lg p-3 space-y-1.5">
                  <p className="text-[10px] font-black text-[#593E30]">📋 申請注意事項：</p>
                  <ol className="text-[10px] text-[#6D5D55] leading-relaxed space-y-1 list-decimal list-inside font-semibold">
                    <li>建議<strong>出發前 1～2 週</strong>註冊帳號並填寫資料，避免臨行匆忙。</li>
                    <li>需準備：<strong>護照</strong>、<strong>航班編號</strong>、<strong>在日住宿地址與電話</strong>（可先在左上「出國基本資訊」登記住宿）。</li>
                    <li>完成「入境審查」與「海關申報」後會各產生一組 <strong>QR Code</strong>。</li>
                    <li>抵達機場前先把 QR Code <strong>截圖保存</strong>，機場網路不穩時可離線出示汪！</li>
                    <li>同行家人（如孩童）可用<strong>同一帳號</strong>以「同行家人」方式一起登錄。</li>
                    <li>資料填寫後仍可修改；每次入境日本都要建立新的入境預定。</li>
                  </ol>
                </div>
              </div>

              {/* 隨手記貼便籤 */}
              <div className="bg-amber-50/50 border-2 border-amber-200 rounded-2xl p-5 space-y-2 shadow-xs">
                <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <span>📌 旅行隨手筆記</span>
                </h4>
                <textarea 
                  value={quickNotes}
                  onChange={e => setQuickNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-0 focus:ring-0 p-0 text-xs text-amber-800 leading-relaxed resize-none focus:outline-none font-medium"
                  placeholder="寫點備忘錄、退稅細節、交通時刻資訊..."
                />
              </div>

            </div>

            {/* 右側：主行程時間軸看板與日程管理 */}
            <div ref={dayTimelineRef} className="lg:col-span-8 scroll-mt-28">
              
              {/* 由小柴安排本日行程 (需 API Key) */}
              <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                <span className="text-[10px] font-bold text-[#8C7D73]">
                  {apiKey
                    ? `🐾 讓小柴參考前 ${activeDay - 1} 天行程、住宿、航班與偏好交通，自動排好這一天！`
                    : '🔒 「由小柴安排」需先至「AI 設定」填入 Gemini API Key 才能使用'}
                </span>
                <button
                  onClick={handleAiPlanDay}
                  disabled={!apiKey || isAiLoading}
                  title={!apiKey ? '請先設定 Gemini API Key' : `由 AI 自動安排 Day ${activeDay} 行程`}
                  className="px-4 py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#C75A51]"
                >
                  <Sparkles size={14} />
                  {isAiLoading ? '小柴規劃中...' : `🐕 由小柴安排 Day ${activeDay}`}
                </button>
              </div>

              {/* 日程天數 Tabs 切換 */}
              <div className="flex overflow-x-auto flex-nowrap gap-1.5 border-b-2 border-[#DCCFB4] mb-6 scrollbar-none">
                {itinerary.map(day => {
                  const tabDate = getDayDate(day.dayNum);
                  const tabLodging = getLodgingForDay(day.dayNum);
                  return (
                    <button
                      key={day.dayNum}
                      onClick={() => setActiveDay(day.dayNum)}
                      title={tabLodging ? `🏨 今晚住宿：${tabLodging.name}` : undefined}
                      className={`px-4.5 py-2 text-xs font-black rounded-t-xl transition-all flex items-center gap-1 flex-shrink-0 whitespace-nowrap ${
                        activeDay === day.dayNum
                          ? 'bg-[#FEFCF5] border-t-2 border-x-2 border-[#DCCFB4] text-[#C75A51] -mb-[2px] z-10 rounded-t-[14px_18px_0_0]'
                          : 'bg-[#EDE5D2]/60 text-[#85796B] hover:bg-[#F5EFE0]'
                      }`}
                    >
                      <span>📅</span>
                      <span className="flex flex-col items-start leading-tight">
                        <span>DAY {day.dayNum}</span>
                        {(tabDate || tabLodging) && (
                          <span className={`text-[9px] font-bold ${activeDay === day.dayNum ? 'text-[#C75A51]/75' : 'text-[#A79B8D]'}`}>
                            {tabDate ? tabDate.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', weekday: 'short' }) : ''}
                            {tabLodging ? ' 🏨' : ''}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={addNewDay}
                  className="px-3.5 py-3 text-xs font-bold text-[#3B6C57] hover:bg-green-50 rounded-t-xl transition-all flex-shrink-0 whitespace-nowrap"
                >
                  + 新增天數
                </button>
                <button
                  onClick={() => { setIsDayManageMode(!isDayManageMode); setSelectedDayNums([]); }}
                  className={`px-3.5 py-3 text-xs font-bold rounded-t-xl transition-all flex-shrink-0 whitespace-nowrap ${
                    isDayManageMode ? 'bg-[#C75A51] text-white' : 'text-[#8C7D73] hover:bg-[#F5EFE0]'
                  }`}
                >
                  ⚙ 管理天數
                </button>
              </div>

              {/* 天數管理面板：批次刪除 / 交換位置 / 任意位置插入 */}
              {isDayManageMode && (
                <div className="washi-card p-4 mb-6 space-y-2">
                  <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-dashed border-[#EADEC6]">
                    <span className="text-[11px] font-black text-[#593E30]">🛠️ 天數管理：勾選可批次刪除、◀ ▶ 交換位置、➕ 在任意位置插入日期</span>
                    <div className="flex gap-2">
                      <button
                        onClick={batchDeleteDays}
                        disabled={selectedDayNums.length === 0}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-lg text-[11px] font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <Trash2 size={12} /> 刪除選取（{selectedDayNums.length}）
                      </button>
                      <button
                        onClick={() => { setIsDayManageMode(false); setSelectedDayNums([]); }}
                        className="px-3 py-1.5 border border-[#EADEC6] text-[#593E30] hover:bg-[#F3EFE9] rounded-lg text-[11px] font-black transition-all"
                      >
                        完成
                      </button>
                    </div>
                  </div>

                  {itinerary.map((day, idx) => {
                    const rowDate = getDayDate(day.dayNum);
                    const rowLodging = getLodgingForDay(day.dayNum);
                    return (
                      <div
                        key={day.dayNum}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                          selectedDayNums.includes(day.dayNum) ? 'bg-red-50/60 border-red-200' : 'bg-[#FAF8F5] border-[#EADEC6]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDayNums.includes(day.dayNum)}
                          onChange={() => toggleDaySelected(day.dayNum)}
                          className="w-4 h-4 accent-[#C75A51] flex-shrink-0 cursor-pointer"
                          title="勾選以批次刪除"
                        />
                        <div className="flex-1 min-w-0 text-[11px] leading-relaxed">
                          <span className="font-black text-[#C75A51]">Day {day.dayNum}</span>
                          <span className="text-[#8C7D73] font-bold ml-1.5">
                            {rowDate ? rowDate.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', weekday: 'short' }) : '—'}
                          </span>
                          <span className="text-[#6D5D55] font-bold ml-1.5">{(day.spots || []).length} 個行程</span>
                          {rowLodging && <span className="text-[#593E30] font-bold ml-1.5">🏨 {rowLodging.name}</span>}
                          {day.title && <span className="text-[#8C7D73] font-medium ml-1.5 hidden sm:inline">｜{day.title}</span>}
                        </div>
                        <button
                          onClick={() => moveDay(day.dayNum, -1)}
                          disabled={idx === 0}
                          title="與前一天交換位置"
                          className="w-7 h-7 flex items-center justify-center bg-white border border-[#EADEC6] rounded-lg text-[10px] font-black text-[#593E30] hover:border-[#C75A51] hover:text-[#C75A51] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => moveDay(day.dayNum, 1)}
                          disabled={idx === itinerary.length - 1}
                          title="與後一天交換位置"
                          className="w-7 h-7 flex items-center justify-center bg-white border border-[#EADEC6] rounded-lg text-[10px] font-black text-[#593E30] hover:border-[#C75A51] hover:text-[#C75A51] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                        >
                          ▶
                        </button>
                        <button
                          onClick={() => insertDayAt(idx)}
                          title={`在 Day ${day.dayNum} 之前插入空白的一天`}
                          className="h-7 px-2 flex items-center justify-center bg-white border border-[#EADEC6] rounded-lg text-[10px] font-black text-[#3B6C57] hover:border-[#3B6C57] hover:bg-green-50 transition-all flex-shrink-0 whitespace-nowrap"
                        >
                          ➕ 前插
                        </button>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => insertDayAt(itinerary.length)}
                    className="w-full py-2 border-2 border-dashed border-[#CBB693] text-[#593E30] hover:border-[#3B6C57] hover:text-[#3B6C57] hover:bg-green-50/50 rounded-xl transition-all text-[11px] font-black"
                  >
                    ➕ 在最後新增一天
                  </button>
                </div>
              )}

              {/* 該天日程詳細資訊與卡片 */}
              <div className="washi-card p-6 shadow-xs">
                
                {/* 該日的主題 Banner */}
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 border-b border-dashed border-[#EADEC6] pb-6 mb-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex overflow-x-auto flex-nowrap items-center gap-2 scrollbar-none">
                      {getDayDate(activeDay) && (
                        <span className="text-[10px] font-black bg-[#FCF5F3] border border-[#F5E2DF] px-2.5 py-0.5 rounded-full text-[#C75A51] flex-shrink-0 whitespace-nowrap">
                          📆 {getDayDate(activeDay).toLocaleDateString('zh-TW', { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short' })}
                        </span>
                      )}
                      {currentDayData.area && (
                        <span className="text-[10px] font-black bg-[#F1F6F3] border border-[#D5E6DF] px-2.5 py-0.5 rounded-full text-[#3B6C57] flex-shrink-0 whitespace-nowrap">
                          🗾 區域：{currentDayData.area}
                        </span>
                      )}
                      <span className="text-[10px] font-black bg-[#FAF6F0] border border-[#EADEC6] px-2.5 py-0.5 rounded-full text-[#8C7D73] flex-shrink-0 whitespace-nowrap">
                        📍 行程動線：{currentDayData.path || "無指定"}
                      </span>
                      <span className="text-[10px] font-black bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full text-blue-700 flex-shrink-0 whitespace-nowrap">
                        👥 旅伴：{currentDayData.companion || "單人獨旅"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black text-[#593E30] flex items-center gap-2">
                      <span>Day {activeDay}：{currentDayData.title}</span>
                      <button 
                        onClick={() => openDayModal(currentDayData)}
                        className="text-[#8C7D73] hover:text-[#C75A51] transition-all p-1"
                        title="編輯今日資訊主題"
                      >
                        <Edit2 size={14} />
                      </button>
                    </h3>
                  </div>

                  <div className="text-right space-y-1.5">
                    <div className="text-sm font-black text-[#3B6C57] bg-[#F1F6F3] border border-[#D5E6DF] px-4 py-2 rounded-xl shadow-xs inline-flex items-center gap-1.5">
                      💴 當日預估：¥{getDailyTotalCost(currentDayData).toLocaleString()}
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {getDailyTransitMinutes(currentDayData) > 0 && (
                        <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                          🚃 當天交通總預估：約 {formatMinutes(getDailyTransitMinutes(currentDayData))}
                        </span>
                      )}
                      {getLodgingForDay(activeDay) && (
                        <span className="text-[10px] font-black text-[#593E30] bg-[#FAF6F0] border border-[#EADEC6] px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                          🏨 今晚住宿：{getLodgingForDay(activeDay).name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 行程時間軸 Timeline */}
                {currentDayData.spots && currentDayData.spots.length > 0 ? (
                  <div className="space-y-0">
                    {currentDayData.spots.map((spot, spotIdx) => (
                      <div key={spotIdx} className="flex relative group min-h-[130px]">
                        
                        {/* 左側：時間軸時間點 */}
                        <div className="w-16 flex-shrink-0 text-right pt-4 pr-4">
                          <span className="text-[11px] font-black text-[#C75A51] bg-[#FCF5F3] px-2 py-0.5 rounded-md border border-[#F5E2DF]">
                            {spot.time}
                          </span>
                        </div>

                        {/* 中間：水墨虛線與墨點 */}
                        <div className="relative flex flex-col items-center">
                          <div className="h-full w-0 border-l-2 border-dashed border-[#C9BBA0] absolute top-0 bottom-0 z-0 group-last:h-4"></div>
                          <div className="w-4.5 h-4.5 ink-dot bg-[#FEFCF5] border-2 border-[#C75A51] z-10 mt-4.5 flex items-center justify-center shadow-xs">
                            <div className="w-2 h-2 ink-dot bg-[#C75A51]"></div>
                          </div>
                        </div>

                        {/* 右側：景點資料詳細內容卡片 */}
                        <div className="flex-grow pl-5 pb-6 pt-1">
                          <div className="bg-[#FAF9F6] border border-[#EADEC6] hover:border-[#C75A51] rounded-2xl p-4.5 shadow-xs transition-all relative group-hover:shadow-xs">
                            
                            {/* 編輯此景點按鈕 */}
                            <button 
                              onClick={() => openEditModal(activeDay - 1, spotIdx)}
                              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] bg-white border border-[#EADEC6] p-1.5 rounded-lg shadow-xs transition-all"
                              title="編輯此處日程"
                            >
                              <Edit2 size={12} />
                            </button>

                            {/* 標籤徽章與預算 */}
                            <div className="flex overflow-x-auto flex-nowrap items-center gap-2 mb-2 pr-10 scrollbar-none">
                              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-[#F2ECE1] text-[#593E30] flex-shrink-0 whitespace-nowrap">
                                {spot.tagName || "✨ 自訂"}
                              </span>
                              {spot.cost > 0 && (
                                <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-md flex-shrink-0 whitespace-nowrap">
                                  💴 ¥{Number(spot.cost).toLocaleString()}
                                </span>
                              )}
                              {spot.mapUrl && (
                                <a 
                                  href={spot.mapUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-2.5 py-0.5 rounded-md transition-all flex-shrink-0 whitespace-nowrap"
                                >
                                  <MapPin size={10} /> 導航
                                </a>
                              )}
                            </div>
                            
                            {/* 景點主標題 */}
                            <h3 className="text-sm font-black text-[#2C2421] mb-1.5 pr-8">{spot.name || "未命名景點"}</h3>
                            
                            {/* 景點詳細描述 */}
                            <p className="text-xs text-[#6D5D55] leading-relaxed mb-2.5">{spot.desc || "無說明內容"}</p>
                            
                            {/* 貼心建議 */}
                            {spot.tip && (
                              <div className="text-[11px] text-[#3B6C57] font-bold flex items-start gap-1 mb-2.5 bg-[#F1F6F3] p-2 rounded-lg">
                                <span className="mt-0.5">💡</span>
                                <span>貼心提醒：{spot.tip}</span>
                              </div>
                            )}

                            {/* 個人便利貼備忘錄 */}
                            {spot.memo && (
                              <div className="mt-3 p-2.5 bg-yellow-50/70 border-l-[3px] border-yellow-400 rounded-r shadow-xs relative">
                                <span className="absolute -top-2.5 left-2 text-sm drop-shadow-xs">📌</span>
                                <p className="text-[11px] text-yellow-900 font-bold tracking-wide pl-1">{spot.memo}</p>
                              </div>
                            )}
                          </div>

                          {/* 前往下一站的交通建議與預估時間 */}
                          {spotIdx < currentDayData.spots.length - 1 && (
                            <div className="mt-3 ml-1 flex flex-wrap items-center gap-2 text-[10px] font-bold">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg">
                                {getTransitMode(spot).label} • 約 {formatMinutes(getTransitMinutes(spot))}
                              </span>
                              <a
                                href={getDirectionsUrl(spot.name, currentDayData.spots[spotIdx + 1].name, spot.transitMode && spot.transitMode !== 'default' ? spot.transitMode : transportPref)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EADEC6] text-[#593E30] rounded-lg hover:border-[#C75A51] hover:text-[#C75A51] transition-all"
                              >
                                🗺️ 查即時路線
                              </a>
                              <span className="text-[#8C7D73]">➔ 下一站：{currentDayData.spots[spotIdx + 1].name}</span>
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-[#EADEC6] rounded-2xl text-[#8C7D73] space-y-3">
                    <p className="text-3xl">🧳</p>
                    <p className="text-xs font-bold">這天還沒有編排任何景點唷！</p>
                    <p className="text-[10px] text-[#BFB8B2]">點擊下方按鈕或請 AI 助理幫您生成推薦景點吧汪！</p>
                  </div>
                )}

                {/* 增加景點按鈕 */}
                <div className="pl-16 pt-4">
                  <button 
                    onClick={() => openEditModal(activeDay - 1, -1)}
                    className="px-5 py-2.5 border-2 border-dashed border-[#CBB693] text-[#593E30] hover:border-[#C75A51] hover:text-[#C75A51] rounded-xl hover:bg-[#FAF8F5] transition-all text-xs font-black flex items-center gap-2"
                  >
                    <Plus size={14} /> <span>新增景點日程</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </main>
      )}

      {/* ==========================================
          編輯 / 新增景點 Modal
          ========================================== */}
      {isModalOpen && editData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="washi-card w-full max-w-md p-6 shadow-2xl relative transition-all animate-in fade-in zoom-in-95">
            
            {/* 關閉按鈕 */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] p-1.5 rounded-lg hover:bg-[#F3EFE9]"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-black text-[#593E30] border-b-2 border-[#EADEC6] pb-3 mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-[#C75A51]" /> 
              <span>{editData.spotIdx === -1 ? '新增' : '編輯'}景點日程</span>
            </h3>

            <form onSubmit={saveModal} className="space-y-4 text-xs font-bold text-[#8C7D73]">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[11px]">⏱️ 開始時間</label>
                  <input 
                    type="time" 
                    value={editData.data.time} 
                    onChange={e => setEditData({...editData, data: {...editData.data, time: e.target.value}})} 
                    className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[11px]">💴 預估花費 (日圓)</label>
                  <input 
                    type="number" 
                    value={editData.data.cost} 
                    onChange={e => setEditData({...editData, data: {...editData.data, cost: Number(e.target.value)}})} 
                    className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                    placeholder="例: 1500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-[11px]">📍 景點或店舖名稱</label>
                <input 
                  type="text" 
                  value={editData.data.name} 
                  onChange={e => setEditData({...editData, data: {...editData.data, name: e.target.value}})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                  placeholder="例: 明治神宮 / 炸豬排 邁泉"
                  required 
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">🏷️ 景點分類標籤</label>
                <select 
                  value={editData.data.tagType} 
                  onChange={e => setEditData({...editData, data: {...editData.data, tagType: e.target.value}})}
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                >
                  {SPOT_TAGS.map(tag => (
                    <option key={tag.type} value={tag.type}>{tag.name}</option>
                  ))}
                </select>
              </div>

              {/* 當為自訂標籤時，可以自訂文字 */}
              {editData.data.tagType === 'custom' && (
                <div>
                  <label className="block mb-1 text-[11px]">✨ 自訂標籤文字與表情符號</label>
                  <input 
                    type="text" 
                    value={editData.data.tagName} 
                    onChange={e => setEditData({...editData, data: {...editData.data, tagName: e.target.value}})} 
                    className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                    placeholder="例: 🍣 頂級握壽司"
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 text-[11px]">🗺️ Google Maps 連結網址</label>
                <input 
                  type="url" 
                  value={editData.data.mapUrl} 
                  onChange={e => setEditData({...editData, data: {...editData.data, mapUrl: e.target.value}})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-blue-600 font-normal focus:outline-none focus:border-[#C75A51]" 
                  placeholder="https://www.google.com/maps/..." 
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">📝 景點簡單描述</label>
                <textarea 
                  value={editData.data.desc} 
                  onChange={e => setEditData({...editData, data: {...editData.data, desc: e.target.value}})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                  rows={2}
                  placeholder="寫一些景點的特色，像是：全日本品項最豐富的旗艦店..."
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">💡 小柴導遊貼心提醒 (Tip)</label>
                <input 
                  type="text" 
                  value={editData.data.tip} 
                  onChange={e => setEditData({...editData, data: {...editData.data, tip: e.target.value}})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                  placeholder="例: 建議提前 15 分鐘去排隊才不用等很久喔" 
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">📌 個人專屬備忘錄 (Memo)</label>
                <input
                  type="text"
                  value={editData.data.memo}
                  onChange={e => setEditData({...editData, data: {...editData.data, memo: e.target.value}})}
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                  placeholder="例: 幫媽媽帶兩罐 SHIRO 的香水！"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-[11px]">🚃 前往下一站交通方式</label>
                  <select
                    value={editData.data.transitMode || 'default'}
                    onChange={e => setEditData({...editData, data: {...editData.data, transitMode: e.target.value}})}
                    className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                  >
                    <option value="default">依整體偏好交通</option>
                    {TRANSPORT_MODES.map(m => (
                      <option key={m.key} value={m.key}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-[11px]">⏳ 預估交通時間 (分鐘)</label>
                  <input
                    type="number"
                    min="0"
                    value={editData.data.transitMin ?? ''}
                    onChange={e => setEditData({...editData, data: {...editData.data, transitMin: e.target.value}})}
                    className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                    placeholder="留空自動推估"
                  />
                </div>
              </div>

              {/* 所屬天數與跨天搬移（插入 / 交換） */}
              {itinerary.length > 1 && (
                <div className="bg-[#FAF8F5] border border-dashed border-[#CBB693] rounded-xl p-3 space-y-3">
                  <div>
                    <label className="block mb-1 text-[11px]">📅 所屬天數（選其他天可將此行程搬移過去）</label>
                    <select
                      value={editData.targetDay}
                      onChange={e => setEditData({ ...editData, targetDay: Number(e.target.value), swapSpotIdx: 0 })}
                      className="w-full bg-white border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                    >
                      {itinerary.map(day => {
                        const optDate = getDayDate(day.dayNum);
                        return (
                          <option key={day.dayNum} value={day.dayNum}>
                            Day {day.dayNum}{optDate ? `（${optDate.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', weekday: 'short' })}）` : ''}{day.dayNum === editData.dayIdx + 1 ? '｜目前所在天' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {editData.spotIdx !== -1 && editData.targetDay !== editData.dayIdx + 1 && (
                    <>
                      <div className="flex flex-wrap gap-3 text-[11px]">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="moveMode"
                            checked={editData.moveMode !== 'swap'}
                            onChange={() => setEditData({ ...editData, moveMode: 'insert' })}
                            className="accent-[#C75A51]"
                          />
                          直接插入（依時間排序）
                        </label>
                        <label className={`flex items-center gap-1.5 ${moveTargetSpots.length === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                          <input
                            type="radio"
                            name="moveMode"
                            disabled={moveTargetSpots.length === 0}
                            checked={editData.moveMode === 'swap'}
                            onChange={() => setEditData({ ...editData, moveMode: 'swap' })}
                            className="accent-[#C75A51]"
                          />
                          與對方行程交換
                        </label>
                      </div>
                      {editData.moveMode === 'swap' && moveTargetSpots.length > 0 && (
                        <div>
                          <label className="block mb-1 text-[11px]">🔁 選擇 Day {editData.targetDay} 中要交換過來的行程</label>
                          <select
                            value={editData.swapSpotIdx}
                            onChange={e => setEditData({ ...editData, swapSpotIdx: Number(e.target.value) })}
                            className="w-full bg-white border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                          >
                            {moveTargetSpots.map((s, i) => (
                              <option key={i} value={i}>{s.time}｜{s.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <p className="text-[10px] text-[#8C7D73] font-medium">搬移後兩天都會自動依時間排序，並檢查行程銜接是否順暢，有問題會提示汪！</p>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-[#EADEC6]">
                {editData.spotIdx !== -1 && (
                  <button 
                    type="button" 
                    onClick={deleteSpot}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Trash2 size={14} /> 刪除
                  </button>
                )}
                <div className="flex-1 flex gap-2 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-[#EADEC6] rounded-xl text-[#593E30] hover:bg-[#F3EFE9] transition-all"
                  >
                    取消
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl transition-all"
                  >
                    儲存更新
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          編輯今日主題 / 動線與伴侶 Modal
          ========================================== */}
      {isDayModalOpen && editDayData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="washi-card w-full max-w-sm p-6 shadow-2xl relative transition-all animate-in fade-in zoom-in-95">
            
            <button 
              onClick={() => setIsDayModalOpen(false)} 
              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] p-1.5 rounded-lg hover:bg-[#F3EFE9]"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-black text-[#593E30] border-b-2 border-[#EADEC6] pb-3 mb-4 flex items-center gap-1.5">
              <span>📅</span> 編輯 Day {editDayData.dayNum} 主題與動線
            </h3>

            <form onSubmit={saveDayModal} className="space-y-4 text-xs font-bold text-[#8C7D73]">
              <div>
                <label className="block mb-1 text-[11px]">✏️ 這一天的遊玩主題</label>
                <input 
                  type="text" 
                  value={editDayData.title} 
                  onChange={e => setEditDayData({...editDayData, title: e.target.value})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]" 
                  required 
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">🗾 本日活動區域範圍（AI 排程會限制在此範圍內）</label>
                <input
                  type="text"
                  value={editDayData.area}
                  onChange={e => setEditDayData({...editDayData, area: e.target.value})}
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2421] focus:outline-none focus:border-[#C75A51]"
                  placeholder="例: 淺草・上野周邊 / 京都東山區"
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">📍 交通行經路徑 / 主要動線</label>
                <input 
                  type="text" 
                  value={editDayData.path} 
                  onChange={e => setEditDayData({...editDayData, path: e.target.value})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2C21] focus:outline-none" 
                  placeholder="例: 上野 ➔ 雷門 ➔ 晴空塔"
                />
              </div>

              <div>
                <label className="block mb-1 text-[11px]">👥 同行旅伴或性質</label>
                <input 
                  type="text" 
                  value={editDayData.companion} 
                  onChange={e => setEditDayData({...editDayData, companion: e.target.value})} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-[#2C2C21] focus:outline-none" 
                  placeholder="例: 親子遊 / 情侶度假 / 單人漫步"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EADEC6]">
                <button 
                  type="button" 
                  onClick={() => setIsDayModalOpen(false)}
                  className="px-4 py-2 border border-[#EADEC6] rounded-xl text-[#593E30] hover:bg-[#F3EFE9] transition-all"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl transition-all"
                >
                  儲存修改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          設定 API KEY Modal
          ========================================== */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="washi-card w-full max-w-sm p-6 shadow-2xl relative transition-all">
            
            <button 
              onClick={() => setIsSettingsOpen(false)} 
              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] p-1.5 rounded-lg hover:bg-[#F3EFE9]"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-black text-[#593E30] border-b-2 border-[#EADEC6] pb-3 mb-4 flex items-center gap-1.5">
              <span>🔑</span> 串接 Gemini 2.5 API 金鑰
            </h3>

            <p className="text-xs text-[#8C7D73] leading-relaxed mb-3">
              填入您個人的 Google Gemini API Key。填入後，AI 柴犬助理「小柴」將能直接調用真實 AI 模型，即時依照您的想法，重新智能調整和生成精準的日本旅行地圖與花費！
            </p>

            {/* 調用模型說明 */}
            <div className="flex items-center justify-between gap-2 mb-3 bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2">
              <span className="text-[10px] font-bold text-[#8C7D73]">🤖 調用模型</span>
              <code className="text-[10px] font-black text-[#3B6C57] bg-[#F1F6F3] border border-[#D5E6DF] px-2 py-0.5 rounded">gemini-2.5-flash</code>
            </div>

            {/* AI Studio 申請說明 */}
            <div className="bg-[#FAF8F5] border border-[#EADEC6] rounded-lg p-3 space-y-1.5 mb-4">
              <p className="text-[10px] font-black text-[#593E30]">🔑 還沒有金鑰？免費申請步驟：</p>
              <ol className="text-[10px] text-[#6D5D55] leading-relaxed space-y-1 list-decimal list-inside font-semibold">
                <li>用 Google 帳號登入 <strong>Google AI Studio</strong>。</li>
                <li>點擊「<strong>Create API key</strong>」建立金鑰。</li>
                <li>複製 <code className="bg-white border border-[#EADEC6] px-1 rounded">AIzaSy...</code> 開頭的金鑰，貼回下方欄位。</li>
                <li>免費額度即可使用本站全部 AI 功能（對話排程、機票／住宿截圖辨識）。</li>
              </ol>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="block w-full mt-1 py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-lg text-[11px] font-black text-center transition-all"
              >
                🔗 前往 Google AI Studio 申請金鑰
              </a>
              <p className="text-[9px] text-[#8C7D73] leading-relaxed pt-0.5">
                🔒 金鑰只儲存在您自己的瀏覽器（LocalStorage），不會上傳到任何伺服器汪！
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-[11px] font-bold text-[#8C7D73]">Gemini API Key</label>
                <input 
                  type="password" 
                  value={apiKey} 
                  onChange={e => setApiKey(e.target.value)} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-xs focus:outline-none" 
                  placeholder="AIzaSy..."
                />
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#8C7D73] bg-[#FAF2EB] p-2 rounded-lg border border-[#ECD9C9]">
                <span>💡 無金鑰？亦可直接使用小柴智慧模擬引擎！</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EADEC6]">
                <button 
                  type="button" 
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 border border-[#EADEC6] rounded-xl text-xs font-bold text-[#593E30] hover:bg-[#F3EFE9] transition-all"
                >
                  關閉
                </button>
                <button 
                  type="button" 
                  onClick={() => saveApiKey(apiKey)}
                  className="px-5 py-2 bg-[#3B6C57] hover:bg-[#2D5343] text-white rounded-xl text-xs font-bold transition-all"
                >
                  儲存並連線
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          機票文字解析 Modal
          ========================================== */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="washi-card w-full max-w-md p-6 shadow-2xl relative transition-all">
            
            <button 
              onClick={() => setIsTicketModalOpen(false)} 
              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] p-1.5 rounded-lg hover:bg-[#F3EFE9]"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-black text-[#593E30] border-b-2 border-[#EADEC6] pb-3 mb-4 flex items-center gap-1.5">
              <span>✈️</span> 貼上機票文字進行解析
            </h3>

            <p className="text-xs text-[#8C7D73] leading-relaxed mb-4 font-semibold">
              您可以直接把整段電子機票通知信、行程明細等文字貼在下方，或上傳機票截圖。小柴會自動幫您抽取「去程」與「回程」的日期與時間汪！
            </p>

            <div className="space-y-4">
              <div>
                <textarea
                  value={ticketInputText}
                  onChange={e => setTicketInputText(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-xs focus:outline-none text-[#2C2421] font-semibold"
                  rows={6}
                  placeholder="例：
訂單編號: ABC1234
去程: BR198 Taipei (TPE) -> Tokyo (NRT) 2026/07/15 08:30
回程: BR197 Tokyo (NRT) -> Taipei (TPE) 2026/07/20 17:45"
                />
              </div>

              {/* 截圖辨識上傳區 */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#8C7D73] font-bold block">📸 或上傳機票截圖進行 AI 辨識{!apiKey && <span className="text-[#C75A51]">（需先設定 Gemini API Key）</span>}：</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleTicketImageSelect(e.target.files && e.target.files[0])}
                  className="w-full text-[10px] text-[#8C7D73] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#593E30] file:text-white file:text-[10px] file:font-bold file:cursor-pointer bg-[#FAF8F5] border border-[#EADEC6] rounded-lg p-1.5"
                />
                {ticketImage && (
                  <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-[#3B6C57] bg-green-50 border border-green-100 rounded-lg px-2.5 py-1.5">
                    <span className="truncate">✅ 已載入截圖：{ticketImage.name}</span>
                    <button onClick={() => setTicketImage(null)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EADEC6]">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="px-4 py-2 border border-[#EADEC6] rounded-xl text-xs font-bold text-[#593E30] hover:bg-[#F3EFE9] transition-all"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleParseTicket}
                  disabled={isAiLoading}
                  className="px-5 py-2 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                >
                  {isAiLoading ? '辨識中...' : '開始解析'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          雲端同步與分享 Modal
          ========================================== */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="washi-card w-full max-w-md p-6 shadow-2xl relative transition-all animate-in fade-in zoom-in-95">
            
            <button 
              onClick={() => setIsSyncModalOpen(false)} 
              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] p-1.5 rounded-lg hover:bg-[#F3EFE9]"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-black text-[#593E30] border-b-2 border-[#EADEC6] pb-3 mb-4 flex items-center gap-1.5">
              <span>☁️</span> 雲端同步與行程分享
            </h3>

            <div className="space-y-4 text-xs text-[#8C7D73]">
              
              {/* 步驟 1: GAS URL */}
              <div className="space-y-1.5">
                <label className="block font-black text-[#593E30] text-[11px]">1. 設定 Google Apps Script 同步網址</label>
                <input 
                  type="url" 
                  value={gasUrl} 
                  onChange={e => setGasUrl(e.target.value)} 
                  className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-3 py-2 text-xs focus:outline-none text-[#2C2421]" 
                  placeholder="https://script.google.com/macros/s/.../exec"
                />
                <p className="text-[10px] text-[#8C7D73] leading-relaxed">
                  請貼入您將 GAS 程式碼「部署為網頁應用程式」後獲得的 Web App URL。
                </p>
              </div>

              {/* 步驟 2: 分享連結與 ID */}
              <div className="space-y-1.5 p-3 bg-[#FAF8F5] border border-[#EADEC6] rounded-xl">
                <span className="font-black text-[#593E30] block text-[11px]">2. 您的行程分享資訊</span>
                
                <div className="space-y-1 text-[10px]">
                  <div>行程 ID: <span className="font-mono bg-white border border-[#EADEC6] px-1.5 py-0.5 rounded text-[#2C2421] font-bold">{shareId}</span></div>
                  <div className="pt-1">
                    <span className="block font-bold">專屬分享連結：</span>
                    <div className="flex gap-1.5 mt-1">
                      <input 
                        type="text" 
                        readOnly 
                        value={typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${shareId}` : ''}
                        className="flex-1 bg-white border border-[#EADEC6] rounded px-2 py-1 text-[10px] focus:outline-none"
                      />
                      <button 
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}${window.location.pathname}?id=${shareId}`);
                            showToast("分享連結已複製到剪貼簿汪！");
                          }
                        }}
                        className="px-2.5 py-1 bg-[#593E30] text-white rounded text-[10px] font-bold hover:bg-[#463125] transition-all"
                      >
                        複製
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 動作按鈕 */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveToCloud}
                  disabled={isCloudLoading}
                  className="flex-1 py-2.5 hanko-btn bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isCloudLoading ? '同步中...' : '☁️ 備份行程至雲端'}
                </button>
                <button
                  onClick={() => loadFromCloud(shareId)}
                  disabled={isCloudLoading}
                  className="flex-1 py-2.5 bg-white border border-[#EADEC6] text-[#593E30] hover:bg-[#FAF8F5] rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                >
                  {isCloudLoading ? '載入中...' : '🔄 從雲端載入最新'}
                </button>
              </div>

              {/* 簡易說明 */}
              <div className="text-[10px] leading-relaxed bg-[#FAF2EB] text-[#C75A51] p-2.5 rounded-lg border border-[#ECD9C9]">
                💡 <strong>小柴提醒：</strong>這是完全免費的試算表後端！當您點擊「備份行程」時，小柴會把行李清單、備忘與行程表通通上傳到您的 Google Sheets 當中備份；如果您給旅伴分享連結，他們也能一鍵載入這份行程汪！
              </div>

            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-[#EADEC6]">
              <button 
                onClick={() => setIsSyncModalOpen(false)}
                className="px-5 py-2 bg-[#593E30] text-white rounded-xl text-xs font-bold hover:bg-[#463125] transition-all"
              >
                關閉設定
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          列印專用版面：封面總覽 + 每天一頁
          ========================================== */}
      <div className="hidden print:block text-[#33302B]">
        {/* 封面：旅程總覽 */}
        <section className="break-after-page">
          <h1 className="text-2xl font-black mb-1">🐕 OriTour 日本旅行手冊</h1>
          <p className="text-xs text-[#85796B] mb-4">共 {itinerary.length} 日行程 • 總預算 ¥{getGrandTotalCost().toLocaleString()} 日圓</p>

          <table className="w-full text-[11px] border-collapse mb-4">
            <tbody>
              <tr className="border-b border-[#DCCFB4]">
                <td className="py-1.5 font-black w-24">✈️ 出發</td>
                <td>
                  {departureTime ? new Date(departureTime).toLocaleString('zh-TW') : '未設定'}
                  {flightInfo.depFlightNo && `　${flightInfo.depFlightNo}`}
                  {(flightInfo.depFrom || flightInfo.depTo) && `　${flightInfo.depFrom || '?'} ➔ ${flightInfo.depTo || '?'}`}
                </td>
              </tr>
              <tr className="border-b border-[#DCCFB4]">
                <td className="py-1.5 font-black">🛬 回國</td>
                <td>
                  {returnTime ? new Date(returnTime).toLocaleString('zh-TW') : '未設定'}
                  {flightInfo.retFlightNo && `　${flightInfo.retFlightNo}`}
                  {(flightInfo.retFrom || flightInfo.retTo) && `　${flightInfo.retFrom || '?'} ➔ ${flightInfo.retTo || '?'}`}
                </td>
              </tr>
              <tr className="border-b border-[#DCCFB4]">
                <td className="py-1.5 font-black">🗾 旅遊地區</td>
                <td>{destination || '未指定'}</td>
              </tr>
              <tr className="border-b border-[#DCCFB4]">
                <td className="py-1.5 font-black align-top">🏨 住宿</td>
                <td>
                  {lodgings.length > 0
                    ? lodgings.map(l => <div key={l.id}>{l.name}（{l.checkIn} ➔ {l.checkOut}）</div>)
                    : '未登記'}
                </td>
              </tr>
              <tr className="border-b border-[#DCCFB4]">
                <td className="py-1.5 font-black">🚃 偏好交通</td>
                <td>{(TRANSPORT_MODES.find(m => m.key === transportPref) || TRANSPORT_MODES[0]).label}</td>
              </tr>
            </tbody>
          </table>

          {/* 分天總覽 */}
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="border-b-2 border-[#33302B] text-left">
                <th className="py-1.5">天數</th><th>日期</th><th>主題</th><th>景點</th><th>交通預估</th><th className="text-right">花費</th>
              </tr>
            </thead>
            <tbody>
              {itinerary.map(day => {
                const dd = getDayDate(day.dayNum);
                const tm = getDailyTransitMinutes(day);
                return (
                  <tr key={day.dayNum} className="border-b border-[#DCCFB4]">
                    <td className="py-1.5 font-black">Day {day.dayNum}</td>
                    <td>{dd ? dd.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric', weekday: 'short' }) : '—'}</td>
                    <td>{day.title || '—'}</td>
                    <td>{(day.spots || []).length} 個</td>
                    <td>{tm > 0 ? `約 ${formatMinutes(tm)}` : '—'}</td>
                    <td className="text-right">¥{getDailyTotalCost(day).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* 行李清單 */}
          {packingList.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-black mb-1.5">🧳 行李檢查清單</h3>
              <ul className="text-[11px] space-y-0.5">
                {packingList.map(item => (
                  <li key={item.id}>{item.checked ? '☑' : '☐'} {item.text}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 每天一頁 */}
        {itinerary.map((day, dayIdx) => {
          const dd = getDayDate(day.dayNum);
          const lodging = getLodgingForDay(day.dayNum);
          const spots = day.spots || [];
          return (
            <section key={day.dayNum} className={dayIdx < itinerary.length - 1 ? 'break-after-page' : ''}>
              <div className="border-b-2 border-[#33302B] pb-2 mb-3">
                <h2 className="text-lg font-black">
                  Day {day.dayNum}｜{day.title || '自由探索'}
                  {dd && <span className="text-xs font-bold text-[#85796B] ml-2">{dd.toLocaleDateString('zh-TW', { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long' })}</span>}
                </h2>
                <p className="text-[11px] text-[#85796B] mt-0.5">
                  📍 {day.path || '無指定動線'} • 👥 {day.companion || '自由行'}
                  {lodging && <> • 🏨 {lodging.name}</>}
                </p>
                <p className="text-[11px] font-bold mt-0.5">
                  💴 當日預估 ¥{getDailyTotalCost(day).toLocaleString()}
                  {getDailyTransitMinutes(day) > 0 && <> • 🚃 交通總預估 約 {formatMinutes(getDailyTransitMinutes(day))}</>}
                </p>
              </div>

              {spots.length > 0 ? (
                <div className="space-y-2.5">
                  {spots.map((spot, spotIdx) => (
                    <div key={spotIdx} className="border-b border-dashed border-[#DCCFB4] pb-2" style={{ breakInside: 'avoid' }}>
                      <p className="text-[13px] font-black">
                        {spot.time}　{spot.name}
                        <span className="text-[10px] font-bold text-[#85796B] ml-2">{spot.tagName}{spot.cost > 0 && ` • ¥${Number(spot.cost).toLocaleString()}`}</span>
                      </p>
                      {spot.desc && <p className="text-[11px] mt-0.5">{spot.desc}</p>}
                      {spot.tip && <p className="text-[10px] text-[#3B6C57] mt-0.5">💡 {spot.tip}</p>}
                      {spot.memo && <p className="text-[10px] text-[#9A6B2F] mt-0.5">📌 {spot.memo}</p>}
                      {spotIdx < spots.length - 1 && (
                        <p className="text-[10px] text-[#85796B] mt-1">
                          ↓ {getTransitMode(spot).label} 約 {formatMinutes(getTransitMinutes(spot))} ➔ {spots[spotIdx + 1].name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-[#85796B]">（本日尚未安排景點）</p>
              )}
            </section>
          );
        })}
      </div>

      {/* 水墨和紙頁腳：毛筆分隔線 + 朱印落款 */}
      <footer className="mt-12 py-10 text-center text-xs text-[#85796B] font-bold space-y-3 relative print:hidden">
        {/* 毛筆橫劃分隔線 */}
        <svg viewBox="0 0 400 10" preserveAspectRatio="none" className="w-56 h-2.5 mx-auto opacity-40">
          <path d="M6 6 C 90 2, 180 9, 260 5 S 380 4, 394 6" fill="none" stroke="#3D362E" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="flex justify-center items-center gap-2">
          <ShibaInk className="w-6 h-6 float-soft" />
          <span>OriTour 和風日本旅行助理平台 • 祝您旅途平安愉悅！</span>
          <span className="inline-flex items-center justify-center w-6 h-6 bg-[#C75A51] text-[#FBF4E6] text-[10px] rounded-md rotate-3 shadow-sm">柴</span>
        </div>
        <p className="text-[10px] font-medium text-[#B3A99A]">© 2026 OriTour Studio. 本系統資料會即時同步暫存於您的個人瀏覽器中，離線亦可使用。</p>
      </footer>

    </div>
  );
}