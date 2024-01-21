const fs = require('fs');
const path = require('path');

const stylesFile = path.join(__dirname, 'styles');

const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFile, (errorr, files) => {
    if (errorr) throw errorr;

    let styles = '';

    files.forEach(file => {
        if (path.extname(file) === '.css') {
            const content = fs.readFileSync(path.join(stylesFile, file), 'utf8');
            styles += content + '\n';
        }
    });

    fs.writeFileSync(outputFile, styles, 'utf8');
});