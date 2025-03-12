import React, { Suspense, lazy } from 'react';

const RemoteButton = lazy(() => import('remoteApp/Button'));

function App() {
  return (
    <div>
      <h1>主应用容器</h1>
      <Suspense fallback="加载中...">
        <RemoteButton />
      </Suspense>
    </div>
  );
}

export default App;