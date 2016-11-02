#!/usr/bin/env node
let tinify = require("tinify");
let config = require("./config");
let program = require('commander');
let fs = require("fs");
let path = require("path");
let supportFiles = ['png', 'jpg', 'jpeg'];

tinify.key = config.tinykey;


function tinifyFile(file, toFile) {
    console.log("tiny", "begin compress " + file);
    let extname = path.extname(file);
    let isImage = false;
    for (let i = 0; i < supportFiles.length; i++) {
        if (supportFiles[i] == extname) {
            isImage = true;
        }
    }
    if (!isImage) {
        console.log(file + " is not image");
        return;
    }

    let source = tinify.fromFile(file);
    source.toFile(toFile, function (res) {
        console.log("tiny", "end compress " + file);

    });

}

function tinifyDir(dir) {
    let currentPath = process.cwd();
    let tinyPath = currentPath + "/tiny";
    fs.exists(tinyPath, function (exists) {
        if (!exists) {
            fs.mkdir(tinyPath);
        }
    });
    fs.readdir(dir, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            let basename = path.basename(files[i]);
            tinifyFile(dir + "/" + basename, tinyPath + "/" + basename);

        }
    });


}
program
    .version('1.0.0')
    .option('-f,--file', "压缩文件，输入当前目录下的完成文件名")
    .option('-d,--diretctory', "压缩目录，请输入当前目录下的目录名")
    .option('-h,--help', function () {

    })
    .parse(process.argv);

if (program.file) {
    file = program.args[0];
    tinifyFile(file, "t_" + file);

}
if (program.diretctory) {
    let dir = program.args[0];
    if (dir[dir.length - 1] == '/') {
        dir = dir.substring(0, dir.length - 1);
    }
    console.log("dir", dir);
    //tinifyDir(dir);


}





