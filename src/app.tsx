import { createContext, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'; // 追加
import HomePage from './component/pages/HomePage';

// Socketオブジェクトとユーザーオブジェクトの型を定義
interface ContextType {
  info: string;
}

// Contextの初期値を設定する
export const Context = createContext<ContextType>({ info: '' });

// ルーターによりURLで分岐
function AppRouter() {
  return (
    <Context.Provider value={{ info: '' }}>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Context.Provider>
  );
}

export default AppRouter;
