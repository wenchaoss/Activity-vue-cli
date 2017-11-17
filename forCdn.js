var exec = require('child_process').exec;
const Config = require('./config/index');

uploadCdn();

function uploadCdn() {

    var cmdEXE = Config.build.uploadPath;
    exec(cmdEXE, function (error, stdout, stderr) {
        if (error) {
            console.log("上传m站静态资源出错", error);
        }
        console.log(stdout);
    });
}