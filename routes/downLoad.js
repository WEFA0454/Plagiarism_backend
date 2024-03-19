const multer = require('multer');  
const fs = require('fs');  
const path = require('path');  
const unzipper = require('unzipper');
const { execSync } = require('child_process');

  
module.exports = function(app) {  
  
    // 设置 Multer 存储引擎和文件名  
    const storage = multer.diskStorage({  
        destination: function (req, file, cb) {  
            const dir = path.join(__dirname,'..', 'ziploads');  
  
            // 使用 fs.existsSync 同步检查目录是否存在  
            if (!fs.existsSync(dir)) {  
                fs.mkdirSync(dir);  
            }  
  
            cb(null, dir);  
        },  
        filename: function (req, file, cb) {  
            // 使用原始文件名作为存储文件名  
            cb(null, file.originalname);  
        }  
    });  
  
    const upload = multer({ storage: storage });  
    var checkedname='';
    var outputDir='';
    app.post('/downLoad', upload.single('file'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded.' });
            }
    
            const tempFilePath = req.file.path; // 获取上传文件的临时路径
            const checkedname = path.parse(req.file.filename).name;
            const outputDir = path.join(__dirname, '..', 'ziploads'); // 输出目录（解压目标）
    
            // 确保输出目录存在
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }
    
            const finalFilename = path.join(outputDir, checkedname); // 解压后的文件名
    
            // 使用流来解压文件
            await new Promise((resolve, reject) => {
                fs.createReadStream(tempFilePath)
                    .pipe(unzipper.Extract({ path: outputDir }))
                    .on('finish', () => {
                        // 解压完成，删除临时文件
                        fs.unlink(tempFilePath, (err) => {
                            if (err) {
                                console.error('Error deleting temp file:', err);
                            }
                            resolve();
                        });
                    })
                    .on('error', (err) => {
                        console.error('Error extracting file:', err);
                        reject(err);
                    });
            });
    
            //完成查重
            const chosendata = {
                languageType: 'c', //选择的语言
                limitedValue: '5' //选择的查重率
            };
    
            const newFilePaths = getAllFilePaths(path.join(outputDir, checkedname));
            console.log(newFilePaths); // 打印所有文件的路径
            let simCommand = '-pt ' + chosendata.limitedValue;
            newFilePaths.forEach((filePath) => {
                simCommand += (' "' + filePath + '"');
            });
            const commandStr = `"${path.join(__dirname, '..','sim', 'sim_' + chosendata.languageType + '.exe')}" ${simCommand}`;

            try {
                // 执行命令并获取输出
                const output = execSync(commandStr, {
                    maxBuffer: 1024 * 1024 * 10, // 根据需要调整缓冲区大小
                    cwd: outputDir // 设置工作目录为解压后的目录
                }).toString();
    
                // 打印命令输出到控制台
                console.log(output);
    
                // 如果需要将输出保存到文件，可以使用以下代码
                //require('fs').writeFileSync('output.txt', output);
    
            } catch (error) {
                // 处理错误情况
                console.error('Error executing SIM command:', error);
            }
    
            // 发送成功响应
            res.status(200).json({ message: 'File uploaded, extracted, and processed successfully.', filename: finalFilename });
    
        } catch (error) {
            console.error('Error processing request:', error);
            // 发送错误响应
            res.status(500).json({ error: 'Internal server error processing the file.' });
        }
    });
    
    function getAllFilePaths(dir) {
        const filePaths = [];
        fs.readdirSync(dir).forEach((file) => {
            const fullPath = path.join(dir, file);
    
            if (fs.statSync(fullPath).isFile()) {
                filePaths.push(fullPath);
            } else {
                // 递归调用自身处理子目录
                filePaths.push(...getAllFilePaths(fullPath));
            }
        });
    
        return filePaths;
    }

};