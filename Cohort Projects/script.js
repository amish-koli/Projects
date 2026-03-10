let elems=document.querySelectorAll(".elems")
let fullElems=document.querySelectorAll(".fullElems")
let backbtn=document.querySelectorAll(".back-btn")
elems.forEach(function(elem){
    elem.addEventListener("click",function(){
        let fullElem=fullElems[elem.id]
        fullElem.style.display="block";
    })
})
