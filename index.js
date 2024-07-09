import keypress from "keypress";
import { renderHand, renderPicker } from "./render.js";

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
let heat = [];

function calculateHeat(selected, deck) {
  const selectedCards = selected.map((c) => deck[c].value);
  return deck.reduce((acc, c, i) => {
    if (!selectedCards.includes(c.value)) {
      return [...acc, i];
    }
    return acc
  }, [])
}

function render() {
  
  const hand = renderHand(deck, selected, heat);
  console.clear();
  console.log(
    // renderPicker(current, "_") + "\n" +
    hand + "\n" + renderPicker(current));

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
      current = (current - 1 + deck.length) % deck.length;
    }
    if (key.name == "right" || key.name === "l") {
      current = (current + 1) % deck.length;
    }
     // deck = createDeck();
  }
  render();
});
 
process.stdin.setRawMode(true);
process.stdin.resume();
render();
