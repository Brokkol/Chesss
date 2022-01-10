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
  console.log(moveFrom, "from");
  console.log(moveTo, "to");
  if (moveTo == 0){
    if(moveFrom.name == "D"){
      let d = 0;
      for(let i = 0; i <= Math.abs(moveObj.from.x - moveObj.to.x); i++){
        if (moveObj.from.y < moveObj.to.x && moveObj.from.y < moveObj.to.y) {
          if (desk[moveObj.from.y + i][moveObj.from.x + i] !== 0) {
            d++
          }
        }
        if (moveObj.from.y > moveObj.to.x && moveObj.from.y < moveObj.to.y) {
          if (desk[moveObj.from.y - i][moveObj.from.x + i] !== 0) {
            d++
          }
        }
        if (moveObj.from.y < moveObj.to.x && moveObj.from.y > moveObj.to.y) {
          if (desk[moveObj.from.y + i][moveObj.from.x - i] !== 0) {
            d++
          }
        }
        if (moveObj.from.y > moveObj.to.x && moveObj.from.y > moveObj.to.y) {
          if (desk[moveObj.from.y - i][moveObj.from.x - i] !== 0) {
            d++
          }
        }
      }
    if (d == 0) {
      howToMove();
    }
    if (desk[moveObj.to.y + 1][moveObj.to.x + 1] !== 0 && moveFrom.y > moveTo.x && moveFrom.y > moveTo.y && moveFrom.color !== desk[moveObj.to.y + 1][moveObj.to.x + 1].color && d < 2 && d !== 0){
      howToMove();
      desk[moveObj.to.y + 1][moveObj.to.x + 1] = 0;
    }
    if (desk[moveObj.to.y + 1][moveObj.to.x - 1] !== 0 && moveFrom.y < moveTo.x && moveFrom.y > moveTo.y && moveFrom.color !== desk[moveObj.to.y + 1][moveObj.to.x - 1].color && d < 2 && d !== 0){
      howToMove();
      desk[moveObj.to.y + 1][moveObj.to.x - 1] = 0;
    }
    if (desk[moveObj.to.y - 1][moveObj.to.x + 1] !== 0 && moveFrom.y > moveTo.x && moveFrom.y < moveTo.y && moveFrom.color !== desk[moveObj.to.y - 1][moveObj.to.x + 1].color && d < 2 && d !== 0){
      howToMove();
      desk[moveObj.to.y - 1][moveObj.to.x + 1] = 0;
    }
    if (desk[moveObj.to.y - 1][moveObj.to.x - 1] !== 0 && moveFrom.y < moveTo.x && moveFrom.y < moveTo.y && moveFrom.color !== desk[moveObj.to.y - 1][moveObj.to.x - 1].color && d < 2 && d !== 0){
      howToMove();
      desk[moveObj.to.y - 1][moveObj.to.x - 1] = 0;
    }
  }
      if(moveObj.from.x + 1 == moveObj.to.x && moveObj.from.y + 1 == moveObj.to.y && moveFrom.color == "black" ||
         moveObj.from.x - 1 == moveObj.to.x && moveObj.from.y + 1 == moveObj.to.y && moveFrom.color == "black"){
          howToMove();
          if (moveObj.to.y == 7 && moveFrom.color == "black"){
            moveFrom.name = "D"; 
            moveFrom.img = '\ue901';
          }
      }
      if(moveObj.from.x + 1 == moveObj.to.x && moveObj.from.y - 1 == moveObj.to.y && moveFrom.color == "white" ||
         moveObj.from.x - 1 == moveObj.to.x && moveObj.from.y - 1 == moveObj.to.y && moveFrom.color == "white") {
          howToMove();
          if (moveObj.to.y == 0 && moveFrom.color == "white"){
            moveFrom.name = "D"; 
            moveFrom.img = '\ue901';
          }
      }
      if (moveObj.from.x + 2 == moveObj.to.x && moveObj.from.y + 2 == moveObj.to.y && desk[moveObj.from.y+1][moveObj.from.x+1].color !== moveFrom.color){
          howToMove();
          desk[moveObj.from.y+1][moveObj.from.x+1] = 0;
          if (moveObj.to.y == 7 && moveFrom.color == "black" || moveObj.to.y == 0 && moveFrom.color == "white"){
            moveFrom.name = "D"; 
            moveFrom.img = '\ue901';
          }
      }
      if (moveObj.from.x - 2 == moveObj.to.x && moveObj.from.y + 2 == moveObj.to.y && desk[moveObj.from.y+1][moveObj.from.x-1].color !== moveFrom.color){
          howToMove();
          desk[moveObj.from.y+1][moveObj.from.x-1] = 0;
          if (moveObj.to.y == 7 && moveFrom.color == "black" || moveObj.to.y == 0 && moveFrom.color == "white"){
            moveFrom.name = "D"; 
            moveFrom.img = '\ue901';
          }
      }
      if (moveObj.from.x + 2 == moveObj.to.x && moveObj.from.y - 2 == moveObj.to.y && desk[moveObj.from.y-1][moveObj.from.x+1].color !== moveFrom.color){
          howToMove();
          desk[moveObj.from.y-1][moveObj.from.x+1] = 0;
          if (moveObj.to.y == 7 && moveFrom.color == "black" || moveObj.to.y == 0 && moveFrom.color == "white"){
            moveFrom.name = "D"; 
            moveFrom.img = '\ue901';
          }
      }
      if (moveObj.from.x - 2 == moveObj.to.x && moveObj.from.y - 2 == moveObj.to.y && desk[moveObj.from.y-1][moveObj.from.x-1].color !== moveFrom.color){
          howToMove();
          desk[moveObj.from.y-1][moveObj.from.x-1] = 0;
          if (moveObj.to.y == 7 && moveFrom.color == "black" || moveObj.to.y == 0 && moveFrom.color == "white"){
            moveFrom.name = "D"; 
            moveFrom.img = '\ue901';
          }
    
  }  
    
        // if (moveTo.color == "black") {
        //   document.getElementById("min").innerHTML = "Белые";
        // } else document.getElementById("min").innerHTML = "Черные";
        // $('#exampleModal').modal("show");
        // setTimeout(init, 1000);
  } else console.log('u r wrong')
}
  
  function checkObstacles(){
    
    return d
  }
  
  let desk =[[0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0]];
             let P_B_1 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_2 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_3 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_4 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_7 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_5 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_6 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_8 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_9 = {name: 'P', color: "black", img: '\ue92c'};
             let P_B_10 ={name: 'P', color: "black", img: '\ue92c'};
             let P_B_11 ={name: 'P', color: "black", img: '\ue92c'};
             let P_B_12 ={name: 'P', color: "black", img: '\ue92c'};
             let P_W_1 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_2 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_3 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_4 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_7 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_5 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_6 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_8 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_9 = {name: 'P', color: "white", img: '\ue92c'};
             let P_W_10 ={name: 'P', color: "white", img: '\ue92c'};
             let P_W_11 ={name: 'P', color: "white", img: '\ue92c'};
             let P_W_12 ={name: 'P', color: "white", img: '\ue92c'};
  
  
function init(){
      desk[0][1]=P_B_1;
      desk[0][3]=P_B_2;
      desk[0][5]=P_B_3;
      desk[0][7]=P_B_4;
      desk[1][0]=P_B_5;
      desk[1][2]=P_B_6;
      desk[1][4]=P_B_7;
      desk[1][6]=P_B_8;
      desk[2][1]=P_B_9;
      desk[2][3]=P_B_10;
      desk[2][5]=P_B_11;
      desk[2][7]=P_B_12;
      desk[5][0]=P_W_1;
      desk[5][2]=P_W_2;
      desk[5][4]=P_W_3;
      desk[5][6]=P_W_4;
      desk[6][1]=P_W_5;
      desk[6][3]=P_W_6;
      desk[6][5]=P_W_7;
      desk[6][7]=P_W_8;
      desk[7][0]=P_W_9;
      desk[7][2]=P_W_10;
      desk[7][4]=P_W_11;
      desk[7][6]=P_W_12;
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(desk[i][j].name !== "P"){
                desk[i][j] = 0;
            }
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