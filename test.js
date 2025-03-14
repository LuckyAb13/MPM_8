const { JSDOM } = require("jsdom");
const fs = require("fs");

// Load script.js dalam lingkungan DOM virtual
const html = fs.readFileSync("index.html", "utf8");
const dom = new JSDOM(html, { runScripts: "dangerously" });
global.document = dom.window.document;
global.window = dom.window;
global.localStorage = dom.window.localStorage;

// Import fungsi yang akan diuji
const { addTask, deleteTask, saveTasks, downloadTasks, uploadTasks } = require("./script");

// Simulasi localStorage
global.localStorage.setItem("tasks", JSON.stringify([]));

// Uji fungsi tambah tugas
test("Menambahkan tugas baru ke localStorage", () => {
    addTask("Mengerjakan PR");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toBe("Mengerjakan PR");
});

// Uji fungsi hapus tugas
test("Menghapus tugas dari localStorage", () => {
    addTask("Belajar JavaScript");
    deleteTask(0); // Hapus tugas pertama
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks.length).toBe(0);
});

// Uji ekspor tugas ke file JSON
test("Mengekspor daftar tugas ke file JSON", () => {
    addTask("Makan siang");
    const dataStr = downloadTasks();
    expect(dataStr).toContain("Makan siang");
});

// Uji impor tugas dari file JSON
test("Mengimpor daftar tugas dari file JSON", () => {
    const sampleData = JSON.stringify(["Sholat", "Olahraga"]);
    const mockEvent = { target: { result: sampleData } };
    uploadTasks(mockEvent);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks.length).toBe(2);
});
