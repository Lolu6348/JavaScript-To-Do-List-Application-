
// Get elements from the DOM
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert("Please enter a task!");
        return;
    }

    // Create new task element
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add 'complete' functionality on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className = 'delete-btn';
    
    // Add delete functionality
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
}

// Event listener for the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Event listener for Enter key press in the input field
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
