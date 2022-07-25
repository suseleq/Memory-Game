let unshuffled = [
    'fa-dog','fa-dog',
    'fa-cat','fa-cat',
    'fa-horse','fa-horse',
    'fa-otter','fa-otter',
    'fa-hippo','fa-hippo',
    'fa-kiwi-bird','fa-kiwi-bird',
];

let cardOne, cardTwo;
let disableCards = false;
let matched = 0;

// Selections
const backCards = document.querySelectorAll('.back-card');
const cards = document.querySelectorAll('.card');
// Event Listener
document.addEventListener('DOMContentLoaded', shuffle)
cards.forEach(card =>{
    card.addEventListener('click', flip);
});
// Functions
function shuffle(){
    matched = 0;
    let shuffled = unshuffled
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    cards.forEach((card , i) =>{
        card.classList.remove('flip');
        let backCard = card.querySelector('.back-card');
        backCard.classList.remove('visible');
        backCard.classList.remove(backCard.classList[2]);
        card.classList.add('visible');
        backCard.classList.add(shuffled[i]);
    });
}

function flip(e){
    let card = e.target;
    if(!disableCards && cardOne !== card && card.classList[1] !== 'flip'){
        card.classList.add('flip');
        card.addEventListener('animationend', ()=>{
            back = card.querySelector('.back-card');
            card.classList.remove('visible');
            back.classList.add('visible');
        });
        if(!cardOne){
            return cardOne = card;
        }
        disableCards = true;
        cardTwo = card;
        checkCards();
    }
}

function checkCards(){
    let imageOne = cardOne.querySelector('.back-card'),
        imageTwo = cardTwo.querySelector('.back-card');
    if(imageOne.classList[2] == imageTwo.classList[2]){
        matched ++;
        if(matched == 6){
            setTimeout(() => {
                return shuffle();
            }, 1000);
        }
        cardOne = cardTwo = '';
        disableCards = false;
    }else{
        setTimeout(() => {
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        },400)
        setTimeout(() => {
            cardOne.classList.remove('flip', 'shake');
            cardTwo.classList.remove('flip', 'shake');
            cardOne.classList.add('visible');
            cardTwo.classList.add('visible');
            imageOne.classList.remove('visible');
            imageTwo.classList.remove('visible');
            cardOne = cardTwo = '';
            disableCards = false;
        },1400)
    }
}