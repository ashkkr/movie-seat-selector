const container = document.querySelector('.container');
const price = document.getElementById('price')
const count = document.getElementById('count');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie-selector');


const price_text = document.querySelector('p.text');
const alt_text = document.querySelector('p.alt-text');
alt_text.style.display = "none";
var ticketPrice = -1;

populateUI();


function setMovieData(data) {
    localStorage.setItem('MovieIndex', data.target.selectedIndex);
    localStorage.setItem('MoviePrice', data.target.value);
}

document.getElementById('movie-selector').addEventListener('change', e => {
    ticketPrice = e.target.value;
    updatePriceOnSelect();
    setMovieData(e);
});

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const movieIndex = localStorage.getItem('MovieIndex');
    ticketPrice = localStorage.getItem('MoviePrice');
    if (ticketPrice !== null && selectedSeats !== null) price.innerText = ticketPrice * selectedSeats.length;



    if (movieIndex !== null) movieSelect.selectedIndex = movieIndex;

    if (selectedSeats !== null) {
        count.innerText = selectedSeats.length;
        selectedSeats.forEach((seat) => {
            seats[seat].classList.add('selected');
        });
    }
}


function updatePriceOnSelect() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const indexOfSeats = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(indexOfSeats));

    count.innerText = selectedSeats.length;
    price.innerText = selectedSeats.length * ticketPrice;
}

container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        if (ticketPrice > 0) {
            e.target.classList.toggle('selected');
            price_text.style.display = "block";
            alt_text.style.display = "none";
            updatePriceOnSelect();
        }
        else {
            price_text.style.display = "none";
            alt_text.style.display = "block";
        }
    }

});