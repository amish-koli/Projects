function OpenPages() {
  let elems = document.querySelectorAll(".elems");
  let fullElems = document.querySelectorAll(".fullElems");
  let backbtn = document.querySelectorAll(".fullElems .back-btn i");
  elems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      let fullElem = fullElems[elem.id];
      fullElem.style.display = "block";
    });
  });
  backbtn.forEach(function (elem) {
    elem.addEventListener("click", function () {
      setTimeout(function () {
        let fullElem = fullElems[elem.id];
        fullElem.style.display = "none";
      }, 300);
    });
  });
}
OpenPages();
function Todo() {
  let currenttask = [];

  let savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    currenttask = savedTasks;
  }

  let form = document.querySelector(".task-form form");
  let taskinput = document.querySelector(".task-form form input");
  let textarea = document.querySelector(".task-form form textarea");
  let markimp = document.querySelector(
    ".task-form form .task-checkbox-div input",
  );
  let tasklist = document.querySelector(".task-list");
  renderTasks();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (taskinput.value.trim() === "") {
      alert("Name pls");
      return;
    }
    currenttask.push({
      taskname: taskinput.value,
      taskdetails: textarea.value,
      mark: markimp.checked,
    });
    renderTasks();

    taskinput.value = "";
    textarea.value = "";
    markimp.checked = false;

    localStorage.setItem("tasks", JSON.stringify(currenttask));
  });
  function renderTasks() {
    let sum = ``;
    if (currenttask.length === 0) {
      tasklist.innerHTML = "<p class='no-task'>Add a Task Please🥹</p>";
      return;
    }
    currenttask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task-item" class="fade" class="fadd" id=${idx}>
        <h3 class="task-title">${elem.taskname}${elem.mark ? `<span class="imp">*</span>` : ``}</h3>
        <input type="checkbox" name="" id="task-itemcheck">
        </div>
        </div>
        `;
    });
    tasklist.innerHTML = sum;
  }
  
  
  function attachToggle(item) {
    let btn = item.querySelector(".detail-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      let id = btn.getAttribute("data-id");
      let detailDiv = document.getElementById("detail-" + id);
      let icon = btn.querySelector("i");
      detailDiv.classList.toggle("open");
      icon.classList.toggle("ri-arrow-down-s-line");
      icon.classList.toggle("ri-arrow-up-s-line");
    });
  }
  tasklist.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
      let taskElem = e.target.parentElement;
      let taskId = Number(taskElem.id);

      taskElem.classList.add("fade");

      setTimeout(function () {
        currenttask.splice(taskId, 1);

        renderTasks();

        localStorage.setItem("tasks", JSON.stringify(currenttask));
      }, 400);
    }
  });
}
Todo();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();
function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(
    ".fullElems .motivation-container .moti-card .moti-quote h2",
  );
  var motivationAuthor = document.querySelector(
    ".fullElems .motivation-container .moti-card .moti-author h1",
  );
  var btn = document.querySelector(
    ".fullElems .motivation-container .moti-card .btn",
  );
  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes");
    let data = await response.json();
    let random = data.quotes[Math.floor(Math.random() * data.limit)];
    btn.addEventListener("click", function () {
      let ran = data.quotes[Math.floor(Math.random() * data.limit)];
      motivationQuoteContent.innerHTML = ran.quote;
      motivationAuthor.innerHTML = ran.author;
    });
    motivationQuoteContent.innerHTML = random.quote;
    motivationAuthor.innerHTML = random.author;
  }

  fetchQuote();
}
motivationalQuote();
function pomoDoro() {
  let timer = document.querySelector(
    ".fullElems .pomo-container .pomo-box .pomo-timer h1",
  );
  let session = document.querySelector(
    ".fullElems .pomo-container .pomo-box .pomo-header ",
  );
  let startbtn = document.querySelector(
    ".fullElems .pomo-container .pomo-box .pomo-btn .btn-start",
  );
  let pausebtn = document.querySelector(
    ".fullElems .pomo-container .pomo-box .pomo-btn .btn-pause",
  );
  let resetbtn = document.querySelector(
    ".fullElems .pomo-container .pomo-box .pomo-btn .btn-reset",
  );

  let totalSeconds = 25 * 60;
  let timerinterval = null;
  let worksession = true;
  let sound = new Audio("audio/ronaldo.mp3");
  let sound2 = new Audio("audio/ronaldo2.mp3"); // link your file

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerinterval);

    if (worksession) {
      timerinterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerinterval);
          worksession = false;
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--green)";
          totalSeconds = 5 * 60;
          sound.play();
          sound.volume = 100;
        }
      }, 1000);
    } else {
      timerinterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerinterval);
          worksession = true;
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--red)";
          totalSeconds = 25 * 60;
          sound2.play();
          sound2.volume = 100;
        }
      }, 1000);
    }
  }

  startbtn.addEventListener("click", startTimer);

  function pauseTimer() {
    clearInterval(timerinterval);
  }

  pausebtn.addEventListener("click", pauseTimer);

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerinterval);
    updateTimer();
  }
  resetbtn.addEventListener("click", resetTimer);
}
pomoDoro();

function Goals() {
  let goalsData = JSON.parse(localStorage.getItem("goalsData")) || [];

  let selectedCat = "health";
  let selectedPrio = "high";

  let titleInput = document.getElementById("goal-title-input");
  let descInput = document.getElementById("goal-desc-input");
  let dateInput = document.getElementById("goal-date-input");
  let whyInput = document.getElementById("goal-why-input");
  let addBtn = document.getElementById("goals-add-btn");
  let goalsList = document.getElementById("goals-list");

  let catTags = document.querySelectorAll(".goals-container .goal-cat-tag");
  let prioBtns = document.querySelectorAll(".goals-container .prio-btn");

  catTags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      catTags.forEach(function (t) { t.classList.remove("active"); });
      tag.classList.add("active");
      selectedCat = tag.getAttribute("data-cat");
    });
  });

  prioBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      prioBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      selectedPrio = btn.getAttribute("data-prio");
    });
  });

  renderGoals();

  addBtn.addEventListener("click", function () {
    if (titleInput.value.trim() === "") {
      titleInput.style.backgroundColor = "#FFB3DE";
      titleInput.focus();
      setTimeout(function () { titleInput.style.backgroundColor = ""; }, 800);
      return;
    }

    goalsData.push({
      id: Date.now(),
      title: titleInput.value.trim(),
      desc: descInput.value.trim(),
      why: whyInput.value.trim(),
      cat: selectedCat,
      prio: selectedPrio,
      date: dateInput.value,
      progress: 0,
    });

    localStorage.setItem("goalsData", JSON.stringify(goalsData));
    renderGoals();

    titleInput.value = "";
    descInput.value = "";
    whyInput.value = "";
    dateInput.value = "";
  });

  function renderGoals() {
    if (goalsData.length === 0) {
      goalsList.innerHTML = "<p class='goals-empty'>No goals yet. Add one! 🎯</p>";
      return;
    }

    goalsList.innerHTML = "";
    goalsData.forEach(function (goal, idx) {
      let card = document.createElement("div");
      card.className = "goal-card";
      card.setAttribute("data-id", goal.id);

      let dateStr = goal.date
        ? "<span>" + goal.date + "</span>"
        : "<span>No deadline set</span>";

      card.innerHTML =
        '<div class="goal-card-top">' +
          '<div class="goal-card-title">' + goal.title + '</div>' +
          '<div class="goal-card-badges">' +
            '<span class="goal-badge cat-' + goal.cat + '">' + goal.cat + '</span>' +
            '<span class="goal-badge prio-' + goal.prio + '">' + goal.prio + '</span>' +
          '</div>' +
        '</div>' +
        (goal.desc ? '<div class="goal-card-desc">' + goal.desc + '</div>' : '') +
        (goal.why ? '<div class="goal-card-why">' + goal.why + '</div>' : '') +
        '<div class="goal-progress-area">' +
          '<div class="goal-progress-header">' +
            '<span class="goal-progress-label">Progress</span>' +
            '<span class="goal-progress-value" id="pval-' + goal.id + '">' + goal.progress + '%</span>' +
          '</div>' +
          '<div class="goal-progress-track">' +
            '<div class="goal-progress-fill" id="pfill-' + goal.id + '" style="width:' + goal.progress + '%"></div>' +
          '</div>' +
          '<input type="range" class="goal-progress-input" min="0" max="100" value="' + goal.progress + '" data-goalid="' + goal.id + '">' +
        '</div>' +
        '<div class="goal-card-bottom">' +
          '<div class="goal-card-date">Deadline: ' + dateStr + '</div>' +
          '<button class="goal-delete-btn" data-goalid="' + goal.id + '">Delete</button>' +
        '</div>';

      goalsList.appendChild(card);
    });

    // Progress slider events
    let sliders = goalsList.querySelectorAll(".goal-progress-input");
    sliders.forEach(function (slider) {
      slider.addEventListener("input", function () {
        let id = Number(slider.getAttribute("data-goalid"));
        let val = Number(slider.value);
        let goalIdx = goalsData.findIndex(function (g) { return g.id === id; });
        if (goalIdx !== -1) {
          goalsData[goalIdx].progress = val;
          localStorage.setItem("goalsData", JSON.stringify(goalsData));
          document.getElementById("pfill-" + id).style.width = val + "%";
          document.getElementById("pval-" + id).textContent = val + "%";
        }
      });
    });

    // Delete button events
    let deleteBtns = goalsList.querySelectorAll(".goal-delete-btn");
    deleteBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let id = Number(btn.getAttribute("data-goalid"));
        let card = btn.closest(".goal-card");
        card.classList.add("fade-out");
        setTimeout(function () {
          goalsData = goalsData.filter(function (g) { return g.id !== id; });
          localStorage.setItem("goalsData", JSON.stringify(goalsData));
          renderGoals();
        }, 320);
      });
    });
  }
}
Goals();
