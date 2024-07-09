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
      "╭───────╮",
      "│ J     │",
      "│ o     │",
      "│ k     │",
      "│ e     │",
      "│ r     │",
      "╰───────╯"
    ];
  }
  if (value === 10) {
    return [
      "╭───────╮",
      `│10     │`,
      "│       │",
      `│   ${suits[suit]}   │`,
      "│       │",
      `│     10│`,
      "╰───────╯"
    ];

  }

  const face = faces[value - 1];
  return [
    "╭───────╮",
    `│${face}      │`,
    "│       │",
    `│   ${suits[suit]}   │`,
    "│       │",
    `│      ${face}│`,
    "╰───────╯"
  ];
}


/**
 * @param {{ value: number, suit: number }} deck 
 * @param {number[]} selected 
 * @returns {string} 
 */
export function renderHand(deck, selected) {
  const cards = deck.map((c, i) => {
    const isSelected = selected.includes(i)
    if (isSelected) {
      return [
        ...renderCard(c.value, c.suit),
        "         ",
        "         ",
      ]
    } else {
      return [
        "         ",
        "         ",
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

  return rows.map((row) => {
    return row.reduce((acc, value) => {
      if (value[0] === " ") {
        return acc + value.slice(3);
      } else {
        return acc.slice(0, -3) + value;
      }
    })
  }).join("\n");
}

export function renderPicker(pos, ch) {
  let res = "    ";
  for (let i = 0; i < pos; i++) {
    res += "      ";
  }
  res += ch ? ch : "^";

  return res;
}


