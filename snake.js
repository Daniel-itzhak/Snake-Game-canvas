var canvas,ctx;
var  gridSize = 20;
// This sets some variables for demonstration purposes

  // The current position of the Snake's head, as xy coordinates
 var currentPosition = [100, 100];
 var interval1;
 var interval2;
 var keyCode;
 var a =[];
 var snake = [80,100,100,100];
 var stam=0;
var getBigger =false;
var preKeyCode = "";
var score = 0;
var rA=[];
canvas = $('#canvas');
ctx = canvas[0].getContext('2d');
var num=1;
var scoreEl = $('.score'); 
scoreEl.text("score: "+score);
for(var i=0;i<canvas.width();i+=gridSize){
    if(num==2){
        num=1;
    }
    else{
        num=2
    }
    for(var j=0;j<canvas.height();j+=gridSize){
        if(num==1){
            ctx.fillRect(i,j,gridSize,gridSize)
            ctx.fillStyle ="blue";
            ctx.fill();
            num=2;
        }
        else{
            ctx.fillRect(i,j,gridSize,gridSize)
            ctx.fillStyle = "white";
            ctx.fill();
            num=1;
        }
    }
}
num=2;
ctx.fillRect(0,0,gridSize,gridSize)
ctx.fillStyle ="blue";
for(var i=0;i<canvas.width();i+=gridSize){
    
    if(num==1){
        ctx.fillRect(i,0,gridSize,gridSize)
        ctx.fillStyle ="blue";
        ctx.fill();
        num=2;
    }
    else{
        ctx.fillRect(i,0,gridSize,gridSize)
        ctx.fillStyle ="white";
        ctx.fill();
        num=1;
    }
}
function createApples(){
    for(var i=0;i<4;i++){
    
        var rand1 = Math.floor(Math.random()*800);
        rand1 = rand1-rand1%20;
        var rand2 = Math.floor(Math.random()*600);
        rand2 = rand2-rand2%gridSize;
        if(snake.indexOf(rand1)==-1 || snake.indexOf(rand2)==-1){
            ctx.fillStyle ="rgb(72, 252, 72)";
            ctx.fill();
            ctx.fillRect(rand1, rand2, gridSize, gridSize);
            a.push(rand1);
            a.push(rand2);
        }
        else{
            i--;
        }
    }
}

createApples();

ctx.fillStyle = "yellow";
ctx.fill();

ctx.fillRect(currentPosition[0], currentPosition[1], gridSize, gridSize);



$(document).keydown(
    function(event) {

        if(keyCode==undefined)
             interval1 = setInterval(function(){moveSnake(keyCode)},100);
    
        if(event == null)
        {
          keyCode = window.event.keyCode;
        }
        else
        {
            if(event.key=='ArrowLeft' || event.key=='ArrowRight' ||event.key=='ArrowUp' ||event.key=='ArrowDown'){
                if(preKeyCode==''){
                    keyCode = event.key;
                }
                else if((preKeyCode == 'ArrowLeft'&& event.key!='ArrowRight')||
                    (preKeyCode == 'ArrowRight'&& event.key!='ArrowLeft')||
                    (preKeyCode == 'ArrowUp'&& event.key!='ArrowDown')||
                    (preKeyCode == 'ArrowDown'&& event.key!='ArrowUp'))
                        keyCode = event.key;
    
            }
        }
       
    
      }
);

function moveSnake(keyCode){
    if(snake[0] %(gridSize*2)==0 &&snake[1]%(gridSize*2)==0){
        ctx.fillStyle ="blue";
        ctx.fill();
        ctx.fillRect(snake[0], snake[1], gridSize, gridSize);
    }
    else if(snake[0] %(gridSize*2)!=0 &&snake[1]%(gridSize*2)!=0){
        ctx.fillStyle ="blue";
        ctx.fill();
        ctx.fillRect(snake[0], snake[1], gridSize, gridSize);
    }
    else if(snake[0] %(gridSize*2)!=0 &&snake[1]%(gridSize*2)==0){
        ctx.fillStyle ="white";
        ctx.fill();
        ctx.fillRect(snake[0], snake[1], gridSize, gridSize);
    }
    else if(snake[0] %(gridSize*2)==0 &&snake[1]%(gridSize*2)!=0){
        ctx.fillStyle ="white";
        ctx.fill();
        ctx.fillRect(snake[0], snake[1], gridSize, gridSize);
    }
    switch(keyCode)
    {
      // left
    case 'ArrowLeft':
        currentPosition[0] = currentPosition[0] - gridSize;
        break;
      // up
    case 'ArrowUp':
        currentPosition[1] = currentPosition[1] - gridSize;
        break;
      // right
    case 'ArrowRight':
        currentPosition[0] = currentPosition[0] + gridSize;
        break;

      // down
    case 'ArrowDown':
        currentPosition[1] = currentPosition[1] + gridSize;
        break;

    default:
        break;
    } 
    preKeyCode = keyCode;
    drawSnake(snake,currentPosition[0], currentPosition[1]);
    checkIfGameOver(snake);
    checkIfAteApple();
    
}

function checkIfAteApple(){
    for(var i=0;i<a.length;i+=2){
        if((currentPosition[0]==a[i] && currentPosition[1]==a[i+1])){
            a.splice(i,2);
            getBigger = true;
            score++;
            scoreEl.text("score: "+score);

        }
    }
    if((currentPosition[0]==rA[0] && currentPosition[1]==rA[1])){
        rA.splice(0,2);
        getBigger = true;
        score+=5;
        scoreEl.text("score: "+score);

    }
    if(a.length==0){
        createApples();
    }
}

function drawSnake(snake,x, y){
    if(!getBigger){
        snake.shift();
        snake.shift();
    }
    else{
        getBigger=false;
    }
    if(keyCode=='ArrowLeft' && x<0){
        x = canvas.width()-gridSize;
        currentPosition[0] = canvas.width()-gridSize;
    }
    if(keyCode=='ArrowRight' && x>canvas.width()-gridSize){
        x = 0;
        currentPosition[0] = 0;
    }
    if(keyCode=='ArrowDown' && y>canvas.height()-gridSize){
        y = 0;
        currentPosition[1] = 0;
    }
    if(keyCode=='ArrowUp' && y<0){
        y = canvas.height()-gridSize;
        currentPosition[1] = canvas.height()-gridSize;
    }
    snake.push(x);
    snake.push(y);
    for(var i=0;i<snake.length;i+=2){
        
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.fillRect(snake[i], snake[i+1], gridSize, gridSize);
    }
}

function checkIfGameOver(snake){
    for(var i =0;i<snake.length-3;i+=2){
        if(snake[i]==snake[snake.length-2] && snake[i+1]==snake[snake.length-1]){
            clearInterval(interval1);
            clearInterval(interval2);
            ctx.font = "70px Ariel";
            ctx.textAlign="center";
            ctx.fillStyle ="red";
            ctx.rotate(Math.PI*1/4.5);
            ctx.fillText('Click here to start New Game',500,0);
            canvas.click(function(){
                location.reload();
            });
        }
    }
}

function redAplle(){
    interval2 = setInterval(function(){
        for(var i=0;i<1;i++){
            var rand1 = Math.floor(Math.random()*800);
            rand1 = rand1-rand1%20;
            var rand2 = Math.floor(Math.random()*600);
            rand2 = rand2-rand2%gridSize;
            if((snake.indexOf(rand1)==-1 || snake.indexOf(rand2)==-1)&&(a.indexOf(rand1)==-1 || a.indexOf(rand2)==-1)){
                ctx.fillStyle ="red";
                ctx.fill();
                ctx.fillRect(rand1, rand2, gridSize, gridSize);
                rA.push(rand1);
                rA.push(rand2);
            }
            else{
                i--;
            }
            
        }
        setTimeout(function(){
            if(rA.length>0){
                if(rA[0] %(gridSize*2)==0 &&rA[1]%(gridSize*2)==0){
                    ctx.fillStyle ="blue";
                    ctx.fill();
                    ctx.fillRect(rA[0], rA[1], gridSize, gridSize);
                }
                else if(rA[0] %(gridSize*2)!=0 &&rA[1]%(gridSize*2)!=0){
                    ctx.fillStyle ="blue";
                    ctx.fill();
                    ctx.fillRect(rA[0], rA[1], gridSize, gridSize);
                }
                else if(rA[0] %(gridSize*2)!=0 &&rA[1]%(gridSize*2)==0){
                    ctx.fillStyle ="white";
                    ctx.fill();
                    ctx.fillRect(rA[0], rA[1], gridSize, gridSize);
                }
                else if(rA[0] %(gridSize*2)==0 &&rA[1]%(gridSize*2)!=0){
                    ctx.fillStyle ="white";
                    ctx.fill();
                    ctx.fillRect(rA[0], rA[1], gridSize, gridSize);
                }
                rA.pop();
                rA.pop();
            }
        },5000);
    },10000);
}
redAplle();