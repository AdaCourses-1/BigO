const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const sass = require("node-sass");

// Цвета терминала
const red = "\x1b[31m";
const green = "\x1b[32m";

const destDir = path.join(__dirname, "..", "..", "public");
const scssSrcDir = path.join(__dirname, "..", "..", "scss");
const cssDestDir = path.join(destDir, "css");

function startCompileScss() {
  function compileScss(filePath) {
    const fileName = path.basename(filePath);
    if (fileName.startsWith("_")) {
      return; // Skip partials
    }

    const destPath = path.join(cssDestDir, fileName.replace(/\.scss$/, ".css"));
    const destDirPath = path.dirname(destPath);

    if (!fs.existsSync(destDirPath)) {
      fs.mkdirSync(destDirPath, { recursive: true });
    }

    sass.render(
      {
        file: filePath,
        outFile: destPath,
      },
      (error, result) => {
        if (error) {
          console.error(red + `Ошибка компиляции в SCSS: ${error.message}`);
        } else {
          fs.writeFileSync(destPath, result.css);
          console.log(
            `Файл ${path.basename(filePath)} скомпилирован в ${path.basename(
              destPath
            )}`
          );
        }
      }
    );
  }

  function compileAllScssFilesInDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && file.endsWith(".scss")) {
        compileScss(fullPath);
      } else if (stat.isDirectory()) {
        compileAllScssFilesInDir(fullPath);
      }
    });
  }

  compileAllScssFilesInDir(scssSrcDir);

  const scssWatcher = chokidar.watch(path.join(__dirname, "..", "scss"), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  scssWatcher
    .on("add", compileScss)
    .on("change", compileScss)
    .on("unlink", compileScss);
}

module.exports = {
    startCompile: startCompileScss
}

console.log("Ожидание изменений файлов...");
