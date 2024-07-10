import chalk from "chalk";

const suits = ["♠", "♥", "♦", "♣"];

const faces = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

function renderCard(value, suit) {
  if (value === 14) {
    return [
      ["╭","─","─","─","─","─","─","─","╮"],
      ["│"," ","J"," "," "," "," "," ","│"],
      ["│"," ","o"," "," "," "," "," ","│"],
      ["│"," ","k"," "," "," "," "," ","│"],
      ["│"," ","e"," "," "," "," "," ","│"],
      ["│"," ","r"," "," "," "," "," ","│"],
      ["╰","─","─","─","─","─","─","─","╯"],
    ];
  }
  if (value === 10) {
    return [
      ["╭","─","─","─","─","─","─","─","╮"],
      ["│","1","0"," "," "," "," "," ","│"],
      ["│"," "," "," "," "," "," "," ","│"],
      ["│"," "," "," ",suits[suit]," "," "," ","│"],
      ["│"," "," "," "," "," "," "," ","│"],
      ["│"," "," "," "," "," ","1","0","│"],
      ["╰","─","─","─","─","─","─","─","╯"],
    ];

  }

  const face = faces[value - 1];
  return [
    ["╭","─","─","─","─","─","─","─","╮"],
    ["│",face," "," "," "," "," "," ","│"],
    ["│"," "," "," "," "," "," "," ","│"],
    ["│"," "," "," ",suits[suit]," "," "," ","│"],
    ["│"," "," "," "," "," "," "," ","│"],
    ["│"," "," "," "," "," "," ",face,"│"],
    ["╰","─","─","─","─","─","─","─","╯"],
  ];
}


function pixelMatrixJoin(arr) {
  console.log(arr[0].length)
  console.log(arr.map((r)=> r.join("")).join("\n"))
}
const emptyLine = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

function colored(card, color) {
  return card.map((row) => row.map((c) => color(c)))
}
/**
 * @param {{ value: number, suit: number }} deck 
 * @param {number[]} selected 
 * @param {number[]} heat 
 * @returns {string} 
 */
export function renderHand(deck, selected, heat) {
  const cards = deck.map((c, i) => {
    const isSelected = selected.includes(i)
    if (isSelected) {
      return [
        ...renderCard(c.value, c.suit),
        emptyLine,
        emptyLine,
      ]
    } else {
      if (!heat[i]) {
        return [
          emptyLine,
          emptyLine,
          ...(colored(renderCard(c.value, c.suit), chalk.gray)),
        ]
      }
      return [
        emptyLine,
        emptyLine,
        ...renderCard(c.value, c.suit),
      ]
    }
  })
  const rows = [];

  for (let i = 0; i < 9; i++) {
    rows.push(
      cards.map((card) => card[i])
    );
  }

  const r = rows.map((row) => {
    return row.reduce((acc, value) => {
      if (value[0][0] === " ") {
        return acc.concat(value.slice(3));
      } else {
        return acc.slice(0, -3).concat(value);
      }
    })
  });

  return r.map((r)=> r.join("")).join("\n");
}

export function renderPicker(pos, ch) {
  let res = "    ";
  for (let i = 0; i < pos; i++) {
    res += "      ";
  }
  res += ch ? ch : "^";

  return res;
}


