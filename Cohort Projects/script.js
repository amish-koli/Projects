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
renderTasks();

form.addEventListener("submit",function(e){
    e.preventDefault();

  if(taskinput.value.trim() === ''){
        alert("Name pls");
        return;
    }
        currenttask.push({
        taskname:taskinput.value,
        taskdetails:textarea.value,
        mark:markimp.checked
        })
    renderTasks();

        taskinput.value = "";
        textarea.value = "";
        markimp.checked = false;

    localStorage.setItem("tasks", JSON.stringify(currenttask))
})
function renderTasks(){
    let sum=``
    if(currenttask.length === 0){
        tasklist.innerHTML = "<p class='no-task'>Add a Task Please🥹</p>";
        return;
    }
    currenttask.forEach(
        function(elem,idx){    
        sum=sum+`<div class="task-item" class="fade" class="fadd" id=${idx}>
        <h3 class="task-title">${elem.taskname}${elem.mark ? `<span class="imp">*</span>` : ``}</h3>
        <input type="checkbox" name="" id="task-itemcheck">
        </div>`
    })
    
    tasklist.innerHTML=sum;
}

tasklist.addEventListener("change", function(e){

    if(e.target.type === "checkbox"){

        let taskElem = e.target.parentElement
        let taskId = Number(taskElem.id)

        taskElem.classList.add("fade")

        setTimeout(function(){

            currenttask.splice(taskId,1)

            renderTasks()

            localStorage.setItem("tasks", JSON.stringify(currenttask))

        },400)

    }

})
}
Todo();
function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
dailyPlanner();
