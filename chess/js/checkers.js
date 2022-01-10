$('.menu-nav__btn').on('click',function(e){
  e.preventDefault;
  $('.menu-nav').toggleClass('menu-nav_active');
  $('.color').toggleClass('color_active');
  $('.main-nav__link').toggleClass('main-nav__link_active');
});

const DEBUG = false;
const cnv = document.getElementById("canvas");
let ctx = cnv.getContext('2d');
ctx.font = "20px icomoon";
let w = cnv.width / 8;
let h = cnv.height / 8;
let colorDark = "#b58863";
let moveObj = {from: 0, to: 0};
let clickCounter = 0;
let numberOfMoves = 0;
let btn = document.getElementById("btn");


cnv.addEventListener("click", e => {
  let X = e.offsetX;
  let Y = e.offsetY;
  let cnvW = cnv.clientWidth / 8;
  let cnvH = cnv.clientHeight / 8;
  for(let i = 1; i < 9; i++){
    for(let j = 1; j < 9; j++){
      if ( X > cnvW * (i-1) && X < cnvW * (i) &&
           Y > cnvH * (j-1) && Y < cnvH * (j)) {
             console.log(i,j);
          if(clickCounter == 0){
            moveObj.from = {x: i-1, y: j-1};
            if (desk[j-1][i-1] !== 0) {
              clickCounter++;
            }
          }else if(clickCounter == 1){
            clickCounter = 0;
            moveObj.to = {x: i-1, y: j-1};
          }
        break;
      }
    }
  } 
  if (clickCounter == 0 && numberOfMoves % 2 == 0 && desk[moveObj.from.y][moveObj.from.x].color == "black" || 
      clickCounter == 0 && numberOfMoves % 2 !== 0 && desk[moveObj.from.y][moveObj.from.x].color == "white"){
    move();
    drawBoard(colorDark);
    drawLetterArr(colorDark)
    if (numberOfMoves % 2 == 0){
      document.documentElement.style.setProperty("--borderColor", "10px solid black")
    }else document.documentElement.style.setProperty("--borderColor", "10px solid white")

  }
})
function howToMove(){
  desk[moveObj.to.y][moveObj.to.x] = desk[moveObj.from.y][moveObj.from.x];
  desk[moveObj.from.y][moveObj.from.x] = 0;
  numberOfMoves++;
}

function move(){
  let moveFrom = desk[moveObj.from.y][moveObj.from.x];
  let moveTo = desk[moveObj.to.y][moveObj.to.x];
  let count = 0;
  if (DEBUG){
      $('#exampleModal').modal("show");
      console.log("--1")
      console.log("--2")    
  }
  console.log(moveFrom, moveTo);
  if (moveTo == 0 || moveFrom.color !== moveTo.color){
    if (moveFrom.name == "P" && Math.abs(moveObj.to.y - moveObj.from.y) == 1 && moveObj.from.x == moveObj.to.x && moveTo == 0
    ||  moveFrom.name == "P" && Math.abs(moveObj.to.y - moveObj.from.y) == 2 && moveObj.from.x == moveObj.to.x && moveTo == 0
    ||  moveFrom.name == "P" && Math.abs(moveObj.to.y - moveObj.from.y) == 1 && Math.abs(moveObj.to.x - moveObj.from.x) == 1 && moveTo !== 0){

      if (moveFrom.movecount == 0){
        moveFrom.movecount ++;
        howToMove();
        console.log(moveFrom);
      } else if (moveObj.to.y == moveObj.from.y+1  && moveFrom.color == "black" || moveObj.to.y == moveObj.from.y-1 && moveFrom.color == "white"){
        moveFrom.movecount ++;
        console.log(desk[moveObj.from.y][moveObj.from.x]);
        howToMove();
      }
    }
    if (moveFrom.name == "R" && moveObj.from.y == moveObj.to.y || moveObj.from.x == moveObj.to.x && moveFrom.name == "R") {
      for (let i = moveObj.from.y; i < moveObj.to.y; i++){
        let place = desk[i][moveObj.from.x] 
        if (place !== 0){
          count++;
          if (DEBUG){
            console.log("--1");
          }
        }
      }
      for (let i = moveObj.from.x; i < moveObj.to.x; i++){
        let place = desk[moveObj.from.y][i] 
        if (place !== 0){
          count++;
        }
      }
      if (moveObj.from.y < moveObj.to.y || moveObj.from.x < moveObj.to.x){
        for (let i = moveObj.to.y; i < moveObj.from.y; i--){
          let place = desk[i][moveObj.from.x] 
          if (place !== 0){
            count++;
          }
        }
        for (let i = moveObj.to.x; i < moveObj.from.x; i--){
          let place = desk[moveObj.from.y][i]; 
          if (place !== 0){
            count++;
          }
        }
      }
      if (count < 1){
        howToMove();
      }
    }
    if (moveFrom.name == "K" && Math.abs(moveObj.from.y-moveObj.to.y) == 2 && Math.abs(moveObj.from.x-moveObj.to.x) == 1 ||
    moveFrom.name == "K" && Math.abs(moveObj.from.x-moveObj.to.x) == 2 && Math.abs(moveObj.from.y-moveObj.to.y) == 1) {
      howToMove();
    }
    if (moveFrom.name == "C" && Math.abs(moveObj.to.x - moveObj.from.x) == Math.abs(moveObj.to.y - moveObj.from.y)) {
      if (moveObj.from.x < moveObj.to.x && moveObj.from.y < moveObj.to.y){
        for(let i = 1; i < moveObj.to.x-moveObj.from.x; i++){
          if (desk[moveObj.from.y+i][moveObj.from.x+i] !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.x > moveObj.to.x && moveObj.from.y < moveObj.to.y){
        for(let i = 1; i < moveObj.from.x-moveObj.to.x; i++){
          if (desk[moveObj.from.y+i][moveObj.from.x-i] !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.x < moveObj.to.x && moveObj.from.y > moveObj.to.y){
        for(let i = 1; i < moveObj.to.x-moveObj.from.x; i++){
          if (desk[moveObj.from.y-i][moveObj.from.x+i] !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.x > moveObj.to.x && moveObj.from.y > moveObj.to.y){
        for(let i = 1; i < moveObj.from.x-moveObj.to.x; i++){
          if (desk[moveObj.from.y-i][moveObj.from.x-i] !== 0){
            count++;
          }
        }
      }
      if (count < 1){
        howToMove();
      }
    }
    if (moveFrom.name == "Q" && moveObj.from.y == moveObj.to.y || moveObj.from.x == moveObj.to.x && moveFrom.name == "Q"
    || moveFrom.name == "Q" && Math.abs(moveObj.to.x - moveObj.from.x) == Math.abs(moveObj.to.y - moveObj.from.y)) {
      if (moveObj.from.x < moveObj.to.x && moveObj.from.y < moveObj.to.y){
        for(let i = 1; i < moveObj.to.x-moveObj.from.x; i++){
          if (desk[moveObj.from.y+i][moveObj.from.x+i] !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.x > moveObj.to.x && moveObj.from.y < moveObj.to.y){
        for(let i = 1; i < moveObj.from.x-moveObj.to.x; i++){
          if (desk[moveObj.from.y+i][moveObj.from.x-i] !== 0){
            count++;        
          }
        }
      }
      if (moveObj.from.x < moveObj.to.x && moveObj.from.y > moveObj.to.y){
        for(let i = 1; i < moveObj.to.x-moveObj.from.x; i++){
          if (desk[moveObj.from.y-i][moveObj.from.x+i] !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.x > moveObj.to.x && moveObj.from.y > moveObj.to.y){
        for(let i = 1; i < moveObj.from.x-moveObj.to.x; i++){
          if (desk[moveObj.from.y-i][moveObj.from.x-i] !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.y > moveObj.to.y && moveObj.from.x == moveObj.to.x || moveObj.from.x > moveObj.to.x && moveObj.from.y == moveObj.to.y){
        for (let i = moveObj.from.y+1; i < moveObj.to.y; i++){
          let place = desk[i][moveObj.from.x] 
          if (place !== 0){
            count++;
          }
        }
        for (let i = moveObj.from.x+1; i < moveObj.to.x; i++){
          let place = desk[moveObj.from.y][i] 
          if (place !== 0){
            count++;
          }
        }
      }
      if (moveObj.from.y < moveObj.to.y && moveObj.from.x == moveObj.to.x || moveObj.from.x < moveObj.to.x && moveObj.from.y == moveObj.to.y){
        for (let i = moveObj.to.y+1; i < moveObj.from.y; i--){
          let place = desk[i][moveObj.from.x] 
          if (place !== 0){
            count++;
          }
        }
        for (let i = moveObj.to.x+1; i < moveObj.from.x; i--){
          let place = desk[moveObj.from.y][i]; 
          if (place !== 0){
            count++;
          }
        }
      }
      if (count < 1){
        howToMove();
      }
    }
    if (moveFrom.name == "King" && Math.abs(moveObj.from.x - moveObj.to.x) == 1 && Math.abs(moveObj.from.y - moveObj.to.y) <= 1 
    || moveFrom.name == "King" && Math.abs(moveObj.from.y - moveObj.to.y) == 1 && Math.abs(moveObj.from.x - moveObj.to.x) <= 1) {
      howToMove();
    }
    if (moveTo.name == "King" && moveFrom.color !== moveTo.color){
      drawBoard(colorDark);
      drawLetterArr(colorDark);

      if (moveTo.color == "black") {
        document.getElementById("min").innerHTML = "белые";
      } else document.getElementById("min").innerHTML = "черные";
      $('#exampleModal').modal("show");
      setTimeout(init, 1000);
    }
  } else console.log('u r wrong')
}



let desk =[[0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0]];
           let P_B_1 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_2 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_3 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_4 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_7 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_5 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_6 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_B_8 = {name: 'P', movecount: 0, color: "black", img: '\ue92c'};
           let P_W_1 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_2 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_3 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_4 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_7 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_5 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_6 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let P_W_8 = {name: 'P', movecount: 0, color: "white", img: '\ue92c'};
           let R_B_1 = {name: 'R', color: "black", img: '\ue92d'};
           let R_B_8 = {name: 'R', color: "black", img: '\ue92d'};
           let R_W_1 = {name: 'R', color: "white", img: '\ue92d'};
           let R_W_8 = {name: 'R', color: "white", img: '\ue92d'};
           let K_B_2 = {name: 'K', color: "black", img: '\ue92b'};
           let K_B_7 = {name: 'K', color: "black", img: '\ue92b'};
           let K_W_2 = {name: 'K', color: "white", img: '\ue92b'};
           let K_W_7 = {name: 'K', color: "white", img: '\ue92b'};
           let C_B_3 = {name: 'C', color: "black", img: '\ue92a'};
           let C_B_6 = {name: 'C', color: "black", img: '\ue92a'};
           let C_W_3 = {name: 'C', color: "white", img: '\ue92a'};
           let C_W_6 = {name: 'C', color: "white", img: '\ue92a'};
           let Q_B_4 = {name: 'Q', color: "black", img: '\ue901'};
           let Q_W_4 = {name: 'Q', color: "white", img: '\ue901'};
           let King_B_5 = {name: 'King', color: "black", img: '\ue900'};
           let King_W_5 = {name: 'King', color: "white", img: '\ue900'};


function init(){
  desk[0][0]= R_B_1;
  desk[0][1]= K_B_2;
  desk[0][2]= C_B_3;
  desk[0][3]= Q_B_4;
  desk[0][4]= King_B_5;
  desk[0][5]= C_B_6;
  desk[0][6]= K_B_7;
  desk[0][7]= R_B_8;

  desk[1][0]= P_B_1;
  desk[1][1]= P_B_2;
  desk[1][2]= P_B_3;
  desk[1][3]= P_B_4;
  desk[1][4]= P_B_5;
  desk[1][5]= P_B_6;
  desk[1][6]= P_B_7;
  desk[1][7]= P_B_8;

  desk[6][0]= P_W_1;
  desk[6][1]= P_W_2;
  desk[6][2]= P_W_3;
  desk[6][3]= P_W_4;
  desk[6][4]= P_W_5;
  desk[6][5]= P_W_6;
  desk[6][6]= P_W_7;
  desk[6][7]= P_W_8;  
  
  desk[7][0]= R_W_1;
  desk[7][1]= K_W_2;
  desk[7][2]= C_W_3;
  desk[7][3]= Q_W_4;
  desk[7][4]= King_W_5;
  desk[7][5]= C_W_6;
  desk[7][6]= K_W_7;
  desk[7][7]= R_W_8;
  for(let i = 2; i < 6; i++){
    for(let j = 0; j < 9; j++){
      desk[i][j] = 0;
    }
  }
}



function drawLetterArr (color){
  ctx.textBaseline = "bottom";
  ctx.font = "1em icomoon";
  let bgcol = color;
  if (bgcol == "#000"){
    ctx.fillStyle = "#fff"
  }else ctx.fillStyle = "#000"
  let l = desk.length;
   
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      if(desk[i][j].color == "black"){
        ctx.fillStyle = "#000"
      }
      if(desk[i][j].color == "white"){
        ctx.fillStyle = "#fff"
      }
      if(desk[i][j].color == "white" && bgcol == "#fff"){
        ctx.fillStyle = "#f00"
      } 
      if(desk[i][j].color == "black" && bgcol == "#000"){
        ctx.fillStyle = "#f00"
      } 
      posX = (i+1)*h - h*0.07;
      posY = j*w + w*0.32;
      if (desk[i][j]) {
        ctx.fillText(desk[i][j].img,posY,posX);
      }
    }
  }
}

function drawRect (x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * w, y * h, w, h);
}

function drawBoard (color) {
  const colorDark = color;
  const colorLight = '#f0d9b5';
  ctx.fillStyle =  colorDark;
  ctx.fillRect(0,0, cnv.width, cnv.height);

  for(let i = 0; i < 8; i += 2){
    for(let j = 0; j < 8; j += 2){
    drawRect(i, j, colorLight);
    drawRect(i+1, j+1, colorLight);
    }
  }
}
$(document).ready(function (e){
  setTimeout(function(){
init();
drawBoard(colorDark);
drawLetterArr(colorDark);},1000);
});

$(window).on('hidden.bs.modal', function() { 
  drawBoard(colorDark);
  drawLetterArr(colorDark);
  console.log('--1');
});

$(document.getElementById('black')).on('click',function(e){
  e.preventDefault;
  colorDark = '#000';
  drawBoard(colorDark);
  drawLetterArr(colorDark);
  sessionStorage.setItem('color', colorDark);
  console.log(sessionStorage.getItem('color'));
}) ;

$(document.getElementById('white')).on('click',function(e){
  e.preventDefault;
  colorDark = '#fff';
  drawBoard(colorDark);
  drawLetterArr(colorDark);
  sessionStorage.setItem('color', '#fff');
});

$(document.getElementById('blue')).on('click',function(e){
  e.preventDefault;
  colorDark = '#4392F1';
  drawBoard(colorDark);
  drawLetterArr(colorDark);
  sessionStorage.setItem('color', '#4392F1');
});

$(document.getElementById('pink')).on('click',function(e){
  e.preventDefault;
  colorDark = '#FF00FF';
  drawBoard(colorDark);
  drawLetterArr(colorDark);
  sessionStorage.setItem('color', '#4392F1');
});