$(document).ready(function () {
    // Login form
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username === 'admin' && password === '1234') {
            localStorage.setItem('username', username);
            $('#login-container').hide();
            $('#game-container').show();
            ;
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

});

$.getJSON('https://carlosreneas.github.io/endpoints/cartas.json', function (data) {
    var cartas = data || [];
    localStorage.setItem('cartas', JSON.stringify(cartas));

})
const form = document.getElementById('dataForm');
const tBody = document.querySelector('#tbody-cartas');
const buttons = document.querySelectorAll('.contenedor_cartas button');

function addCardToLocalStorage(numeroCarta, carta) {
    const cartasData = JSON.parse(localStorage.getItem('cartas'));
    const index = cartasData.data.findIndex((c) => c.numero === numeroCarta);
    if (index === -1) {
        cartasData.data.push({
            numero: numeroCarta,
            carta: carta,
            valor: 1
        });
    } else {
        cartasData.data[index].valor++;
    }
    localStorage.setItem('cartas', JSON.stringify(cartasData));
    renderTable();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const numeroCarta = document.querySelector('#numero_carta').value;
    const carta = document.querySelector('#carta').value;
    addCardToLocalStorage(numeroCarta, carta);
});

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const numeroCarta = this.getAttribute('numero');
        const carta = this.getAttribute('carta');
        addCardToLocalStorage(numeroCarta, carta);
    });
});


function renderTable() {
    tBody.innerHTML = '';

    const cartasData = JSON.parse(localStorage.getItem('cartas'));

    cartasData.data.sort((a, b) => b.valor - a.valor).forEach((card, index)=> {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${card.numero}</td>
            <td>${card.carta}</td>
            <td>${card.valor}</td>
        `;
        tBody.appendChild(tr);
    });
}