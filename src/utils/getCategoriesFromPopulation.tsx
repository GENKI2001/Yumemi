import {
  PopulationData,
  PopulationLabel,
  PopulationTitle,
  PopulationType,
} from '../interface/population';

export const getCategoriesFromPopulation = (
  populationData: PopulationType[],
  label: PopulationLabel,
): number[] | undefined => {
  return populationData?.[0]?.data
    ?.find((data: PopulationTitle) => data.label === label)
    ?.data.map((data: PopulationData) => data.year);
};
