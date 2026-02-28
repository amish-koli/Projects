let cont=document.querySelector(".container");
let love=document.querySelector("p");
cont.addEventListener("dblclick",()=>{
    love.style.display="flex"; 
    setTimeout(()=>{
        love.style.display="none";
    },1000);
})