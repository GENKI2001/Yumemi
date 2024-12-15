import { PrefectureType } from '../../../interface/prefecture';
import CheckboxGrid from '../../molecules/checkboxGrid/CheckboxGrid';

interface PopulationChartProps {
  columns: number; // カラム数
  selectedPrefectures: PrefectureType[]; // 選択された都道府県
  prefectures: PrefectureType[]; // 都道府県一覧
  onChange: (prefecture: PrefectureType) => void; // 都道府県の選択状態変更イベント
}

const PrefecturesCheckboxGrid: React.FC<PopulationChartProps> = (props) => {
  return (
    <CheckboxGrid
      columns={props.columns}
      options={(props.prefectures ?? []).map((prefecture) => ({
        label: prefecture.prefName,
        // 選択された都道府県に含まれているかどうか(prefCodeで判定)
        checked: props.selectedPrefectures
          .map((prefecture: PrefectureType) => prefecture.prefCode)
          .includes(prefecture.prefCode),
        onChange: () => {
          props.onChange(prefecture);
        },
      }))}
    />
  );
};

export default PrefecturesCheckboxGrid;
