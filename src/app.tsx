import { Route, Routes } from 'react-router-dom'; // 追加
import HomePage from './component/pages/HomePage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
