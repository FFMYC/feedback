const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;

// CORS中间件
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 静态文件服务
app.use(express.static(__dirname));
app.use(express.json());

// 保存反馈标签
app.post('/api/save-feedback-tag', (req, res) => {
    try {
        const { tags } = req.body;
        const tagsDir = path.join(__dirname, '联系', '标签');
        
        if (!fs.existsSync(tagsDir)) {
            fs.mkdirSync(tagsDir, { recursive: true });
        }
        
        const metadataPath = path.join(tagsDir, 'metadata.json');
        fs.writeFileSync(metadataPath, JSON.stringify({ tags: tags }, null, 2), 'utf8');
        
        res.json({ success: true, message: '标签保存成功' });
    } catch (error) {
        console.error('保存反馈标签失败:', error);
        res.status(500).json({ success: false, message: '保存失败，请重试' });
    }
});

// 检查反馈重名
app.post('/api/check-feedback-duplicate', (req, res) => {
    try {
        const { baseTitle } = req.body;
        const feedbackDir = path.join(__dirname, '联系', '反馈');
        
        if (!fs.existsSync(feedbackDir)) {
            res.json({ exists: false });
            return;
        }
        
        const files = fs.readdirSync(feedbackDir).filter(f => f.endsWith('.html'));
        let sequence = 1;
        
        while (files.includes(${baseTitle}-.html) || files.includes(${baseTitle}.html)) {
            sequence++;
        }
        
        if (files.includes(${baseTitle}.html)) {
            res.json({ exists: true, sequence: sequence });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('检查重名失败:', error);
        res.status(500).json({ success: false, message: '检查失败，请重试' });
    }
});

// 保存反馈
app.post('/save-ticket', (req, res) => {
    try {
        const { title, fileName, tag, publisher, content } = req.body;
        const saveDir = path.join(__dirname, '联系', '反馈');
        
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir, { recursive: true });
        }
        
        const safeFileName = fileName.replace(/[\/:*?"<>|]/g, '-') + '.html';
        const filePath = path.join(saveDir, safeFileName);
        
        const formattedContent = content.replace(/\n/g, '<br>');
        const fileContent = <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="icon" href="../icon.png">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { border-bottom: 2px solid #3498db; padding-bottom: 15px; margin-bottom: 20px; }
        .info-item { margin-bottom: 10px; }
        .info-label { font-weight: bold; color: #666; }
        .content { margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1></h1>
        </div>
        <div class="info-item"><span class="info-label">标签：</span></div>
        <div class="info-item"><span class="info-label">提交时间：</span></div>
        <div class="info-item"><span class="info-label">提交人：</span></div>
        <div class="content"></div>
    </div>
</body>
</html>;
        
        fs.writeFileSync(filePath, fileContent, 'utf8');
        res.json({ success: true, message: '反馈保存成功', filePath: /联系/反馈/ });
    } catch (error) {
        console.error('反馈保存失败:', error);
        res.status(500).json({ success: false, message: '保存失败，请重试' });
    }
});

// 根路径
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '联系/反馈.html'));
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
    console.log('反馈系统服务器启动成功!');
    console.log('本地访问: http://localhost:' + port);
    console.log('服务目录: ' + __dirname);
});
