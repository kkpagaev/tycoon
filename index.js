import keypress from "keypress";
import { renderHand, renderPicker } from "./render.js";

keypress(process.stdin);
 
const selected = [1,3];

const deck = Array.from({length: 14}).map((_, i) => {
  return {
    value: i + 1,
    suit: Math.floor(Math.random() * 4),
  }
}) 

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

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.clear();
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
    }
    if (key.name == "left"|| key.name === "h") {
      current = (current - 1 + deck.length) % deck.length;
    }
    if (key.name == "right" || key.name === "l") {
      current = (current + 1) % deck.length;
    }
  }
  
  const hand = renderHand(deck, selected);
  console.log(
    // renderPicker(current, "_") + "\n" +
    hand + "\n" + renderPicker(current));
});
 
process.stdin.setRawMode(true);
process.stdin.resume();
