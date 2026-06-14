let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");

    if(taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskInput.value,
        date: taskDate.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <div class="${task.completed ? 'completed' : ''}">
                    ${task.text}
                </div>

                <div class="task-date">
                    ${task.date ? "📅 " + formatDate(task.date) : ""}
                </div>
            </div>

            <div class="task-buttons">
                <button class="complete-btn"
                    onclick="toggleComplete(${index})">
                    ✓
                </button>

                <button class="edit-btn"
                    onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index) {

    const newTask = prompt("Edit task:", tasks[index].text);

    if(newTask !== null) {
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(dateTime) {

    const date = new Date(dateTime);

    return date.toLocaleString();
}