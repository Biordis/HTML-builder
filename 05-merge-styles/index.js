const fs = require('fs').promises;
const path = require('path');

const stylesFile = path.join(__dirname, 'styles'); 
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFile)
    .then(files => {
        let promises = files
            .filter(file => path.extname(file) === '.css')
            .map(file => fs.readFile(path.join(stylesFile, file), 'utf8'));
        return Promise.all(promises);
    })
    .then(styles => {
        return fs.writeFile(outputFile, styles.join('\n'), 'utf8');
    })
    .catch(err => console.error(err));