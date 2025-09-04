
// Get elements from the DOM
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const dateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');


// Function to add a new task
function addTask() {
    const taskText = taskInput.value;
    const dueDate = dateInput.value;
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.classList.add(`priority-${priority.toLowerCase()}`); // For CSS styling later

    // Main task text
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // Add due date
    if (dueDate) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = ` (Due: ${dueDate})`;
        dateSpan.className = 'due-date';
        li.appendChild(dateSpan);
    }

    // Add priority label
    const priorityTag = document.createElement('span');
    priorityTag.textContent = ` [${priority} Priority]`;
    priorityTag.className = 'priority-tag';
    li.appendChild(priorityTag);

    // Complete toggle
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateProgress();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        updateProgress();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear fields
    taskInput.value = '';
    dateInput.value = '';
    prioritySelect.value = 'Medium';

    updateProgress();

}

// Event listener for the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Event listener for Enter key press in the input field
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function filterTasks(type){
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(li => {
        switch (type){
            case 'all':
                li.style.display = 'flex';
                break;
            case 'completed':
                li.style.display = li.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                li.style.display = !li.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

function sortTasksByPriority() {
    let tasks = Array.from(document.querySelectorAll('#task-list li'));
    tasks.sort((a, b) => {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
    });
    tasks.forEach(task => taskList.appendChild(task));
}


function updateProgress() {
    const total = document.querySelectorAll('#task-list li').length;
    const completed = document.querySelectorAll('#task-list li.completed').length;
    const percent = total === 0 ? 0 : Math.floor((completed / total) * 100);
    document.getElementById('progress-bar').style.width = percent + '%';
}


function saveTask(){
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks(){
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add 'complete' functionality on click
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.className = 'delete-btn';

        // Add delete functionality
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    updateProgress();
}
loadTasks();
window.addEventListener('beforeunload', saveTasks);

