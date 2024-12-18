import React from 'react';
import { useGetPopulation } from '../../hooks/useGetPopulation';
import { useGetPrefectures } from '../../hooks/useGetPrefectures';
import useMode from '../../hooks/useMode';
import useSelectedPrefectures from '../../hooks/useSelectedPrefectures';
import HomeTemplate from '../templates/HomeTemplate';

const HomePage: React.FC = () => {
  const { prefectures: selectedPrefectures, handleSelectedPrefectures } =
    useSelectedPrefectures([{ prefCode: 13, prefName: '東京都' }]);
  const { mode, handleChangeMode } = useMode();
  const { data: prefectures } = useGetPrefectures();
  const { data: population } = useGetPopulation(selectedPrefectures);

  return (
    <HomeTemplate
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
