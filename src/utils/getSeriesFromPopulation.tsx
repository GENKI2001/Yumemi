import {
  PopulationData,
  PopulationLabel,
  PopulationTitle,
  PopulationType,
} from '../interface/population';

// グラフの系列データを取得する関数
export const getSeriesFromPopulation = (
  populationData: PopulationType[],
  label: PopulationLabel,
) => {
  return populationData
    .map((population: PopulationType) => {
      const targetData = population.data?.find(
        (data: PopulationTitle) => data.label === label,
      );
      if (targetData) {
        return {
          name: population.prefName,
          data: targetData.data.map((data: PopulationData) => data.value),
        };
      }
      return undefined;
    })
    .filter(Boolean); // undefinedを除外
};
