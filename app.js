const places = {
  hsr: "高鐵苗栗站",
  fengfu: "臺鐵豐富站",
  houlong: "後龍火車站（海線）",
  venue: "苗栗縣立新港國民中小學"
};

const routeTemplates = {
  outbound: {
    label: "去程",
    steps: {
      hsr: [
        ["抵達高鐵苗栗站", "確認集合時間與接駁資訊，先開啟 Google Maps 取得即時路況。"],
        ["往後龍方向移動", "依地圖指示銜接主要道路，留意活動指標與工作人員引導。"],
        ["接近新港社區", "降低車速或步行速度，注意學校周邊行人與臨停區。"],
        ["抵達活動會場", "依現場動線進入報到區，完成報到後可開始導覽問答。"]
      ],
      fengfu: [
        ["抵達臺鐵豐富站", "出站後確認接駁、步行或計程車方式，先開啟 Google Maps。"],
        ["前往後龍新港", "跟隨地圖往新港國中小方向，沿途注意社區巷道路口。"],
        ["進入校園周邊", "禮讓行人，依活動告示前往指定入口。"],
        ["抵達活動會場", "至服務台報到，確認回程集合點與末班時間。"]
      ],
      houlong: [
        ["抵達後龍火車站（海線）", "出站後先找活動接駁資訊；活動規劃後龍火車站至會場下午 1 點起設接駁車。"],
        ["選擇交通方式", "建議優先搭接駁車；若未遇到接駁班次，可改用計程車或叫車，並用 Google Maps 確認即時路況。"],
        ["前往新港國中小", "搭車時請設定目的地為「苗栗縣立新港國民中小學」，並留意校園周邊臨停、計程車上下車區與交通管制。"],
        ["抵達活動會場", "下車後依活動指標或工作人員指引前往報到區，並先確認回程到後龍站的班次與叫車方式。"]
      ]
    }
  },
  return: {
    label: "回程",
    steps: {
      hsr: [
        ["離開活動會場", "從服務台確認回程接駁或自行前往高鐵苗栗站的建議時間。"],
        ["返回主要道路", "依現場出口動線離開校園，避開人潮集中路段。"],
        ["前往高鐵苗栗站", "開啟 Google Maps 檢查車班與路況，預留進站時間。"],
        ["完成回程", "抵達後確認月台、車次與隨身物品。"]
      ],
      fengfu: [
        ["離開活動會場", "從服務台確認前往臺鐵豐富站的接駁或步行方向。"],
        ["返回新港社區道路", "依活動人員指引離場，留意夜間照明與路口車流。"],
        ["前往臺鐵豐富站", "開啟 Google Maps，檢查列車時間並保留候車緩衝。"],
        ["完成回程", "抵達車站後確認班次與回家路線。"]
      ],
      houlong: [
        ["離開活動會場", "先到服務台確認是否有回後龍火車站的接駁、計程車排班或建議叫車點。"],
        ["確認海線班次", "後龍站為臺鐵海線車站，回程前請先查列車時間，避免錯過班次後等待過久。"],
        ["前往後龍火車站", "用 Google Maps 將目的地設為「後龍火車站」，搭車或叫車時請確認司機知道是海線後龍站。"],
        ["完成回程", "抵達後龍站後確認月台、車次與轉乘方向，夜間請結伴並留意周邊交通。"]
      ]
    }
  }
};

const answers = [
  {
    keys: ["廁所", "洗手間", "化妝室"],
    text: "廁所請依校園內指標前往，若人潮較多，建議詢問服務台最近的可用廁所。"
  },
  {
    keys: ["報到", "集合", "服務台"],
    text: "抵達後請先到活動服務台報到，確認導覽梯次、集合點與回程資訊。"
  },
  {
    keys: ["回程", "回去", "返程"],
    text: "請切換到「回程」模式，再選擇要返回高鐵苗栗站、臺鐵豐富站或後龍火車站，系統會更新步驟與 Google Maps 連結。"
  },
  {
    keys: ["後龍", "海線", "後龍站", "火車站"],
    text: "後龍火車站是臺鐵海線車站。活動規劃後龍火車站到活動會場下午 1 點起設接駁車，建議優先搭接駁；若未遇到班次，可改用計程車或叫車。"
  },
  {
    keys: ["接駁", "接駁車", "巴士", "公車"],
    text: "接駁重點：後龍火車站（海線）到新港國中小，活動規劃下午 1 點起設接駁車。實際班次與候車點請以現場公告、交通圖資與工作人員指引為準。"
  },
  {
    keys: ["停車", "機車", "開車", "汽車", "校椅二路"],
    text: "停車重點：會場周邊將配合人潮開放路邊停車；學校門口校椅二路將配合封路設攤，並開放機車停車。開車請以現場交通管制與停車圖資為準。"
  },
  {
    keys: ["卡司", "樂團", "表演", "演出"],
    text: "活動卡司包含 TRASH、冰球樂團、怕胖團、芒果醬、胡凱兒 Who Cares、無妄合作社。舞台活動自下午 4 點起安排演出流程。"
  },
  {
    keys: ["時間", "幾點", "日期", "活動"],
    text: "活動時間為 2026 年 8 月 22 日星期六，下午 4 點起在後龍新港國中小大操場熱血開唱。"
  },
  {
    keys: ["下雨", "雨", "天氣"],
    text: "若遇雨天，請優先遵循現場人員調整後的集合點。建議準備雨具，並以 Google Maps 檢查即時交通。"
  },
  {
    keys: ["餐", "吃", "水", "飲食"],
    text: "飲食與補水地點以活動公告為準；若需要補給，請先詢問服務台，避免進入非開放區域。"
  },
  {
    keys: ["迷路", "找不到", "方向"],
    text: "請按「更新位置」確認目前狀態，並開啟 Google Maps 導航。若仍不確定，請停在安全位置聯絡活動服務台。"
  }
];

let state = {
  journey: "outbound",
  origin: "hsr",
  step: 0,
  heading: 45
};

const $ = (selector) => document.querySelector(selector);
const stepsEl = $("#steps");
const progressBar = $("#progressBar");
const journeyPill = $("#journeyPill");
const routeSummary = $("#routeSummary");
const stepCount = $("#stepCount");
const mapsLink = $("#mapsLink");
const originSelect = $("#originSelect");
const chatLog = $("#chatLog");
const questionInput = $("#questionInput");
const needle = $("#needle");
const bearingLabel = $("#bearingLabel");

function destinationForState() {
  return state.journey === "outbound" ? places.venue : places[state.origin];
}

function originForState() {
  return state.journey === "outbound" ? places[state.origin] : places.venue;
}

function mapsUrl() {
  const params = new URLSearchParams({
    api: "1",
    origin: originForState(),
    destination: destinationForState(),
    travelmode: "driving"
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function currentSteps() {
  return routeTemplates[state.journey].steps[state.origin];
}

function render() {
  const route = routeTemplates[state.journey];
  const steps = currentSteps();
  state.step = Math.min(state.step, steps.length - 1);

  journeyPill.textContent = route.label;
  routeSummary.textContent = `${originForState()} 前往 ${destinationForState()}`;
  stepCount.textContent = `${state.step + 1} / ${steps.length}`;
  progressBar.style.width = `${((state.step + 1) / steps.length) * 100}%`;
  mapsLink.href = mapsUrl();

  stepsEl.innerHTML = steps.map(([title, copy], index) => `
    <li class="${index === state.step ? "active" : ""}">
      <span class="step-index">${index + 1}</span>
      <span>
        <span class="step-title">${title}</span>
        <span class="step-copy">${copy}</span>
      </span>
    </li>
  `).join("");

  document.querySelectorAll("[data-journey]").forEach((button) => {
    button.classList.toggle("active", button.dataset.journey === state.journey);
  });
  originSelect.value = state.origin;
  updateCompass(state.heading);
}

function updateCompass(degrees) {
  const normalized = ((degrees % 360) + 360) % 360;
  const labels = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  bearingLabel.textContent = labels[Math.round(normalized / 45) % 8];
  needle.style.transform = `rotate(${normalized}deg)`;
}

function addMessage(text, kind = "bot") {
  const node = document.createElement("div");
  node.className = `message ${kind}`;
  node.textContent = text;
  chatLog.append(node);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function answerQuestion(question) {
  const compact = question.trim().toLowerCase();
  const match = answers.find((item) => item.keys.some((key) => compact.includes(key)));
  if (match) return match.text;
  return "這題我先以現場公告為準：請至活動服務台確認最新資訊。導覽中我會持續提供交通、報到、回程與安全提醒。";
}

async function startCamera() {
  const fallback = $("#cameraFallback");
  const video = $("#camera");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    video.srcObject = stream;
    video.classList.add("active");
    fallback.style.opacity = "0";
  } catch {
    addMessage("目前無法啟動相機。你仍可使用路線導覽與 Google Maps；若在 Facebook 內建瀏覽器受限，請改用手機瀏覽器開啟。");
  }
}

function requestOrientation() {
  const orientation = window.DeviceOrientationEvent;
  if (orientation && typeof orientation.requestPermission === "function") {
    orientation.requestPermission().then((permission) => {
      if (permission === "granted") bindOrientation();
    }).catch(() => addMessage("目前無法讀取方位感測器，指南針會維持示意模式。"));
  } else {
    bindOrientation();
  }
}

function bindOrientation() {
  window.addEventListener("deviceorientation", (event) => {
    const heading = event.webkitCompassHeading || (360 - (event.alpha || 0));
    state.heading = heading;
    updateCompass(heading);
  }, true);
}

function locateUser() {
  if (!navigator.geolocation) {
    addMessage("此裝置不支援定位，請直接使用 Google Maps 導航。");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    () => addMessage("已更新目前位置。請以 Google Maps 的即時路線作為主要導航依據。"),
    () => addMessage("目前無法取得位置。請確認定位權限，或直接開啟 Google Maps。"),
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

document.querySelectorAll("[data-journey]").forEach((button) => {
  button.addEventListener("click", () => {
    state.journey = button.dataset.journey;
    state.step = 0;
    render();
  });
});

originSelect.addEventListener("change", (event) => {
  state.origin = event.target.value;
  state.step = 0;
  render();
});

$("#nextStep").addEventListener("click", () => {
  state.step = (state.step + 1) % currentSteps().length;
  render();
});

$("#cameraButton").addEventListener("click", () => {
  startCamera();
  requestOrientation();
});

$("#locateButton").addEventListener("click", locateUser);

$("#askForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = questionInput.value.trim();
  if (!value) return;
  addMessage(value, "user");
  addMessage(answerQuestion(value));
  questionInput.value = "";
});

["後龍站怎麼到會場？", "我要怎麼回程？", "找不到集合點怎麼辦？"].forEach((question) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = question;
  button.addEventListener("click", () => {
    addMessage(question, "user");
    addMessage(answerQuestion(question));
  });
  $("#quickQuestions").append(button);
});

$("#shareButton").addEventListener("click", (event) => {
  event.currentTarget.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`;
});

addMessage("你好，這裡是後龍好望角音樂祭會場導覽。你可以詢問交通、後龍站、報到、回程、廁所或集合點，我會用繁體中文回答。");
render();
