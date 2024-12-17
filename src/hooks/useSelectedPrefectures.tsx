import { useState } from 'react';
import { PrefectureType } from '../interface/prefecture';

// フックの戻り値の型を定義
interface UseSelectedPrefecturesReturn {
  prefectures: PrefectureType[];
  handleSelectedPrefectures: (prefecture: PrefectureType) => void;
}

const useSelectedPrefectures = (
  init?: PrefectureType[],
): UseSelectedPrefecturesReturn => {
  const [prefectures, setPrefectures] = useState<PrefectureType[]>(init ?? []); // 初期値は6カラム

  const handleSelectedPrefectures = (prefecture: PrefectureType) => {
    if (
      prefectures
        .map((pref: PrefectureType) => pref.prefCode)
        .includes(prefecture.prefCode)
    ) {
      setPrefectures((prevPrefectures) =>
        prevPrefectures.filter(
          (pref: PrefectureType) => pref.prefCode !== prefecture.prefCode,
        ),
      );
    } else {
      setPrefectures((prevPrefectures) => [...prevPrefectures, prefecture]);
    }
  };

  return { prefectures, handleSelectedPrefectures }; // カラム数を返す
};

export default useSelectedPrefectures;
