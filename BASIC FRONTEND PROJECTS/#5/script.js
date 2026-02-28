let body=document.querySelector("body");
let c=document.querySelector(".cursor");
body.addEventListener("mousemove",(dets)=>{
    let x=dets.clientX;
    let y=dets.clientY;
    c.style.left=`${x}px`;
    console.log(dets);
    c.style.top=`${y}px`;

});