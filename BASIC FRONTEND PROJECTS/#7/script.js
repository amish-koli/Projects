let arr=[
    {dp:"https://i.pinimg.com/1200x/7c/8a/c4/7c8ac4b251e6f83c99add19ee911ea60.jpg"
        ,story:"https://i.pinimg.com/1200x/7c/8a/c4/7c8ac4b251e6f83c99add19ee911ea60.jpg"
    },
    {dp:"https://i.pinimg.com/736x/02/65/cb/0265cb7d937e73f88daf0997171d0870.jpg"
        ,story:"https://i.pinimg.com/736x/02/65/cb/0265cb7d937e73f88daf0997171d0870.jpg"
    },
    {
        dp:"https://i.pinimg.com/736x/6d/f8/8e/6df88e666581e97846642b292cf0713f.jpg"
        ,story:"https://i.pinimg.com/736x/6d/f8/8e/6df88e666581e97846642b292cf0713f.jpg"
    }
    ,
    {
        dp:"https://i.pinimg.com/736x/7b/d3/a1/7bd3a1cd7287a0bbc9976f64d69391ae.jpg"
        ,story:"https://i.pinimg.com/736x/7b/d3/a1/7bd3a1cd7287a0bbc9976f64d69391ae.jpg"
    }
    ,
    {
        dp:"https://i.pinimg.com/736x/df/7f/a2/df7fa2cff0842633760a97b45b3bff51.jpg"
        ,story:"https://i.pinimg.com/736x/df/7f/a2/df7fa2cff0842633760a97b45b3bff51.jpg"
    }
    ,
    {
        dp:"https://i.pinimg.com/736x/d3/85/8b/d3858bc2ab7af8d343845053bdc0e0ab.jpg"
        ,story:"https://i.pinimg.com/736x/d3/85/8b/d3858bc2ab7af8d343845053bdc0e0ab.jpg"
    }
]
let clutter=""
arr.forEach(function(el,id){
    clutter+=`<div class="profile">
    <img src="${el.dp}" id="${id}" alt="">
</div>`
});
document.querySelector(".story").innerHTML=clutter;
document.querySelector(".story").addEventListener("click",function(dets){
    let val=arr[dets.target.id].story
    document.querySelector("#full").style.display="block";
    document.querySelector("#full").style.backgroundImage=`url(${val})`
    setTimeout(function(){
        document.querySelector("#full").style.display="none";
    },2000)
})
