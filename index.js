const { exec } = require('child_process');

const executable = "start.bat"

exec(executable, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);

  if (stderr) {
    console.error(`exec stderr: ${stderr}`);
    return
}
});