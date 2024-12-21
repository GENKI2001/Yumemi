import {
  PopulationData,
  PopulationLabel,
  PopulationTitle,
  PopulationType,
} from '../interface/population';

// 人口情報から指定したラベルのデータを取得する
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
    .filter(Boolean);
};
