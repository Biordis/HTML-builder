const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error("Не могу прочесть каталог:", err);
        return;
    }
    
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error("Извините, не могу получить инфу о файле:", err);
                return;
            }
            if (stats.isFile()) {
                const size = (stats.size / 1024).toFixed(3);
                const extension = path.extname(file).slice(1);
                const name = path.basename(file, '.' + extension);
                console.log(`${name} - ${extension} - ${size}kb`);
            }
        });
    });
});