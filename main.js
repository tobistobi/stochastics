
let cards = ["","2_of_clubs","2_of_diamonds","2_of_hearts","2_of_spades","3_of_clubs","3_of_diamonds","3_of_hearts","3_of_spades","4_of_clubs","4_of_diamonds","4_of_hearts","4_of_spades","5_of_clubs","5_of_diamonds","5_of_hearts","5_of_spades","6_of_clubs","6_of_diamonds","6_of_hearts","6_of_spades","7_of_clubs","7_of_diamonds","7_of_hearts","7_of_spades","8_of_clubs","8_of_diamonds","8_of_hearts","8_of_spades","9_of_clubs","9_of_diamonds","9_of_hearts","9_of_spades","10_of_clubs","10_of_diamonds","10_of_hearts","10_of_spades","jack_of_clubs2","jack_of_diamonds2","jack_of_hearts2","jack_of_spades2","queen_of_clubs2","queen_of_diamonds2","queen_of_hearts2","queen_of_spades2","king_of_clubs2","king_of_diamonds2","king_of_hearts2","king_of_spades2","ace_of_clubs","ace_of_diamonds","ace_of_hearts","ace_of_spades"];

var noResult = 0;
var firstResult = 0;
var secondResult = 0;
var overallRuns = 0;

const appDiv = document.getElementById('app');
const appCounter = document.getElementById('counter');
const appExplanation = document.getElementById('explanation');
//appDiv.style.backgroundImage = "url('"+cards[45]+".png')";

function CleanUp () {
  appDiv.innerHTML = "";
}

function MakeSequence () {
  console.log("Entering MakeSequence");
  let slots = [];
  for (let i = 0; i < 53; i++) {
    slots.push(99);
  }
  console.log("slots:"+slots);
  for (let index = 1; index < 53; index++) {
    let done = false;
    while (!done) {
      let pos = Math.floor(Math.random()*52)+1;
      if (slots[pos] == 99) {
        slots[pos] = index;
        done = true;
      }
    }
  }
  overallRuns += 1;
  return slots;
}

function CreatePlayground (slots) {
  let firstAce = true;
  for (let index = 1; index < 53; index++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("cardDisplay");
    let posLeft=index*20;
    newDiv.style.left = `${posLeft}px`;
    newDiv.style.zIndex = `${index}`;
    newDiv.style.backgroundImage = "url('"+cards[slots[index]]+".png')"
    if ((slots[index] == 49 || slots[index] == 50 || slots[index] == 51 || slots[index] == 52) && firstAce) {
      newDiv.style.border = "medium solid #00FF00";
      firstAce = false;
    }
    if (slots[index] == 1 || slots[index] == 49) {
      newDiv.style.border = "medium solid #0000FF";
    }
    appDiv.appendChild(newDiv);
  }
}

function CheckResult(slots) {
  let posAce1 = slots.indexOf(49);
  let posAce2 = slots.indexOf(50);
  let posAce3 = slots.indexOf(51);
  let posAce4 = slots.indexOf(52);
  let posClub2 = slots.indexOf(1);

  if (posAce1 < posAce2 && posAce1 < posAce3 && posAce1 < posAce4) {
    if (posClub2 == posAce1+1) {
      firstResult += 1;
    } else {
      noResult += 1;
    }
  } else if (posAce2 < posAce1 && posAce2 < posAce3 && posAce2 < posAce4) {
    if (posClub2 == posAce2+1) {
      firstResult += 1;
    } else  if (posAce1 == posAce2+1) {
      secondResult += 1;
    } else {
      noResult += 1;
    }
  } else if (posAce3 < posAce1 && posAce3 < posAce2 && posAce3 < posAce4) {
    if (posClub2 == posAce3+1) {
      firstResult += 1;
    } else  if (posAce1 == posAce3+1) {
      secondResult += 1;
    } else {
      noResult += 1;
    }
  } else if (posAce4 < posAce1 && posAce4 < posAce2 && posAce4 < posAce3) {
    if (posClub2 == posAce4+1) {
      firstResult += 1;
    } else  if (posAce1 == posAce4+1) {
      secondResult += 1;
    } else {
      noResult += 1;
    }
  }

  appCounter.innerHTML = `Trys: ${overallRuns}  - False: ${noResult}  - Case1: ${firstResult}  - Case2: ${secondResult}`;

}

function main() {
  CleanUp();
  let cardSequence = MakeSequence();
  CreatePlayground(cardSequence);
  CheckResult(cardSequence);
  console.log(cardSequence);
}

setInterval(function(){main()},10);
appExplanation.innerHTML = "Case1 ist Kreuz-Zwei nach erstem Ass, Case2 ist Kreuz-Ass nach erstem Ass."
