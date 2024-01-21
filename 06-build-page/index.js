const fs = require('fs').promises;
const path = require('path');

const outputDir = path.join(__dirname, 'project-dist');
const componentsDir = path.join(__dirname, 'components');
const stylesFile = path.join(__dirname, 'styles');
const templateDir = path.join(__dirname, 'template.html');
const assetsFile = path.join(__dirname, 'assets');
const assetsDir = path.join(outputDir, 'assets');
const indexHtmlPath = path.join(outputDir, 'index.html'); 
const outputFile = path.join(outputDir, 'style.css'); 

async function createProject() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    await copyAssets();
    await compileHtml();
    await compileCss();
  } catch (err) {
    console.error(err);
  }
}

async function compileHtml() {
  const template = await fs.readFile(templateDir, 'utf-8');
  const componentFiles = await fs.readdir(componentsDir, { withFileTypes: true });
  let content = template;
  for (const file of componentFiles) {
    if (file.isFile() && path.extname(file.name) === '.html') {
      const component = await fs.readFile(path.join(componentsDir, file.name), 'utf-8');
      const placeholder = '{{' + path.parse(file.name).name + '}}';
      content = content.replaceAll(placeholder, component);
    }
  }

  await fs.writeFile(indexHtmlPath, content);
}

async function compileCss() {
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
  }
  
async function copyAssets(from = assetsFile, to = assetsDir) {
  await fs.rm(to, { recursive: true, force: true });
  await fs.mkdir(to, { recursive: true });

  const files = await fs.readdir(from, { withFileTypes: true });
  for (const file of files) {
    const sourceFileSecond = path.join(from, file.name);
    const copyPathSecond = path.join(to, file.name);

    if (file.isFile()) {
      await fs.copyFile(sourceFileSecond, copyPathSecond);
    } else if (file.isDirectory()) {
      await copyAssets(sourceFileSecond, copyPathSecond);
    }
  }
}
createProject();
