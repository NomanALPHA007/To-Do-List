document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodoItem(input.value);
    input.value = "";
  });

  function addTodoItem(task) {
    if (task.trim() === "") {
      return;
    }

    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const buttonGroup = document.createElement("div");

    const updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-warning btn-sm";
    updateBtn.innerText = "Update";
    updateBtn.addEventListener("click", function () {
      const newTask = prompt("Update task:", taskText.textContent);
      if (newTask && newTask.trim() !== "") {
        taskText.textContent = newTask;
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function () {
      list.removeChild(listItem);
    });

    buttonGroup.appendChild(updateBtn);
    buttonGroup.appendChild(deleteBtn);

    listItem.appendChild(taskText);
    listItem.appendChild(buttonGroup);
    list.appendChild(listItem);
  }
});
