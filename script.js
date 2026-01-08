// ===== ELEMENTI DOM =====
const music = document.getElementById("music");
const ad = document.getElementById("ad");
const onAir = document.getElementById("onAir");
const messageBox = document.getElementById("message");
const langButtons = document.getElementById("langButtons");

// ===== STATO =====
let demoLang = "it";
let currentLang = "it";

// ===== STREAM RADIO (DEMO) =====
const STREAMS = {
  HOT: "https://tuneyourstore.net/listen/hot/radio.mp3",
  CHILL: "https://tuneyourstore.net/listen/radioalfredo/radio.mp3",
  LOVE: "https://tuneyourstore.net/listen/love/radio.mp3"
};

// ===== ANNUNCI AUDIO =====
const ADS = {
  it: "https://raw.githubusercontent.com/alfiomessina-sketch/annunci/main/annuncio-it.mp3",
  de: "https://raw.githubusercontent.com/alfiomessina-sketch/annunci/main/annuncio-de.mp3",
  en: "https://raw.githubusercontent.com/alfiomessina-sketch/annunci/main/annuncio-en.mp3"
};

// ===== TESTI PER SETTORE =====
const SECTOR_MESSAGES = {
  it: {
    bar: "Offerta speciale oggi al bar!",
    shop: "Promozione esclusiva oggi in negozio!",
    gym: "Allenati con energia! Promo attiva oggi!"
  },
  de: {
    bar: "Sonderangebot heute in der Bar!",
    shop: "Exklusive Aktion heute im Geschäft!",
    gym: "Trainiere mit Energie! Aktion heute!"
  },
  en: {
    bar: "Special offer today at the bar!",
    shop: "Exclusive promotion today in the store!",
    gym: "Train with energy! Promotion today!"
  }
};

// ===== LINGUE VISIBILI IN BASE ALLA DEMO =====
const DEMO_LANGS = {
  it: ["it", "de", "en"],
  de: ["de", "en", "it"],
  en: ["en", "de", "it"]
};

// ===== TRADUZIONE INTERFACCIA =====
const UI_TEXT = {
  it: {
    music: "Musica nel tuo locale",
    ad: "Comunica con i tuoi clienti",
    control: "Controllo semplice",
    voice: "Voce DJ",
    f15: "⏱ Ogni 15 min",
    f30: "⏱ Ogni 30 min",
    f60: "⏱ Ogni 60 min"
  },
  de: {
    music: "Musik im Geschäft",
    ad: "Sprich mit deinen Kunden",
    control: "Einfache Kontrolle",
    voice: "DJ Stimme",
    f15: "⏱ Alle 15 Min",
    f30: "⏱ Alle 30 Min",
    f60: "⏱ Alle 60 Min"
  },
  en: {
    music: "Music in your store",
    ad: "Talk to your customers",
    control: "Simple control",
    voice: "DJ Voice",
    f15: "⏱ Every 15 min",
    f30: "⏱ Every 30 min",
    f60: "⏱ Every 60 min"
  }
};

// ===== FUNZIONI =====
function renderLangButtons() {
  langButtons.innerHTML = "";
  DEMO_LANGS[demoLang].forEach(code => {
    const btn = document.createElement("button");
    btn.textContent = code.toUpperCase();
    btn.onclick = () => currentLang = code;
    langButtons.appendChild(btn);
  });
  currentLang = DEMO_LANGS[demoLang][0];
}

function translateUI() {
  const t = UI_TEXT[demoLang];
  document.getElementById("titleMusic").textContent = t.music;
  document.getElementById("titleAd").textContent = t.ad;
  document.getElementById("titleControl").textContent = t.control;
  document.getElementById("labelVoice").textContent = t.voice;
  document.getElementById("freq15").textContent = t.f15;
  document.getElementById("freq30").textContent = t.f30;
  document.getElementById("freq60").textContent = t.f60;
}

function playRadio(type) {
  if (type === "OFF") {
    music.pause();
    onAir.textContent = "OFF AIR";
    onAir.classList.remove("on");
    return;
  }
  music.src = STREAMS[type];
  music.volume = 0.6;
  music.play();
  onAir.textContent = "ON AIR – " + type;
  onAir.classList.add("on");
}

function playAd() {
  if (!music.src) return;
  music.volume = 0.2;
  ad.src = ADS[currentLang];
  ad.volume = 1;
  ad.play();
  ad.onended = () => music.volume = 0.6;
}

// ===== EVENTI =====
document.querySelectorAll("[data-radio]").forEach(btn => {
  btn.addEventListener("click", () => playRadio(btn.dataset.radio));
});

document.querySelectorAll("[data-sector]").forEach(btn => {
  btn.addEventListener("click", () => {
    messageBox.value = SECTOR_MESSAGES[demoLang][btn.dataset.sector];
  });
});

document.querySelectorAll("[data-demo]").forEach(btn => {
  btn.addEventListener("click", () => {
    demoLang = btn.dataset.demo;
    renderLangButtons();
    translateUI();
    messageBox.value = SECTOR_MESSAGES[demoLang].bar;
  });
});

document.getElementById("playAdBtn").addEventListener("click", playAd);

// ===== INIT =====
renderLangButtons();
translateUI();
messageBox.value = SECTOR_MESSAGES.it.bar;
