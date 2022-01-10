const DEBUGER = true;
const cnv = document.getElementById("canvas");
let ctx = cnv.getContext('2d');
let w = cnv.width / 8;
let h = cnv.height / 8;
let colorDark = "#b58863";


$(document.getElementById('queen')).on('click',function(e){
    e.preventDefault;
})

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

let desk =[[0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0]];

function drawQueens () {
    ctx.textBaseline = "bottom";
    ctx.font = "1em icomoon";
    ctx.fillStyle = "#000";
    let counter = 0;
    let q1 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q2 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q3 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q4 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q5 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q6 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q7 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    let q8 = {name: 'Q', img: '\ue901', posY: 0, posX: 0};
    desk[0][0] = q1;
    ctx.fillText(desk[0][0].name, w*0.32, h);
    for (let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(i == q1.posX || j == q1.posY || 
               i == q2.posX || j == q2.posY ||
               i == q3.posX || j == q3.posY ||
               i == q4.posX || j == q4.posY ||
               i == q5.posX || j == q5.posY ||
               i == q6.posX || j == q6.posY ||
               i == q7.posX || j == q7.posY ||
               i == q8.posX || j == q8.posY){
                console.log(i,j)
            }else{  for(let k = 1; k < 7; k++){
                        if (desk[j+1][i+1] !== 0){
                        count++;
                        }
                    }
                
                counter++; 
                pX = (i+1)*h - h*0.07;
                pY = j*w + w*0.32;
                
                if (counter == 1){
                    let pX = i*h
                    q2 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q2)
                    desk[i][j] = q2;
                }
                if (counter == 2){
                    q3 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q3)
                    desk[i][j] = q3;
                }
                if (counter == 3){
                    q4 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q4)
                    desk[i][j] = q4;
                }
                if (counter == 4){
                    q5 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q5)
                    desk[i][j] = q5;
                }
                if (counter == 5){
                    q6 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q6)
                    desk[i][j] = q6;
                }
                if (counter == 6){
                    q7 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q7)
                    desk[i][j] = q7;
                }
                if (counter == 7){
                    q8 = {name: 'Q', img: '\ue901', posX: i, posY: j}
                    console.log (counter, q8)
                    desk[i][j] = q8;
                }
                
                ctx.fillText(desk[i][j].name, pY, pX)
            }
        }
    }
}
// просто каждый раз проверять не опасен ли один ферзь для другого
//и пробовать ставить на каждой клетке
drawBoard(colorDark);
drawQueens();