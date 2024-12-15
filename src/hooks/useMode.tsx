import { useState } from 'react';
import { PopulationLabel } from '../interface/population';

// フックの戻り値の型を定義
interface UseModeReturn {
  mode: PopulationLabel;
  handleChangeMode: (mode: PopulationLabel) => void;
}

const useMode = (init?: PopulationLabel): UseModeReturn => {
  const [mode, setMode] = useState<PopulationLabel>(init ?? '年少人口'); // 初期値は6カラム

  const handleChangeMode = (newMode: PopulationLabel) => {
    if (mode !== newMode) {
      setMode(newMode);
    }
  };

  return { mode, handleChangeMode }; // カラム数を返す
};

export default useMode;
