const blockWidth=30;
const blockHeight=30;
const board=document.querySelector(".game-board");
const cols=Math.floor(board.clientWidth/blockWidth);
const rows=Math.floor(board.clientHeight/blockHeight);

for(let i=0;i<cols*rows;i++){
    const block=document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
}