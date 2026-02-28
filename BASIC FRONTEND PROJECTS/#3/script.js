let btn=document.querySelector(".btn");
let text=document.querySelector("p");
let check=1
btn.addEventListener("click",()=>{
    if(check==1){
    text.textContent="Friend";
    btn.textContent="Remove friend";
    check=0;
    }
    else{
        text.textContent="Stranger";
        btn.textContent="Add friend";
        check=1;
    }
});