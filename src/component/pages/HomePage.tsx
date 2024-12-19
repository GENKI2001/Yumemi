import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../app/redux/slice/authSlice';
import { RootState } from '../../app/redux/store';
import { useGetPopulation } from '../../hooks/useGetPopulation';
import { useGetPrefectures } from '../../hooks/useGetPrefectures';
import useMode from '../../hooks/useMode';
import useSelectedPrefectures from '../../hooks/useSelectedPrefectures';
import HomeTemplate from '../templates/HomeTemplate';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { prefectures: selectedPrefectures, handleSelectedPrefectures } =
    useSelectedPrefectures([{ prefCode: 13, prefName: '東京都' }]);
  const { mode, handleChangeMode } = useMode();
  const { data: prefectures } = useGetPrefectures();
  const { data: population } = useGetPopulation(selectedPrefectures);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(login('user-token'));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HomeTemplate
      isLoggedIn={isLoggedIn}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      headerLogoImagePath={'yumemi.png'}
      prefectures={prefectures ?? []}
      population={population ?? []}
      selectedPrefectures={selectedPrefectures}
      handleSelectedPrefectures={handleSelectedPrefectures}
      mode={mode}
      handleChangeMode={handleChangeMode}
    />
  );
};

export default HomePage;
