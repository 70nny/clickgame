const colors = [
    '#d1515d', '#3c264f', '#1f7fd2', '#79ac19', '#0789ff', '#ff622b', '#b1660c', '#9d2653', '#30c7ec'
];

let my_interval;

const start = document.querySelector('#startbtn'),
      screens = document.querySelectorAll('.screen'),
      timebtns = document.querySelector('#time-list'),
      timer = document.querySelector('#time'),
      board = document.querySelector('#board');
let time = 0,
    score = 0;
start.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timebtns.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRC();
    }
});

function startGame () {
    if (my_interval){ //clear interval
        clearInterval(my_interval);
    }
    score = 0; 
    timer.parentNode.classList.remove('hide'); //show timer
    board.innerHTML = ''; //clear board
    setTime(time);
    createRC();
    my_interval = setInterval(decreaseTime, 1000);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
     
}

function setTime (value){
    timer.innerHTML = `00:${value}`;
}

function createRC() {
    let size = getNum(10, 60);
    const qqq = board.getBoundingClientRect();
    const x =  getNum(size, (qqq.width - size));
    const y = getNum(size, (qqq.height - size));

    const color = colors[Math.floor(Math.random() * colors.length)];

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.background = color;
    circle.style.boxShadow = `0 0 3px ${color}, 0 0 10px ${color}`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function getNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function finishGame () {
    timer.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет:<span class="primary">${score}</span></h1><div class="restart">Restart</div>`;
    let restart = document.querySelector('.restart');
    restart.addEventListener('click', () => {
        screens[1].classList.remove('up'); //to screen 2
    });
}