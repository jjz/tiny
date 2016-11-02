#!/usr/bin/env node
let tinify = require("tinify");
let config = require("./config");
let program = require('commander');
let fs = require("fs");
let path = require("path");
let supportFiles = ['.png', '.jpg', '.jpeg'];

tinify.key = config.tinykey;
if (config.tinykey.length == 0) {
    console.error("请到https://tinypng.com/developers申请key")
    return;
}


function tinifyFile(file, toFile) {
    console.log("begin compress " + file);
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
        console.log("end compress " + file);

    });

}

function tinifyDir(dir) {
    let currentPath = process.cwd();
    let tinyPath = getTinyDir(currentPath);
    fs.readdir(dir, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            let basename = path.basename(files[i]);
            console.log(tinyPath + "/" + basename);
            tinifyFile(dir + "/" + basename, tinyPath + "/" + basename);

        }
    });


}
function getTinyDir(path) {

    let tinyPath = path + "/tiny";
    fs.exists(tinyPath, function (exists) {
        if (!exists) {
            fs.mkdir(tinyPath);
        }
    });
    return tinyPath;

}
program
    .version('1.0.0')
    .option('-f,--file', "压缩文件，输入当前目录下的完成文件名")
    .option('-d,--diretctory', "压缩目录，请输入当前目录下的目录名")
    .on('--help', function () {
        console.log("从tinypng.com上压缩图片的工具");
        console.log("从 https://tinypng.com/developers 上面申请key");
        console.log("一个key一个月只可以压缩500张图片");

    })
    .parse(process.argv);


if (program.file) {
    let file = program.args[0];
    let currentPath = process.cwd();
    let tinyPath = getTinyDir(currentPath);

    tinifyFile(file, tinyPath + "/" + file);

}
if (program.diretctory) {
    let dir = program.args[0];
    if (dir[dir.length - 1] == '/') {
        dir = dir.substring(0, dir.length - 1);
    }
    tinifyDir(dir);


}





