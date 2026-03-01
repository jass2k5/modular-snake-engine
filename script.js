let main = document.querySelector('main');
let info = document.querySelector('.information');
let grid = document.querySelector('.grid');
let score = document.querySelector('.scorecount');
let highscore = document.querySelector('.highscore');
let timer = document.querySelector('.timing');
let hidden = document.querySelector('#hidden');
let reason = document.querySelector('.reason');
let gameovertext = document.querySelector('.gameovertext');
let resetbtn = document.querySelector('#btn');
const blockheight = 50;
const blockwidth = 50;
let cols = Math.floor(grid.clientWidth/blockwidth);
let rows = Math.floor(grid.clientHeight/blockheight);
let total_blocks = Math.floor(cols*rows);
grid.style.gridTemplateColumns = `repeat(${cols},minmax(0px,1fr))`;
grid.style.gridTemplateRows = `repeat(${rows},minmax(0px,1fr))`;
for(let i = 0;i <total_blocks;i++){
    let block = document.createElement('div');
    block.classList.add('blocks');
    block.style.border = '1px solid white'
    grid.appendChild(block);
}

let squares = [...document.querySelectorAll('.blocks')];
let currentsnake = [2,1,0]; //inital position
// let tail = currentsnake.at(-1);
let intervaltime = 200;
let intervalsecond = 1000;
let showtimeid =0;
let timerId = 0;
let seconds = 0;
let mins;
let secs;
let M;
let s;
let direction = 1; //right
let changingdirection = true;
let currentscore = 0;
let currenthighscore = Number(localStorage.getItem('highscore')?? 0); 
highscore.textContent = `High-Score:${currenthighscore}`;

currentsnake.forEach(index => squares[index].classList.add('snake'));

function move(){
    const head = currentsnake[0];
    const nextstep = head+direction;

    //collision
    if((direction === 1 && head%cols === cols-1) ||(direction === -1 && head%cols === 0) 
    ||(direction === cols && head+cols >= total_blocks)||(direction === -cols && head-cols < 0)){
     return gameover();}
    if(squares[nextstep].classList.contains('snake')){
        return ateitself();

    }
    if(squares[nextstep].classList.contains('apple')){
        squares[nextstep].classList.remove('apple');
        GenerateApple();
        currentscore++;
        intervaltime--;
        score.textContent = `Score:${currentscore}`;
        if(currentscore > currenthighscore){
            currenthighscore = currentscore;
            highscore.textContent = `High-Score:${currenthighscore}`;
            localStorage.setItem('highscore',currenthighscore);
        }
    }else{
    let removedtail = currentsnake.pop();
    squares[removedtail].classList.remove('snake');
    }
    const newheadindex = head + direction;
    currentsnake.unshift(newheadindex);
    squares[newheadindex].classList.add('snake');
    changingdirection = true;
}
function GenerateApple(){
    let AppleIndex;

    do{
        AppleIndex = Math.floor(Math.random()*squares.length);
    }while(squares[AppleIndex].classList.contains('snake'));

    squares[AppleIndex].classList.add('apple');
}
GenerateApple();
function clock(){
     seconds++;
     mins = Math.floor(seconds/60);
     secs = seconds%60;
     m = String(mins).padStart(2,'0');
     s = String(secs).padStart(2,'0');
     timer.textContent = `Timing:${m}-${s}`;
}
function control(e){
    if(changingdirection){
    if(e.key === 'ArrowRight' && direction!== -1) {
        direction =1;
        changingdirection = false;}
    else if(e.key === 'ArrowLeft' && direction!== 1){
        direction =-1;
        changingdirection = false;}
    else if(e.key === 'ArrowUp' && direction !== cols){
        direction = -cols;
        changingdirection = false;}
    else if(e.key === 'ArrowDown' && direction!== -cols){ 
        direction = cols;
        changingdirection = false;}}
}
document.addEventListener('keydown',control);

function gameoverdisplay(reasons){
    hidden.style.display = "flex";
    reason.textContent = `${reasons}`;
    gameovertext.textContent = 'GAME OVER!';
    resetbtn.textContent = 'RESET';
    currentsnake.forEach(index => squares[index].classList.remove('snake'));
    squares.forEach(sq => {
    if (sq.classList.contains('apple')) {
        sq.classList.remove('apple');
    }
});
    intervaltime = 200;
    seconds = 0;
    timer.textContent = `Timing:00-00`;
    currentscore = 0;
    score.textContent = `Score:0`;
    direction = 1;
    currentsnake = [2,1,0];
    currentsnake.forEach(index => squares[index].classList.add('snake'));
    GenerateApple();
    
}
function gameover(){
    clearInterval(timerId);
    clearInterval(showtimeid);
    gameoverdisplay("YOU LIKELY HIT THE WALL");
}
function ateitself(){
    clearInterval(timerId);
    clearInterval(showtimeid);
    gameoverdisplay("TRY NOT TO EAT YOURSELD")
}

function startgame(){
    timerId = setInterval(move,intervaltime);
    showtimeid = setInterval(clock,intervalsecond);
}
resetbtn.addEventListener("click",() =>{
    hidden.style.display = "none";
    startgame();
})