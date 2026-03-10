let elems=document.querySelectorAll(".elems")
let fullElems=document.querySelectorAll(".fullElems")
let backbtn=document.querySelectorAll(".fullElems .back-btn i")
elems.forEach(function(elem){
    elem.addEventListener("click",function(){
        let fullElem=fullElems[elem.id]
        fullElem.style.display="block";
    })
})
backbtn.forEach(function(elem){
    elem.addEventListener("click",function(){
        setTimeout(function(){
            let fullElem=fullElems[elem.id]
        fullElem.style.display="none";},300)
    })
})