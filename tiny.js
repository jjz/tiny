let tinify = require("tinify");
tinify.key="sj1vka4IToZ1iZeLUT9xe0OMykpzTjFD";
let source =tinify.fromFile("test.png");
source.toFile("tiny.png");


