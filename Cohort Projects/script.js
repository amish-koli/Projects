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
function Todo(){
let currenttask = []

let savedTasks = JSON.parse(localStorage.getItem("tasks"))

if(savedTasks){
    currenttask = savedTasks
}

let form = document.querySelector(".task-form form")
let taskinput = document.querySelector(".task-form form input")
let textarea = document.querySelector(".task-form form textarea")
let markimp = document.querySelector(".task-form form .task-checkbox-div input")
let tasklist = document.querySelector(".task-list")

renderTasks()
form.addEventListener("submit",function(e){
    e.preventDefault();
    
    currenttask.push({
        taskname:taskinput.value,
        taskdetails:textarea.value,
        mark:markimp.checked
    })

    renderTasks();

    localStorage.setItem("tasks", JSON.stringify(currenttask))
})
function renderTasks(){
    let sum=``

    currenttask.forEach(
        function(elem,idx){    
        sum=sum+`<div class="task-item" id=${idx}>
        <h3 class="task-title">${elem.taskname}${elem.mark ? `<span class="imp">*</span>` : ``}</h3>
        <input type="checkbox" name="" id="task-itemcheck">
        </div>`
    })
    
    tasklist.innerHTML=sum;
}

tasklist.addEventListener("change", function(e){

    if(e.target.type === "checkbox"){
        console.log(e.target.parentElement.id);
        

        let taskId = Number(e.target.parentElement.id)

        currenttask.splice(taskId,1)

        renderTasks()
        taskinput.value = "";
        textarea.value = "";
        markimp.checked = false;
        localStorage.setItem("tasks", JSON.stringify(currenttask))
    }
})
}
Todo();
