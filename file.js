const container = document.querySelector('.container');
const price = document.getElementById('price')
const count = document.getElementById('count');
const seats = document.querySelectorAll('.rows .seat:not(.occupied)');
const movieSelect = document.getElementById('movie-selector');


const price_text = document.querySelector('p.text');
const alt_text = document.querySelector('p.alt-text');
alt_text.style.display = "none";
var ticketPrice = -1;


document.getElementById('movie-selector').addEventListener('change', e => {
    ticketPrice = e.target.value;
    updatePriceOnSelect();
});


function updatePriceOnSelect() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

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