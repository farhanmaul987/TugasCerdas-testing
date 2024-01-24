// Untuk membaca isi direktori secara synchronous
const fs = require('fs');
// Untuk membuat jalur file
const path = require('path');

// Param foldersOnly:
// True     : hanya mengembalikan nama folder dalam direktori.
// False    : hanya mengembalikan nama file dalam direktori.
module.exports = (directory, foldersOnly = false) => {

    // Variabel berisi array kosong untuk menyimpan nama file
    let fileNames = [];

    // fs.readdirSync(): membaca isi dari direktori secara synchronous (proses akan menunggu pembacaan direktori selesai sebelum melanjutkan)
    const files = fs.readdirSync(directory, { withFileTypes: true });

    // Looping setiap file
    for (const file of files) {
        // Membuat jalur file dari direktori
        // path.join: Menggabungkan directory(jalur direktori utama) dengan file.name(nama file atau folder)
        const filePath = path.join(directory, file.name);

        // Pengecekan apakah itu nama folder atau file yang dikumpulkan
        if (foldersOnly) {
            // Pengecekan apakah file itu adalah folder atau bukan
            // Jika loop ini dihilangkan: kode tidak memunculkan apa-apa
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            // Pengecekan apakah file itu adalah file atau bukan
            // Jika loop ini dihilangkan: Hanya muncul array kosong
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
        // Jika foldersOnly = true: error di atas akan menjadi terbalik 
    }

    // Kembalikan array fileNames
    return fileNames;

};