#!/usr/bin/env node
let tinify = require("tinify");
let config = require("./config");
let program = require('commander');
let fs =require("fs");

tinify.key = config.tinykey;

function tinifyFile(file, toFile) {
    let source = tinify.fromFile(file);
    source.toFile(toFile);
}

function tinifyDir(dir) {


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





