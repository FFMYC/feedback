# 反馈系统

一个基于Node.js和Express的轻量级反馈收集系统，支持自定义标签、自动文件命名等功能。

## 功能特性

- 标签管理：创建、删除反馈标签
- 自定义标签：选择"其他"时可自定义标签名称
- 自动命名：文件名格式为"标签-标题名-用户名"
- 重名处理：自动添加序号避免文件名冲突
- 反馈收集：支持建议、bug、其他类型反馈

## 技术栈

- 后端：Node.js + Express
- 前端：原生HTML/CSS/JavaScript
- 数据存储：本地文件系统（HTML/JSON）

## 安装运行

\\\ash
# 安装依赖
npm install

# 启动服务器
node server.js
\\\

访问地址：http://localhost

## 默认标签

- 建议：功能建议和改进
- bug：问题报告和bug反馈
- 其他：其他类型的反馈（可自定义）

## 文件名格式

- 格式：标签-标题名-用户名
- 示例：bug-无法登录-张三.html
- 重名：bug-无法登录-张三-1.html

## API接口

- POST /api/save-feedback-tag - 保存反馈标签
- POST /api/check-feedback-duplicate - 检查文件名重复
- POST /save-ticket - 保存反馈

## 项目结构

\\\
feedback-system/
├── server.js          # 服务器主文件
├── package.json       # 项目配置
├── README.md          # 项目说明
├── .gitignore         # Git忽略文件
├── icon.png           # 网站图标
└── 联系/              # 反馈数据目录
    ├── 反馈.html        # 反馈表单页面
    ├── 标签管理.html      # 标签管理页面
    ├── main.html         # 联系主页
    ├── 标签/            # 标签数据
    └── 反馈/            # 反馈文件存储
\\\

## 许可证

MIT License
