import { useState } from 'react';
import { PopulationLabel } from '../interface/population';

interface UseModeReturn {
  mode: PopulationLabel;
  handleChangeMode: (mode: PopulationLabel) => void;
}

const useMode = (init?: PopulationLabel): UseModeReturn => {
  const [mode, setMode] = useState<PopulationLabel>(init ?? '年少人口');

  const handleChangeMode = (newMode: PopulationLabel) => {
    if (mode !== newMode) {
      setMode(newMode);
    }
  };

  return { mode, handleChangeMode };
};

export default useMode;
