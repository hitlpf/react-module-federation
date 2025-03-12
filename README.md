## 说明
该项目为webpack5 + react的模块联邦（微前端）简单demo

## 启动过程
### 启动子应用remote
cd remote  
npm install  
npm run start  
访问 http://localhost:8081/remoteEntry.js 确认文件可加载。
### 启动主应用host
cd host  
npm install  
npm run build  
npm run start  
### 访问
http://localhost:8081