document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector("input");
  const addButton = document.querySelector("button");
  const todoList = document.getElementById("todo-list");

  // Fungsi untuk menyimpan tugas di localStorage
  function saveTasks() {
      const tasks = Array.from(todoList.children).map(li => ({
          text: li.querySelector('.task-text').textContent,
          completed: li.querySelector('.task-checkbox').checked
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Fungsi untuk memuat tugas dari localStorage
  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.forEach(task => {
          addTaskToList(task.text, task.completed);
      });
  }

  // Fungsi untuk menambahkan tugas baru
  addButton.addEventListener("click", function () {
      const taskText = inputField.value.trim();
      
      if (taskText === "") {
          alert("Tugas tidak boleh kosong!");
          return;
      }

      addTaskToList(taskText);
      inputField.value = ""; // Reset input
  });

  // Fungsi untuk membuat tugas baru
  function addTaskToList(taskText, isCompleted = false) {
      const listItem = document.createElement("li");
      
      // Buat checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");
      checkbox.checked = isCompleted;
      
      // Buat span untuk teks tugas
      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      taskSpan.classList.add("task-text");
      if (isCompleted) {
          taskSpan.classList.add("completed");
      }

      // Event listener untuk checkbox
      checkbox.addEventListener("change", function () {
          taskSpan.classList.toggle("completed", checkbox.checked);
          saveTasks();
      });

      // Tombol hapus tugas
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", function () {
          listItem.remove();
          saveTasks();
      });

      // Susun elemen
      listItem.appendChild(checkbox);
      listItem.appendChild(taskSpan);
      listItem.appendChild(deleteButton);
      
      todoList.appendChild(listItem);
      
      // Simpan tugas
      saveTasks();
  }

  // Menambahkan event listener untuk tekan "Enter"
  inputField.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
          addButton.click();
      }
  });

  // Muat tugas tersimpan saat halaman dimuat
  loadTasks();
});