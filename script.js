const symbols = [
  "🍒",
  "🍋",
  "⭐",
  "💎",
  "7️⃣",
  "🍉",
  "🔥",
  "👑",
  "🎯",
  "💰"
];

/* =========================
   DATA
========================= */

let balance = 100000;

let totalSpin = 0;
let totalWin = 0;
let totalLose = 0;
let totalLossMoney = 0;

/* =========================
   ELEMENT
========================= */

const reels = [
  document.getElementById("r1"),
  document.getElementById("r2"),
  document.getElementById("r3"),
  document.getElementById("r4"),
  document.getElementById("r5")
];

const resultText =
document.getElementById("resultText");

/* =========================
   RANDOM SYMBOL
========================= */

function randomSymbol(){

  return symbols[
    Math.floor(
      Math.random() * symbols.length
    )
  ];

}

/* =========================
   UPDATE UI
========================= */

function updateUI(){

  document.getElementById("balance").innerText =
  balance.toLocaleString("id-ID");

  document.getElementById("totalSpin").innerText =
  totalSpin;

  document.getElementById("totalWin").innerText =
  totalWin;

  document.getElementById("totalLose").innerText =
  totalLose;

  document.getElementById("totalLossMoney").innerText =
  totalLossMoney.toLocaleString("id-ID");

}

/* =========================
   START SPIN
========================= */

function startSpin(){

  reels.forEach(reel=>{

    reel.classList.add("spin");

  });

}

/* =========================
   STOP SPIN
========================= */

function stopSpin(){

  reels.forEach(reel=>{

    reel.classList.remove("spin");

  });

}

/* =========================
   SPIN SLOT
========================= */

function spin(){

  const chance =
  Number(
    document.getElementById("chanceInput").value
  ) / 100;

  const bet =
  Number(
    document.getElementById("betInput").value
  );

  const reward =
  Number(
    document.getElementById("rewardInput").value
  );

  /* VALIDASI */

  if(balance < bet){

    resultText.innerText =
    "❌ Saldo tidak cukup";

    return;

  }

  if(chance > 100){

    alert("Peluang tidak boleh lebih dari 100%");
    return;

  }

  /* KURANGI SALDO */

  balance -= bet;

  totalSpin++;
  totalLossMoney += bet;

  updateUI();

  startSpin();

  /* EFEK DELAY */

  setTimeout(()=>{

    const isWin =
    Math.random() < chance;

    /* MENANG */

    if(isWin){

      const same = randomSymbol();

      reels.forEach(reel=>{

        reel.innerText = same;

      });

      balance += reward;

      totalWin++;

      resultText.innerText =
      "🎉 MENANG! Tapi kemenangan kecil sering membuat pemain terus bermain.";

      resultText.style.color =
      "#00ff99";

    }

    /* KALAH */

    else{

      reels.forEach(reel=>{

        reel.innerText =
        randomSymbol();

      });

      totalLose++;

      resultText.innerText =
      "❌ KALAH! Banyak pemain terus bermain demi mengejar kekalahan.";

      resultText.style.color =
      "#ff4d6d";

    }

    stopSpin();

    updateUI();

  },1800);

}

/* =========================
   MINI GAME
========================= */

/* TEBAK ANGKA */

function guessGame(){

  const number =
  Math.floor(Math.random()*5)+1;

  const player =
  Math.floor(Math.random()*5)+1;

  if(number === player){

    document.getElementById("miniResult").innerText =
    "🎲 Menang kecil! Inilah yang sering membuat pemain merasa akan terus beruntung.";

  }

  else{

    document.getElementById("miniResult").innerText =
    "🎲 Kalah! Kekalahan kecil berulang dapat menjadi kerugian besar.";

  }

}

/* COIN FLIP */

function coinFlip(){

  const flip =
  Math.random() < 0.5;

  if(flip){

    document.getElementById("miniResult").innerText =
    "🪙 HEADS! Menang sesaat tidak menjamin keuntungan jangka panjang.";

  }

  else{

    document.getElementById("miniResult").innerText =
    "🪙 TAILS! Bahkan peluang 50:50 tetap bisa membuat orang rugi jika terus bermain.";

  }

}

/* LUCKY SPIN */

function luckySpin(){

  const random =
  Math.random();

  if(random < 0.2){

    document.getElementById("miniResult").innerText =
    "🎯 Jackpot kecil muncul! Sistem sering memberi kemenangan kecil agar pemain bertahan.";

  }

  else{

    document.getElementById("miniResult").innerText =
    "🎯 Tidak beruntung! Banyak pemain mencoba terus karena merasa hampir menang.";

  }

}

/* BOMB GAME */

function bombGame(){

  const safe =
  Math.random() < 0.3;

  if(safe){

    document.getElementById("miniResult").innerText =
    "💣 Kotak aman! Tetapi kemenangan acak sering membuat pemain ketagihan.";

  }

  else{

    document.getElementById("miniResult").innerText =
    "💣 BOOM! Kekalahan mendadak membuat banyak pemain mencoba kembali.";

  }

}

/* ADDICTION DEMO */

function addictionDemo(){

  document.getElementById("miniResult").innerText =
  "📉 Banyak pemain berkata 'sekali lagi pasti balik modal', lalu terus kehilangan uang lebih banyak.";

}

/* JACKPOT RUSH */

function jackpotRush(){

  const jackpot =
  Math.random() < 0.05;

  if(jackpot){

    document.getElementById("miniResult").innerText =
    "🔥 JACKPOT! Jackpot sangat jarang terjadi tetapi digunakan untuk menarik pemain.";

  }

  else{

    document.getElementById("miniResult").innerText =
    "🔥 Tidak jackpot! Banyak pemain terus mencoba demi hadiah besar yang sangat kecil peluangnya.";

  }

}

/* =========================
   AUTO EFFECT
========================= */

setInterval(()=>{

  reels.forEach(reel=>{

    if(!reel.classList.contains("spin")){

      reel.style.transform =
      `translateY(${Math.random()*4}px)`;

    }

  });

},500);

/* =========================
   BUTTON
========================= */

document
.getElementById("spinBtn")
.addEventListener("click",spin);

/* =========================
   START
========================= */

updateUI();