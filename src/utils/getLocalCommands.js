// getLocalCommands.js: Menangani semua perintah command dari folder commands
const path = require('path');
const getAllFiles = require('./getAllFiles');

// exceptions: Nama command di dalam array yang ingin diabaikan nantinya
module.exports = (exceptions = []) => {

    // Variabel berisi array kosong untuk menyimpan nama file
    let localCommands = [];

    // Menggunakan fungsi getAllFiles untuk mendapatkan array nama file + direktori dari folder "commands"
    const commandCategories = getAllFiles(
        // Mengambil data nama file + direktori dari folder "commands"
        path.join(__dirname, '..', 'commands'), true
    )

    // Looping setiap folder dari variabel commandCategories (dipisahkan antara folder misc dan moderation)
    for (const commandCategory of commandCategories) {
        // Menggunakan getAllFiles untuk mendapatkan array nama file dari setiap kategori perintah
        const commandFiles = getAllFiles(commandCategory);

        // Looping setiap file dalam variabel commandFiles (dipisahkan antar nama file di dalam folder. cth: di dalam folder misc)
        for (const commandFile of commandFiles) {
            // Mengambil object di dalam file (cth di dalam file ping.js)
            const commandObject = require(commandFile);

            // Melakukan pengecualian berdasarkan properti 'name' yang ada di dalam file (cth di dalam ping)
            if (exceptions.includes(commandObject.name)) {
                // Jika exceptions di baris 5 diisi dengan array 'ping', command 'ping' diabaikan
                continue;
            }

            // console.log(commandObject);

            // Menyimpan object perintah di dalam array 'localCommands'
            localCommands.push(commandObject);
        }
    }

    // Mengembalikan array localCommands yang berisi semua objek perintah
    return localCommands;
}