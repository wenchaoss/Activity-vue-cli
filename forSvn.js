const exec = require('child_process').exec;
const Config = require('./config/index');

uploadCdn();

function uploadCdn() {
    var path = Config.build.index;
    var cmdEXE = 'svn update ' + path + ' && svn ci ' + path + ' -m ""';
    exec(cmdEXE, function (error, stdout, stderr) {
        console.log(cmdEXE);
        if (error) {
            console.log("提交SVN出错！", error);
        }
        console.log(stdout);
    });
}