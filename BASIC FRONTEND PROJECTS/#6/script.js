let elem=document.querySelectorAll(".elem");
let images = document.querySelectorAll("#one, #two, #three, #four, #five");
let body=document.querySelector("body");
elem.forEach(function(val){
    val.addEventListener("mousemove", function(d){
        let x = d.clientX;
        val.childNodes[3].style.left = x+ "px";
        body.style.cursor = "none";
    })
    val.addEventListener("mouseleave", function(){
        val.childNodes[3].style.opacity = "0";
        body.style.cursor = "none";
    })
    val.addEventListener("mouseenter", function(){
        val.childNodes[3].style.opacity = "1";
        body.style.cursor = "none";
    });
});
 