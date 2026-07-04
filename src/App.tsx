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

  const chatHistoryRef = useRef(null);

  // --- 機票提醒相關狀態與 LocalStorage 綁定 ---
  const [departureTime, setDepartureTime] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('oritour_departure_time') || '';
    }
    return '';
  });
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketInputText, setTicketInputText] = useState('');
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

    const eventStart = formatToIcsUtc(reminderDate);
    const eventEnd = formatToIcsUtc(new Date(reminderDate.getTime() + 30 * 60 * 1000)); // 30 分鐘

    const uncheckedItems = packingList.filter(item => !item.checked);
    const uncheckedListStr = uncheckedItems.length > 0
      ? uncheckedItems.map((item, idx) => `${idx + 1}. ${item.text}`).join('\\n')
      : '所有行李皆已準備就緒！';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//OriTour//Travel Planner//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@oritour.vercel.app`,
      `DTSTAMP:${formatToIcsUtc(new Date())}`,
      `DTSTART:${eventStart}`,
      `DTEND:${eventEnd}`,
      'SUMMARY:🐕 OriTour 明日出發行李檢查提醒！',
      `DESCRIPTION:您的航班將於明天出發！請檢查以下尚未準備好的行李事項：\\n\\n${uncheckedListStr}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT0M', // 事件開始時提醒
      'ACTION:DISPLAY',
      'DESCRIPTION:OriTour行李檢查提醒！',
      'END:VALARM',
      'END:VEVENT',
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

  // --- 機票文字解析函式 (結合 Gemini API 與 Regex) ---
  const handleParseTicket = async () => {
    if (!ticketInputText.trim()) {
      showToast("請先貼入機票文字汪！", "warning");
      return;
    }
    
    setIsAiLoading(true);
    
    // 1. 若有 API Key，優先使用 Gemini API 智慧識別
    if (apiKey) {
      try {
        const systemPrompt = `你是一位專業的助理。請解析以下機票文字，並提取其「出發日期與時間」。
        回覆格式必須是嚴格合法的 JSON，只包含 "departureTime" 欄位，格式為 "YYYY-MM-DDTHH:mm"，例如 "2026-07-06T08:30"。如果找不到，請回傳空字串。
        絕對不要包含 markdown 標籤（除了 json 包裹）：
        {
          "departureTime": "YYYY-MM-DDTHH:mm"
        }`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `機票文字：\n${ticketInputText}` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (!response.ok) throw new Error("API 呼叫失敗");
        const resData = await response.json();
        const rawText = resData.candidates[0].content.parts[0].text;
        const result = JSON.parse(rawText.trim());
        
        if (result.departureTime) {
          setDepartureTime(result.departureTime);
          showToast("成功透過 AI 智慧提取機票時間汪！");
          setIsTicketModalOpen(false);
          setTicketInputText('');
          setIsAiLoading(false);
          return;
        }
      } catch (err) {
        console.error("AI 機票解析失敗，將降級使用 Regex：", err);
      }
    }

    // 2. 降級或無 Key 時，使用 Regex 匹配
    // 支援格式：2026/07/06 08:30, 2026-07-06 08:30, 2026.07.06 08:30 等
    const dateRegex = /(\d{4})[-/\.](\d{1,2})[-/\.](\d{1,2})/;
    const timeRegex = /(\d{2}):(\d{2})/;
    
    const dateMatch = ticketInputText.match(dateRegex);
    const timeMatch = ticketInputText.match(timeRegex);
    
    if (dateMatch) {
      const year = dateMatch[1];
      const month = dateMatch[2].padStart(2, '0');
      const day = dateMatch[3].padStart(2, '0');
      let hour = '08';
      let minute = '00';
      
      if (timeMatch) {
        hour = timeMatch[1];
        minute = timeMatch[2];
      }
      
      const parsedTime = `${year}-${month}-${day}T${hour}:${minute}`;
      setDepartureTime(parsedTime);
      showToast("成功提取出發時間！(使用規則匹配) 汪！");
      setIsTicketModalOpen(false);
      setTicketInputText('');
    } else {
      showToast("無法自動辨識時間，請手動在欄位中設定出發時間汪！", "warning");
    }
    
    setIsAiLoading(false);
  };

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
        departureTime: departureTime
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

  // --- 一鍵套用範本 ---
  const handleLoadPreset = (key) => {
    setItinerary(PRESETS[key]);
    setActiveDay(1);
    showToast(`成功套用並載入「${key === 'tokyo' ? '東京小眾香氛店' : key === 'kyoto' ? '京都古都歷史' : '大阪舌尖狂熱'}」精選旅程！`);
    setView('planner');
  };

  // --- 匯率換算更新 ---
  const handleTwdChange = (val) => {
    setTwdInput(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setJpyOutput(Math.round(num / exchangeRate.twd).toString());
    } else {
      setJpyOutput('');
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


  // --- 景點 Modal 處理邏輯 ---
  const openEditModal = (dayIdx, spotIdx) => {
    const isEdit = spotIdx !== -1;
    const spotData = isEdit ? itinerary[dayIdx].spots[spotIdx] : {
      time: "12:00", name: "", desc: "", tip: "", tagType: "sightseeing", tagName: "🌸 觀光祈福", cost: 0, mapUrl: "", memo: ""
    };
    setEditData({ dayIdx, spotIdx, data: { ...spotData } });
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

    if (spotIdx === -1) {
      // 新增景點
      newItinerary[dayIdx].spots.push(data);
      showToast("成功加入全新日程！");
    } else {
      // 編輯既有景點
      newItinerary[dayIdx].spots[spotIdx] = data;
      showToast("日程更新成功！");
    }

    // 依據時間順序自動重新排序
    newItinerary[dayIdx].spots.sort((a, b) => a.time.localeCompare(b.time));
    setItinerary(newItinerary);
    setIsModalOpen(false);
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
      companion: day.companion || "單人獨旅"
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
          companion: editDayData.companion
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
      title: `自訂精彩的一天`,
      companion: "自由行",
      path: "自訂探索動線",
      spots: []
    };
    setItinerary([...itinerary, newDay]);
    setActiveDay(nextDayNum);
    showToast(`成功建立第 ${nextDayNum} 天行程汪！現在可以開始編輯或使用 AI 助理囉！`);
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


  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#2C2421] font-sans selection:bg-[#EEDBC5]">
      
      {/* 頂部極簡精緻和風 Navigation Header */}
      <header className="border-b-2 border-[#EADEC6] bg-white sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('welcome')}>
            <span className="text-3xl filter drop-shadow-sm animate-pulse">🐕</span>
            <div>
              <h1 className="text-xl font-extrabold text-[#593E30] tracking-wide flex items-center gap-1.5">
                OriTour <span className="text-xs px-2 py-0.5 bg-[#C75A51] text-white rounded-full">和風規劃師</span>
              </h1>
              <p className="text-xs text-[#8C7D73] font-medium flex items-center gap-1">
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
              className="px-3.5 py-2 bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-bold transition-all"
            >
              {view === 'welcome' ? '進入規劃板 ➔' : '返回首頁'}
            </button>
          </div>
        </div>
      </header>

      {/* 共享視圖橫幅 Banner */}
      {isSharedView && (
        <div className="bg-[#FAF2EB] border-b border-[#ECD9C9] text-[#C75A51] px-4 py-3 text-xs font-bold flex flex-col sm:flex-row justify-between items-center gap-2.5 shadow-sm sticky top-[73px] z-30 animate-pulse">
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

      {/* 訊息通知吐司條 (Toast) */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl border-l-4 text-xs font-bold transition-all animate-bounce flex items-center gap-2 ${
          toast.type === 'warning' 
            ? 'bg-yellow-50 text-yellow-800 border-yellow-500' 
            : 'bg-green-50 text-green-800 border-green-500'
        }`}>
          <span>🐕</span>
          <span>{toast.msg}</span>
        </div>
      )}

      {/* ==========================================
          首頁/歡迎頁面
          ========================================== */}
      {view === 'welcome' && (
        <div className="min-h-[calc(screen-80px)] max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* 左側精緻歡迎內容 */}
          <div className="max-w-xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF2EB] border border-[#ECD9C9] text-[#C75A51] rounded-full text-xs font-bold">
              <Sparkles size={14} /> 新增 3 大精美範本，點擊即時暢玩！
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#593E30] leading-tight">
              打造您靈魂深處的 <br />
              <span className="text-[#C75A51] relative inline-block">
                小眾日本私房旅行
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-100 -z-10 rounded"></span>
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
            <div className="bg-[#FAF2EB] border-2 border-[#ECD9C9] p-6 rounded-2xl text-center space-y-4">
              <span className="text-6xl drop-shadow-md inline-block animate-bounce">🐕</span>
              <h3 className="font-bold text-lg text-[#593E30]">我是導遊小柴（Shiba）</h3>
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
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          
          {/* 行程總攬 Banner 卡片 */}
          <div className="bg-gradient-to-r from-[#FAF6F0] to-[#F1ECE3] border-2 border-[#EADEC6] rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#C75A51] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full inline-block">
                🇯🇵 專屬客製化旅行手冊
              </span>
              <h2 className="text-2xl font-black text-[#593E30]">日本自主行完美規劃</h2>
              <p className="text-xs text-[#8C7D73]">
                全體共 {itinerary.length} 日精彩行程 • 全程估計總花費為 <span className="font-extrabold text-[#C75A51]">¥{getGrandTotalCost().toLocaleString()}</span> 日圓
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 左側：AI 小柴對話 與 旅人輔助工具箱 */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* AI 規劃助理小柴對話窗 */}
              <div className="bg-white border-2 border-[#EADEC6] rounded-2xl shadow-xs flex flex-col h-[480px]">
                <div className="bg-[#FAF8F5] px-4 py-3 flex items-center justify-between border-b border-[#EADEC6] rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🐕</span>
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
                <div className="p-2 border-t border-[#EADEC6] flex flex-wrap gap-1 bg-[#FAF8F5]">
                  <button 
                    onClick={() => executeAiQuery('🍰 推薦在下午 15:00 左右加入好吃的在地人氣甜點店汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all"
                  >
                    🍰 加甜點
                  </button>
                  <button 
                    onClick={() => executeAiQuery('☕ 好想在午後找間質感咖啡廳歇歇腳汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all"
                  >
                    ☕ 找咖啡館
                  </button>
                  <button 
                    onClick={() => executeAiQuery('🛍️ 幫我安插一個松本清藥妝購物行程吧汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all"
                  >
                    🛍️ 免稅藥妝
                  </button>
                  <button 
                    onClick={() => executeAiQuery('💸 請幫我降低現有景點不必要的高預算，改走省錢平替汪')} 
                    className="text-[10px] bg-white border border-[#EADEC6] px-2.5 py-1 rounded-full text-[#8C7D73] hover:text-[#C75A51] hover:border-[#C75A51] transition-all"
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
              <div className="bg-white border-2 border-[#EADEC6] rounded-2xl p-5 space-y-4 shadow-xs">
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
              <div className="bg-white border-2 border-[#EADEC6] rounded-2xl p-5 space-y-3 shadow-xs">
                <h4 className="text-xs font-black text-[#593E30] flex items-center gap-1.5">
                  <RefreshCw size={14} className="text-[#3B6C57]" />
                  <span>台幣換算日圓（依即時 0.21）</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#8C7D73] font-bold block mb-1">台幣 (TWD)</label>
                    <input 
                      type="number" 
                      value={twdInput} 
                      onChange={e => handleTwdChange(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C7D73] font-bold block mb-1">等值日圓 (JPY)</label>
                    <div className="w-full bg-[#F3EFE9] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs font-extrabold text-[#593E30]">
                      ¥ {parseFloat(jpyOutput).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* 實用工具箱 3：行李必備清單 */}
              <div className="bg-white border-2 border-[#EADEC6] rounded-2xl p-5 space-y-3 shadow-xs">
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
              <div className="bg-white border-2 border-[#EADEC6] rounded-2xl p-5 space-y-3 shadow-xs">
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
                    <label className="text-[10px] text-[#8C7D73] font-bold block">手動調整出發時間：</label>
                    <input 
                      type="datetime-local" 
                      value={departureTime}
                      onChange={e => setDepartureTime(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#EADEC6] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none text-[#593E30] font-bold"
                    />
                  </div>

                  {departureTime && (
                    <div className="text-[10px] text-[#3B6C57] font-semibold bg-green-50 p-2 rounded-lg leading-relaxed border border-green-100">
                      💡 系統將在 <strong>{new Date(new Date(departureTime).getTime() - 24 * 60 * 60 * 1000).toLocaleDateString()} (出發前一天)</strong> 提醒您檢查行李。
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
            <div className="lg:col-span-8">
              
              {/* 日程天數 Tabs 切換 */}
              <div className="flex flex-wrap gap-1.5 border-b border-[#EADEC6] mb-6">
                {itinerary.map(day => (
                  <button
                    key={day.dayNum}
                    onClick={() => setActiveDay(day.dayNum)}
                    className={`px-4.5 py-3 text-xs font-black rounded-t-xl transition-all flex items-center gap-1 ${
                      activeDay === day.dayNum
                        ? 'bg-white border-t-2 border-x-2 border-[#EADEC6] text-[#C75A51] -mb-[1px] z-10'
                        : 'bg-[#F2ECE1]/60 text-[#8C7D73] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>📅</span>
                    <span>DAY {day.dayNum}</span>
                  </button>
                ))}
                
                <button 
                  onClick={addNewDay}
                  className="px-3.5 py-3 text-xs font-bold text-[#3B6C57] hover:bg-green-50 rounded-t-xl transition-all"
                >
                  + 新增天數
                </button>
              </div>

              {/* 該天日程詳細資訊與卡片 */}
              <div className="bg-white border-2 border-[#EADEC6] rounded-2xl p-6 shadow-xs">
                
                {/* 該日的主題 Banner */}
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 border-b border-dashed border-[#EADEC6] pb-6 mb-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black bg-[#FAF6F0] border border-[#EADEC6] px-2.5 py-0.5 rounded-full text-[#8C7D73]">
                        📍 行程動線：{currentDayData.path || "無指定"}
                      </span>
                      <span className="text-[10px] font-black bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full text-blue-700">
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

                  <div className="text-right">
                    <div className="text-sm font-black text-[#3B6C57] bg-[#F1F6F3] border border-[#D5E6DF] px-4 py-2 rounded-xl shadow-xs inline-flex items-center gap-1.5">
                      💴 當日預估：¥{getDailyTotalCost(currentDayData).toLocaleString()}
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

                        {/* 中間：垂直線與裝飾圓點 */}
                        <div className="relative flex flex-col items-center">
                          <div className="h-full w-px bg-[#EADEC6] absolute top-0 bottom-0 z-0 group-last:h-4"></div>
                          <div className="w-4.5 h-4.5 rounded-full bg-white border-2 border-[#C75A51] z-10 mt-4.5 flex items-center justify-center shadow-xs">
                            <div className="w-2 h-2 rounded-full bg-[#C75A51]"></div>
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
                            <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
                              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-[#F2ECE1] text-[#593E30]">
                                {spot.tagName || "✨ 自訂"}
                              </span>
                              {spot.cost > 0 && (
                                <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-md">
                                  💴 ¥{Number(spot.cost).toLocaleString()}
                                </span>
                              )}
                              {spot.mapUrl && (
                                <a 
                                  href={spot.mapUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-2.5 py-0.5 rounded-md transition-all"
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
          <div className="bg-[#FCFBF8] border-2 border-[#EADEC6] rounded-2xl w-full max-w-md p-6 shadow-2xl relative transition-all animate-in fade-in zoom-in-95">
            
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
                    className="px-5 py-2 bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl transition-all"
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
          <div className="bg-[#FCFBF8] border-2 border-[#EADEC6] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative transition-all animate-in fade-in zoom-in-95">
            
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
                  className="px-5 py-2 bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl transition-all"
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
          <div className="bg-[#FCFBF8] border-2 border-[#EADEC6] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative transition-all">
            
            <button 
              onClick={() => setIsSettingsOpen(false)} 
              className="absolute top-4 right-4 text-[#8C7D73] hover:text-[#C75A51] p-1.5 rounded-lg hover:bg-[#F3EFE9]"
            >
              <X size={16} />
            </button>

            <h3 className="text-base font-black text-[#593E30] border-b-2 border-[#EADEC6] pb-3 mb-4 flex items-center gap-1.5">
              <span>🔑</span> 串接 Gemini 2.5 API 金鑰
            </h3>

            <p className="text-xs text-[#8C7D73] leading-relaxed mb-4">
              填入您個人的 Google Gemini API Key。填入後，AI 柴犬助理「小柴」將能直接調用真實 AI 模型，即時依照您的想法，重新智能調整和生成精準的日本旅行地圖與花費！
            </p>

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
          <div className="bg-[#FCFBF8] border-2 border-[#EADEC6] rounded-2xl w-full max-w-md p-6 shadow-2xl relative transition-all">
            
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
              您可以直接把整段電子機票通知信、行程明細等文字貼在下方。小柴會自動幫您抽取出發的日期與時間汪！
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
航班: BR198 Taipei (TPE) -> Tokyo (NRT)
出發時間: 2026/07/15 08:30"
                />
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
                  className="px-5 py-2 bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-bold transition-all"
                >
                  開始解析
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
          <div className="bg-[#FCFBF8] border-2 border-[#EADEC6] rounded-2xl w-full max-w-md p-6 shadow-2xl relative transition-all animate-in fade-in zoom-in-95">
            
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
                  className="flex-1 py-2.5 bg-[#C75A51] hover:bg-[#B34D44] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
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

      {/* 精美和風味頁腳 */}
      <footer className="border-t-2 border-[#EADEC6] bg-white mt-12 py-8 text-center text-xs text-[#8C7D73] font-bold space-y-2">
        <div className="flex justify-center items-center gap-2">
          <span>🐕</span>
          <span>OriTour 和風日本旅行助理平台 • 祝您旅途平安愉悅！</span>
        </div>
        <p className="text-[10px] font-medium text-[#BFB8B2]">© 2026 OriTour Studio. 本系統資料會即時同步暫存於您的個人瀏覽器中。</p>
      </footer>

    </div>
  );
}