import { PopulationType } from '../interface/population';

export const handleCSVButtonClick = (
  isLoggedIn: boolean,
  population: PopulationType[],
  handleOpenLoginPopup: () => void,
  downloadPopulationCSV: (data: PopulationType[]) => void,
) => {
  if (!isLoggedIn) {
    handleOpenLoginPopup();
  } else {
    downloadPopulationCSV(population);
  }
};
