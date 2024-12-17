import {
  PopulationData,
  PopulationLabel,
  PopulationTitle,
  PopulationType,
} from '../interface/population';

// カテゴリ（年度）を取得する関数
export const getCategoriesFromPopulation = (
  populationData: PopulationType[],
  label: PopulationLabel,
): number[] | undefined => {
  return populationData?.[0]?.data
    ?.find((data: PopulationTitle) => data.label === label)
    ?.data.map((data: PopulationData) => data.year);
};
