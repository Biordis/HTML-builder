const fs = require('fs');
const readline = require('readline');
const writeStream = fs.createWriteStream('02-write-file/text.txt');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Введите текст, который хотите записать (или слово "exit" для выхода):');

interface.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Пока-пока!) Рада была поработать)');
    interface.close();
  } else {
    writeStream.write(`${input}\n`);
    console.log('Ю-ху, ваш текст добавлен. Введите еще текст (или слово "exit" для выхода):');
  }
});

interface.on('close', () => {
  process.exit(0);
});

interface.on('SIGINT', () => {
  console.log('Пока-пока!) Рада была поработать)');
  process.exit(0);
});