const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename(req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now());
        cb(null, file.originalname);
    }
});

const upload = multer({ // 设置 limits 可以帮助保护你的站点免受拒绝服务 (DoS) 攻击。
    storage,
    fileFilter(req, file, cb) {
        // 这个函数应该调用 `cb` 用boolean值来
        // 指示是否应接受该文件

        // 拒绝这个文件，使用`false`，像这样:
        // cb(null, false)

        // 接受这个文件，使用`true`，像这样:
        // cb(null, true)

        // 如果有问题，你可以总是这样发送一个错误:
        // cb(new Error('I don\'t have a clue!'))

        file.mimetype.includes('image' || 'text') ? cb(null, true) : cb(null, false);
    },
    limits: {
        fieldNameSize: 100, // field 名字最大长度
        fieldSize: 1024, // field 值的最大长度
        fields: 5, // 非文件 field 的最大数量
        fileSize: 1024 * 1024 * 10, // 在 multipart 表单中，文件最大长度 (字节单位)
        files: 10, // 在 multipart 表单中，文件最大数量
        parts: 15, // 在 multipart 表单中，part 传输的最大数量(fields + files)
        headerPairs: 50 // 在 multipart 表单中，键值对最大组数
    }
});


router.post('/uploads/single', upload.single('avatar'), (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    let file = (req && req.file && req.file.originalname && `http://${req.headers.host}/uploads/${req.file.originalname}`) || null;
    let data = {
        message: file === null ? '无内容上传' : '上传成功',
        file: file,
        form: req.body
    };
    res.json(data);
});

router.post('/uploads/multiple', upload.array('photos', 5), (req, res) => {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据，如果存在的话

    let files = [];
    let host = req.headers.host;

    if (req.files) {
        req.files.forEach((v, i, a) => {
            console.log(v);
            if (v.originalname) {
                files.push(`http://${host}/uploads/${v.originalname}`);
            }
        });
    }

    const data = {
        message: files.length === 0 ? '无内容上传' : '上传成功',
        data: {
            files: files,
            form: req.body
        }
    };
    res.json(data);
});


const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/uploads/other', cpUpload, (req, res) => {
    res.json({
        files: req.files,
        form: req.body
    })
});

module.exports = router;