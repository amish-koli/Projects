let btn=document.querySelector(".btn");
let text=document.querySelector("p");
let check=1
btn.addEventListener("click",()=>{
    if(check==1){
    text.textContent="Friend";
    text.style.color="green";
    btn.textContent="Remove friend";
    check=0;
    }
    else{
        text.textContent="Stranger";
        text.style.color="red";
        btn.textContent="Add friend";
        check=1;
    }
});