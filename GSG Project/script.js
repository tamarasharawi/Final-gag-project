let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDesc = document.getElementById("task-desc").value;
    const taskDeadline = document.getElementById("task-deadline").value;

    const task = {
        id: Date.now(),
        name: taskName,
        desc: taskDesc,
        deadline: taskDeadline,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById("task-form").reset();
    alert("Task added successfully!");
}

function renderTasks() {
    const listContainer = document.getElementById("list-container");

    if (!listContainer) return;

    listContainer.innerHTML = "";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) taskElement.classList.add("completed");

        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.desc}</p>
            <p>Deadline: ${task.deadline}</p>
            <button onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        listContainer.appendChild(taskElement);
    });
}

function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;

    const newName = prompt("Edit Task Name:", task.name);
    const newDesc = prompt("Edit Task Description:", task.desc);
    const newDeadline = prompt("Edit Task Deadline:", task.deadline);

    if (newName) task.name = newName;
    if (newDesc) task.desc = newDesc;
    if (newDeadline) task.deadline = newDeadline;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

document.getElementById("task-form")?.addEventListener("submit", addTask);

if (window.location.pathname.includes("viewTasks.html")) {
    document.addEventListener("DOMContentLoaded", renderTasks);
}

//

/*function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const name = document.getElementById("taskName").value.trim();
    const date = document.getElementById("taskDate").value;
    if (name && date) {
        const tasks = loadTasks();
        tasks.push({ name, date, completed: false });
        saveTasks(tasks);
        alert("Task added!");
        document.getElementById("taskName").value = '';
        document.getElementById("taskDate").value = '';
    } else {
        alert("Please enter a task name and due date.");
    }
}*/

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function renderCompletedTasks() {
    const tasks = loadTasks();
    const completedList = document.getElementById("completedList");
    completedList.innerHTML = '';

    tasks.filter(task => task.completed).forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("completed");
        taskItem.innerHTML = `<h3>${task.name}</h3><p>${task.desc}</p> Due: ${task.deadline}`;
        completedList.appendChild(taskItem);
    });
}


document.addEventListener("DOMContentLoaded", renderCompletedTasks);

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function renderOverdueTasks() {
    const tasks = loadTasks();
    const overdueList = document.getElementById("overdueList");
    overdueList.innerHTML = '';
    const now = new Date();

    tasks.filter(task => !task.completed && new Date(task.deadline) < now).forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("overdue");
        taskItem.style.color = "red";
        taskItem.innerHTML = `<h3>${task.name}</h3><p>${task.desc}</p> Due: ${task.deadline}`;
        overdueList.appendChild(taskItem);
    });
}
document.addEventListener("DOMContentLoaded", renderOverdueTasks);

function loadTasks() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function searchTasks() {
    const searchName = document.getElementById("searchName").value.toLowerCase();
    const searchDate = document.getElementById("searchDate").value;
    const tasks = loadTasks();
    const resultsContainer = document.getElementById("searchResults");

    resultsContainer.innerHTML = ""; 

    const results = tasks.filter(task => {
        const matchesName = searchName && task.name.toLowerCase().includes(searchName);
        const matchesDate = searchDate && task.deadline === searchDate;
        return matchesName || matchesDate;
    });

    if (results.length > 0) {
        results.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task");
            taskElement.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.desc}</p>
                <p>Date: ${task.deadline}</p>
                <p>State: ${task.completed ? "Completed" : "not completed"}</p>
            `;
            resultsContainer.appendChild(taskElement);
        });
    } else {
        resultsContainer.innerHTML = `<p class="no-results">no founded results . </p>`;
    }
}
