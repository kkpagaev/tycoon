import keypress from "keypress";
import { renderBoard, renderHand, renderPicker } from "./render.js";

keypress(process.stdin);
 
const selected = [];

function createDeck() {
  return Array.from({length: 14}).map((_, i) => {
    return {
      value: Math.floor(Math.random() * 14) + 1,
      suit: Math.floor(Math.random() * 4),
    }
  }).sort((a, b) => a.value - b.value)
}
let deck = createDeck();

// const deck = [
//   {
//     value: 1,
//     suit: 3,
//   },
//   {
//     value: 2,
//     suit: 1,
//   },
//   {
//     value: 3,
//     suit: 2,
//   },
//   {
//     value: 4,
//     suit: 1,
//   },
// ]

let current = 0;
let heat = calculateHeat(selected, deck);

function calculateHeat(selected, deck) {
  const selectedCards = selected.map((c) => deck[c].value);
  if (selectedCards.length === 0) {
    return deck.map(() => true);
  }
  return deck.map((c) => {
    return !(!selectedCards.includes(c.value) && c.value !== 14)
  }, [])
}

function render() {
  const hand = renderHand(deck, selected, heat);
  console.clear();
  console.log(
    // renderPicker(current, "_") + "\n" +
    renderBoard([{
      value: 1,
      suit: 0
    },
    {
      value: 1,
      suit: 1
    },
    ]) + "\n" +
    hand + "\n" + renderPicker(current));

}
function goLeft() {
  const nextIndex = heat.findLastIndex((h,i) => i < current && h);
  if (nextIndex !== -1) {
    current = nextIndex;
  }
}
function goRight() {
  const nextIndex = heat.findIndex((h,i) => i > current && h);
  if (nextIndex !== -1) {
    current = nextIndex;
  }
}
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  // console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  const n = parseInt(ch);
  if (!Number.isNaN(n)) {
    if (selected.includes(n)) {
      selected.splice(selected.indexOf(n), 1);
    } else {
      selected.push(n);
    }
  }
  if (key) {
    if (key.name == "space") {
      if (selected.includes(current)) {
        selected.splice(selected.indexOf(current), 1);
      } else {
        selected.push(current);
      }
      heat = calculateHeat(selected, deck);
    }
    if (key.name == "left"|| key.name === "h") {
      goLeft();
    }
    if (key.name == "right" || key.name === "l") {
      goRight();
    }
     // deck = createDeck();
  }
  render();
});
 
process.stdin.setRawMode(true);
process.stdin.resume();
render();
