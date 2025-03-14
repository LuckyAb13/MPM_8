document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector("input");
    const addButton = document.querySelector("button");
    const todoList = document.getElementById("todo-list");
    const uploadInput = document.getElementById("upload-input");
    const downloadButton = document.getElementById("download-button");

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

    // Fungsi untuk mengunduh daftar tugas sebagai file JSON
    function downloadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "tasks.json";
        a.click();
    }

    // Fungsi untuk mengunggah daftar tugas dari file JSON
    uploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const uploadedTasks = JSON.parse(e.target.result);
                localStorage.setItem("tasks", JSON.stringify(uploadedTasks));
                location.reload(); // Refresh halaman untuk memuat ulang tugas
            } catch (error) {
                alert("File tidak valid!");
            }
        };
        reader.readAsText(file);
    });

    // Event listener untuk tombol unduh
    downloadButton.addEventListener("click", downloadTasks);

    // Muat tugas tersimpan saat halaman dimuat
    loadTasks();
});
