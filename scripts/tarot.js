const DECKSIZE = 52;
const OPENINGHAND = 4;

class Card {
  constructor (value, rank, suit, major) {
    this.value = value;
    this.rank = rank;
    this.suit = suit;
    if (major) {
      this.name = this.rank + '. ' + this.suit;
    } else {
      this.name = this.rank + ' of ' + this.suit;
    }
  }
}

class Deck {
  constructor () {
    this.ranks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'King', 'Queen'];
    this.suits = ['Wands', 'Pentacles', 'Cups', 'Swords']
    this.majorArcana = ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'];
    this.cards = [];
    for (let s = 0; s < this.suits.length; s++) {
      for (let r = 0; r < this.ranks.length; r++) {
        this.cards.push(new Card(r + 1, this.ranks[r], this.suits[s], false));
      }
    }
    for (let m = 0; m < this.majorArcana.length; m++) {
      this.cards.push(new Card(m, m, this.majorArcana[m], true));
    }
    this.shuffle();
  }
  shuffle () {
    let i = this.cards.length;
    let temp;
    while (i > 1) {
      let rand = Math.floor(Math.random() * i);
      i -= 1;

      temp = this.cards[i];
      this.cards[i] = this.cards[rand];
      this.cards[rand] = temp;
    }
  }
  search (...terms) { // TODO
    for (let t of terms) {
      for (let c of this.cards) {
        console.log(Object.keys(c).forEach(key => c[key]));
        console.log(t);
      }
    }
  }
}

let deck = new Deck();

let btn = document.querySelector('button');
btn.addEventListener('click', revealCards);

function revealCards() {
  let hand = [];
  while (hand.length < OPENINGHAND) {
    hand.push(deck.cards.pop());
  }
  let h1 = document.querySelector('h1');
  h1.textContent = 'You revealed:';
  let ul = document.querySelector('ul');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  for (let card of hand) {
    let li = document.createElement('li');
    li.textContent = card.name;
    ul.appendChild(li);
  }
  btn.textContent = 'Start over';
}

/*
let hand = [];

while (hand.length < OPENINGHAND) {
  hand.push(deck.cards.pop());
}

let ul = document.querySelector('ul');

for (let card of hand) {
  let li = document.createElement('li');
  li.textContent = card.name;
  ul.appendChild(li);
}
*/
