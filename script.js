document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector("input");
  const addButton = document.querySelector("button");
  const todoList = document.getElementById("todo-list");
  const downloadButton = document.getElementById("download-btn");
  const uploadInput = document.getElementById("upload-input");

  // Ambil data dari localStorage saat halaman dimuat
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = task;

      // Tombol hapus tugas
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
      });

      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  // Tambah tugas baru
  addButton.addEventListener("click", function () {
    const taskText = inputField.value.trim();

    if (taskText === "") {
      alert("Tugas tidak boleh kosong!");
      return;
    }

    tasks.push(taskText);
    saveTasks();
    inputField.value = ""; // Reset input
  });

  // Tekan Enter untuk menambahkan tugas
  inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addButton.click();
    }
  });

  // Simpan daftar tugas ke file JSON
  function downloadTasks() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(tasks));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

  // Muat daftar tugas dari file JSON
  function uploadTasks(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        tasks = JSON.parse(e.target.result);
        saveTasks(); // Simpan ke localStorage
      } catch (error) {
        alert("File tidak valid!");
      }
    };
    reader.readAsText(file);
  }

  // Event listener untuk tombol download
  downloadButton.addEventListener("click", downloadTasks);

  // Event listener untuk input upload
  uploadInput.addEventListener("change", uploadTasks);

  // Tampilkan daftar tugas yang sudah tersimpan
  renderTasks();
});
