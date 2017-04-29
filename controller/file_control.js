var formidable = require('formidable'),
    path = require('path'),
    fs = require('fs');

var setting = require('../config');


/**
 * 上传
 */
exports.upload = function(req,res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    //图片存放目录
    var img_dir = setting.image_dir;

    //上传文件的临时路径
    var tmp_dir = setting.tmp_dir;

    form.uploadDir = tmp_dir;

    //保留临时文件的扩展名
    form.keepExtensions = true;

    //文件大小限制，默认2MB
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
        //图片路径
        var img_path = path.resolve(img_dir, files.file.name);

        fs.rename(files.file.path, img_path, function(err){
            if(err){
                res.json({code:10001,msg:err});
            } else{
                var img_url = `${setting.image_url}/${files.file.name}`;
                res.json({code:200, image_url:img_url});
            }
        })
    })
}


/**
 * 下载
 */
exports.download = function(req,res){
        
}