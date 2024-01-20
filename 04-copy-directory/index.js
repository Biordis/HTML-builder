const fs = require('fs').promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

async function filesCopy(source, copy) { 
    await fs.mkdir(copy, { recursive: true });
    const failiki = await fs.readdir(source, { withFileTypes: true });

    for (let failik of failiki) {
        const sourcePathSecond = path.join(source, failik.name);
        const copyPathSecond = path.join(copy, failik.name);

        if (failik.isDirectory()) {
            await filesCopy(sourcePathSecond, copyPathSecond);
        } else {
            await fs.copyFile(sourcePathSecond, copyPathSecond);
        }
    }
}

filesCopy(sourcePath, copyPath)
    .then(() => console.log('Я скопироваль:D'))
    .catch(console.error);