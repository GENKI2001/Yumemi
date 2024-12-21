import { useEffect, useState } from 'react';

// 画面幅に応じて、表示するカラム数を変更するためのカスタムフック
const useResponsiveColumns = (init?: number): number => {
  const [columns, setColumns] = useState<number>(init ?? 6); // 初期値は6カラム

  const calculateColumns = (width: number): number => {
    if (width > 1200) return 7;
    if (width > 900) return 6;
    if (width > 600) return 5;
    if (width > 450) return 4;
    return 3;
  };

  useEffect(() => {
    setColumns(calculateColumns(window.innerWidth));

    const handleResize = () => {
      setColumns(calculateColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return columns;
};

export default useResponsiveColumns;
