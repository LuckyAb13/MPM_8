document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector("input");
    const addButton = document.querySelector("button");
    const todoList = document.getElementById("todo-list");
  
    // Fungsi untuk menambahkan tugas baru
    addButton.addEventListener("click", function () {
      const taskText = inputField.value.trim();
      
      if (taskText === "") {
        alert("Tugas tidak boleh kosong!");
        return;
      }
  
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
  
      // Tombol hapus tugas
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-btn");
      deleteButton.addEventListener("click", function () {
        listItem.remove();
      });
  
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
      
      inputField.value = ""; // Reset input
    });
  
    // Menambahkan event listener untuk tekan "Enter"
    inputField.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addButton.click();
      }
    });
  });
  