#!/usr/bin/env node
let tinify = require("tinify");
let config = require("./config");
let program = require('commander');
let fs = require("fs");
let path = require("path");

tinify.key = config.tinykey;

function tinifyFile(file, toFile) {
    console.log("tiny", "begin compress " + file);
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
    .option('-f,--file', "compress file")
    .option('-d,--diretctory', "compress diretcory")
    .parse(process.argv);

if (program.file) {
    file = program.args[0];
    tinifyFile(file, "t_" + file);

}
if (program.diretctory) {
    tinifyDir(program.args[0]);


}





