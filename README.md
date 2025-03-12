## 说明
(1) 先启动子应用remote
cd remote
npm install
npm run start
访问 http://localhost:8081/remoteEntry.js 确认文件可加载。
(2) 启动主应用
cd host
npm install
npm run build
npm run start
(3) 访问: http://localhost:8081