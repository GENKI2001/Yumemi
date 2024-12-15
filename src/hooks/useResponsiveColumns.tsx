import { useEffect, useState } from 'react';

const useResponsiveColumns = (init?: number): number => {
  const [columns, setColumns] = useState<number>(init ?? 6); // 初期値は6カラム

  // カラム数を計算するロジック
  const calculateColumns = (width: number): number => {
    if (width > 1200) return 7;
    if (width > 900) return 6;
    if (width > 600) return 5;
    if (width > 450) return 4;
    return 3;
  };

  useEffect(() => {
    // 初期値の計算
    setColumns(calculateColumns(window.innerWidth));

    // リサイズ時の処理
    const handleResize = () => {
      setColumns(calculateColumns(window.innerWidth));
    };

    window.addEventListener('resize', handleResize); // リスナー登録
    return () => {
      window.removeEventListener('resize', handleResize); // クリーンアップ
    };
  }, []);

  return columns; // カラム数を返す
};

export default useResponsiveColumns;
