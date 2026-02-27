const hscore=document.querySelector("#high-score");
const score=document.querySelector("#score");
const time=document.querySelector("#time");
let highScore=localStorage.getItem("highScore")||0;

let currentScore=0;
let startTime=`0-0`;
const stbutton=document.querySelector(".start-btn");
const rstbutton=document.querySelector(".restart-btn");
const modal=document.querySelector(".modal");
const startgame=document.querySelector(".start-game");
const gameover=document.querySelector(".game-over");
let timeintervalid=null;

stbutton.addEventListener("click",()=>{
    modal.style.display="none";
    intervalId=setInterval(()=>{
        render();
        },300);
    timeintervalid=setInterval(()=>{
        let [min,sec]=startTime.split("-").map(Number);
        if(sec==59){
            min+=1;
            sec=0;
        }
        else{
            sec+=1;
        }
        startTime=`${min}-${sec}`;
        time.textContent=startTime;
    },1000);
})

rstbutton.addEventListener("click",restartGame);

function restartGame(){
    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.forEach((segment)=>{
        const block=blocks[`${segment.x},${segment.y}`];
        block.classList.remove("filld");
    })
    currentScore=0;
    startTime=`0-0`;

    score.textContent=currentScore;
    time.textContent=startTime;
    hscore.textContent=highScore;

    intervalId=setInterval(()=>{
    render();
    },300);
    modal.style.display="none";
    direction="down";
    snake=[{x:1,y:3}];
    food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
}


hscore.textContent=highScore;

const blockWidth=30;
const blockHeight=30;
const board=document.querySelector(".game-board");
const cols=Math.floor(board.clientWidth/blockWidth);
const rows=Math.floor(board.clientHeight/blockHeight);
let intervalId=null;
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
const blocks=[];
let snake=[
    {x:1,y:3}
];
let direction="down";
for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
    const block=document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row},${col}`]=block;//key value pair: ex 2,2
}
}
function render(){
        let head=null;

        blocks[`${food.x},${food.y}`].classList.add("food");

    
        if(direction==="left"){
            head={x:snake[0].x,y:snake[0].y-1};
        }
        else if(direction==="right"){
            head={x:snake[0].x,y:snake[0].y+1};
        }
        else if(direction==="up"){
            head={x:snake[0].x-1,y:snake[0].y};
        }
        else if(direction==="down"){
            head={x:snake[0].x+1,y:snake[0].y};
        }
    //wall collision
        if(head.x<0||head.x>=rows||head.y<0||head.y>=cols)
            {
                modal.style.display="flex";
                startgame.style.display="none";
                gameover.style.display="flex";
                clearInterval(intervalId);
                return;
            }
        
            snake.forEach((segment)=>{
                const block=blocks[`${segment.x},${segment.y}`];
                block.classList.remove("filld");
            })
        
            snake.unshift(head);
            
        //food eaten
        if(head.x===food.x&&head.y===food.y)
            {
                blocks[`${food.x},${food.y}`].classList.remove("food");
                food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
                blocks[`${food.x},${food.y}`].classList.add("food");
                snake.unshift(head);
                
                currentScore+=10;
                score.textContent=currentScore;
                if(currentScore>highScore){
                    highScore=currentScore;
                    localStorage.setItem("highScore",highScore.toString());
                }
            }
                else{
                    snake.pop();
                }
                
                snake.forEach((segment)=>{
                    const block=blocks[`${segment.x},${segment.y}`];
                    block.classList.add("filld");
                })
        }

        addEventListener("keydown",(event)=>{
            if(event.key==="ArrowLeft"&&direction!=="right"){
                direction="left";
            }
            else if(event.key==="ArrowRight"&&direction!=="left"){
                direction="right";
            }
            else if(event.key==="ArrowUp"&&direction!=="down"){
            direction="up";
            }
            else if(event.key==="ArrowDown"&&direction!=="up"){
            direction="down";
            }
                                            })



