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

const board = [
  {
    value: 5,
    suit: 0
  },
  {
    value: 5,
    suit: 1
  },
]
let current = 0;
let heat = calculateHeat(selected, deck, board);

function getBoardValue(board) {
  return board.find((c) => c.value !== 14)?.value || 14;
}

function calculateHeat(selected, deck, board) {
  if (board.length > 0 && selected.length === board.length) {
    return deck.map((_, i) => selected.includes(i));
  }
  const selectedCards = selected.map((c) => deck[c].value);
  if (selectedCards.length !== 0) {
    return deck.map((c) => {
      return !(!selectedCards.includes(c.value) && c.value !== 14)
    }, [])
  }
  const boardValue = getBoardValue(board);
  
  let res = deck;

  if (board.length > 1) {
    const jokerCount = deck.filter((c) => c.value === 14).length;
    for (let i = 0; i < 13; i++) {
      const count = deck.filter((c) => c.value === i).length;
      if (count + jokerCount >= board.length) {
        res = deck.map((c) => c.value === i);
      }
    }
    const count = deck.filter((c) => c.value === 14).length;
    if (count >= board.length) {
      res = deck.map((c) => c.value === 14);
    }
  } else {
    res = deck.map((c) => c.value > boardValue)
  }

  return res;
}

function render() {
  const hand = renderHand(deck, selected, heat);
  if (heat[current] === false) {
    goRight();
  }
  console.clear();
  console.log(
    // renderPicker(current, "_") + "\n" +
    renderBoard(board) + "\n" +
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
      heat = calculateHeat(selected, deck, board);
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
