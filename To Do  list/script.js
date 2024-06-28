document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTodoItem(task.text, task.id));

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskId = Date.now().toString();
    addTodoItem(input.value, taskId);
    saveTask(input.value, taskId);
    input.value = "";
  });

  function addTodoItem(task, id) {
    if (task.trim() === "") {
      return;
    }

    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center list-group-item-action";
    listItem.dataset.id = id;

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const buttonGroup = document.createElement("div");

    const updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-success btn-lg";
    updateBtn.innerText = "Update";
    updateBtn.addEventListener("click", function () {
      const newTask = prompt("Update task:", taskText.textContent);
      if (newTask && newTask.trim() !== "") {
        taskText.textContent = newTask;
        updateTask(id, newTask);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-lg";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function () {
      list.removeChild(listItem);
      deleteTask(id);
    });

    buttonGroup.appendChild(updateBtn);
    buttonGroup.appendChild(deleteBtn);

    listItem.appendChild(taskText);
    listItem.appendChild(buttonGroup);
    list.appendChild(listItem);
  }

  function saveTask(text, id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, id });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateTask(id, newText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      tasks[taskIndex].text = newText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
