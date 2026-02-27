const blockWidth=30;
const blockHeight=30;
const board=document.querySelector(".game-board");
const cols=Math.floor(board.clientWidth/blockWidth);
const rows=Math.floor(board.clientHeight/blockHeight);
let intervalId=null;
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
const blocks=[];
const snake=[
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

    if(head.x<0||head.x>=rows||head.y<0||head.y>=cols)
        {
        alert("Game Over");
        clearInterval(intervalId);
        return;
    }

    snake.forEach((segment)=>{
        const block=blocks[`${segment.x},${segment.y}`];
        block.classList.remove("filld");
    })

    snake.unshift(head);

    if(head.x===food.x&&head.y===food.y)
        {
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
        blocks[`${food.x},${food.y}`].classList.add("food");
        snake.unshift(head);
        }
        else{
            snake.pop();
        }

    snake.forEach((segment)=>{
        const block=blocks[`${segment.x},${segment.y}`];
        block.classList.add("filld");
        })
}
intervalId=setInterval(()=>{
    render();
},400);
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



