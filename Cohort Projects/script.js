function OpenPages() {
    let elems = document.querySelectorAll(".elems")
    let fullElems = document.querySelectorAll(".fullElems")
    let backbtn = document.querySelectorAll(".fullElems .back-btn i")
    elems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            let fullElem = fullElems[elem.id]
            fullElem.style.display = "block";
        })
    })
    backbtn.forEach(function (elem) {
        elem.addEventListener("click", function () {
            setTimeout(function () {
                let fullElem = fullElems[elem.id]
                fullElem.style.display = "none";
            }, 300)
        })
    })
}
OpenPages();
let form=document.querySelector(".task-form form");
let taskinput=document.querySelector(".task-form form input");
let textarea=document.querySelector(".task-form form input");

form.addEventListener("submit",function(e){
    e.preventDefault();
    console.log(e);
    console.log(taskinput);
    
})


