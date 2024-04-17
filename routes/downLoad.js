const multer = require('multer');  
const fs = require('fs');  
const path = require('path');  
const unzipper = require('unzipper');
const { execSync } = require('child_process');
const { table } = require('console');

var resTableData = {
    tableData: [],
    isShow: false,
    currentRow: {},
}

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
    var result='';
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
            // console.log('newFilePaths');
            // console.log(newFilePaths);
            try {
                // 执行命令并获取输出
                const output = execSync(commandStr, {
                    maxBuffer: 1024 * 1024 * 10, // 根据需要调整缓冲区大小
                    cwd: outputDir // 设置工作目录为解压后的目录
                }).toString();
    
                // 打印命令输出到控制台
                console.log(output);
                const lines = output.split('\n'); // 将字符串按行拆分成数组

                const extractedData = lines.map((line, index) => {
                    try {
                        const parts = line.split(' consists for '); // 按照 " consists for " 分割每行
                        if (parts.length === 2) { // 确保分隔后有两部分
                            const filePath = parts[0].trim(); // 第一个部分是文件路径
                            const description = parts[1].trim(); // 第二个部分是描述性文本
                            var rptData = filePath + ' ' + description; // 合并为 rptData
                            return { rptData };
                        } else {
                            return null; // 不符合预期格式的行返回 null
                        }
                    } catch (error) {
                        console.error(`Error processing line ${index + 1}:`, error); // 输出错误信息和出错行号
                        return null; // 发生错误时返回 null
                    }
                }).filter(Boolean); // 过滤掉 undefined 元素
                

                //console.log(extractedData);
                const parsedDataArray = extractedData.map(item => {
                    return parseReportData(item.rptData);
                });
                // 输出解析后的数据
                console.log(parsedDataArray);
                result = parsedDataArray;
            } catch (error) {
                // 处理错误情况
                console.error('Error executing ', error);
            }
    
            // 发送成功响应
            //res.status(200).json({ message: 'output', filename: finalFilename });
            res.status(200).json({
                result:result
            })
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

    function parseReportData(rptData) {
        const parts = rptData.split('% of ');
        if (parts.length === 2) {
            const filePathAndPercentage = parts[0].trim().split(' ');
            const filePath = filePathAndPercentage.slice(0, -1).join(' ').split('ziploads\\').pop();
            const percentage = filePathAndPercentage.pop();
            let referencedFile = parts[1].trim().split('ziploads\\').pop();
            // Remove " material" if present at the end
            referencedFile = referencedFile.replace(/ material$/, '');
            return {
                filePath1: filePath,
                filePath2: referencedFile,
                percent: percentage
            };
        } else {
            console.error('Unexpected format:', rptData);
            return null;
        }
    }
    
    
};