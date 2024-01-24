const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

fs.rm(copyPath, { recursive: true, force: true }, (err) => {
    if (err) {
        console.error(`Осторожно, ошибочка при удалении папки: ${err.message}`);
        return;
    }
    fs.mkdir(copyPath, { recursive: true }, (err) => {
        if (err) {
            console.error(`Осторожно, ошибочка при создании папки: ${err.message}`);
            return;
        }
        fs.readdir(sourcePath, (err, files) => {
            if (err) {
                console.error(`Осторожно, ошибочка при чтении папки: ${err.message}`);
                return;
            }
            files.forEach((file) => {
                const sourceFilePath = path.join(sourcePath, file);
                const copyFilePath = path.join(copyPath, file);

                fs.copyFile(sourceFilePath, copyFilePath, (err) => {
                    if (err) {
                        console.error(`Осторожно, ошибочка при копировании файла: ${err.message}`);
                    }
                });
            });
        });
    });
});
