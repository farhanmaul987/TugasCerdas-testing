// Mencetak pesan ke terminal saat bot aktif
// Alur pencetakan isi console Log:
// index memanggil eventHandler yang mengatur semua event pada file dalam folder events
// Otomatis semua di dalam folder events dijalankan termasuk console log
module.exports = (client) => {
    console.log(`Bot ${client.user.tag} is online!`);
};