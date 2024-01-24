// eventHandler.js: Menangani semua events dari folder events
const path = require('path');
const getAllFiles = require("../utils/getAllFiles");

// Function yang menerima client sebagai parameter
module.exports = (client) => {
    // Mengambil data nama file + direktori dari folder "events"
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

    // console.log(eventFolders);

    // Looping setiap folder dari variabel eventFolders
    for (const eventFolder of eventFolders) {
        // Mengambil data nama file atau folder dalam setiap eventFolder
        const eventFiles = getAllFiles(eventFolder);

        // Mengurutkan data eventFiles
        eventFiles.sort((a, b) => a > b);
        // console.log(eventFiles);

        // eventFolder.replace(/\\/g, "/"): Mengganti semua \ jadi / karena js tidak mendukung \
        // split('/'): Membagi eventFolder atau jalur direktori menjadi array berdasarkan /
        // pop(): Mengambil data terakhir dari jalur direktori setelah displit menjadi beberapa bagian
        const eventName = eventFolder.replace(/\\/g, "/").split('/').pop();
        // console.log(eventName);

        // arg: Argumen yang berisi informasi pesan, seperti pengirim, isi, tanggal, dan informasi lainnya
        // Mendaftarkan nama event/folder ke client dari variabel eventName
        client.on(eventName, async (arg) => {
            // Looping setiap file dalam variabel eventFiles
            for (const eventFile of eventFiles) {
                // Impor file yang berisi fungsi event dan disimpan dalam variabel eventFunction
                const eventFunction = require(eventFile);
                // Memanggil fungsi event lewat instance client dan argumen event (arg)
                // Await menandakan bahwa fungsi event dapat bersifat asynchronous
                // Memungkinkan event-handler menunggu fungsi event selesai sebelum lanjut ke file event berikutnya dalam loop
                await eventFunction(client, arg);
            }
        })
    }
};