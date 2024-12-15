// ホームのpagesを作成
import React from 'react';
import useSelectedPrefectures from '../../hooks/useSelectedPrefectures';
import { useGetPopulation } from '../../services/api/population/useGetPopulation';
import { useGetPrefectures } from '../../services/api/prefecture/useGetPrefecture';
import HomeTemplate from '../templates/HomeTemplate';

const HomePage: React.FC = () => {
  // チェックボックスに選択されている都道府県を設定
  const { prefectures: selectedPrefectures, handleSelectedPrefectures } =
    useSelectedPrefectures();
  // 都道府県データと人口データを取得
  const { data: prefectures } = useGetPrefectures();
  const { data: population } = useGetPopulation(selectedPrefectures);
  return (
    <HomeTemplate
      prefectures={prefectures ?? []}
      population={population ?? []}
      selectedPrefectures={selectedPrefectures}
      handleSelectedPrefectures={handleSelectedPrefectures}
    />
  );
};

export default HomePage;
