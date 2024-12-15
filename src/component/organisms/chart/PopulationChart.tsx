import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  PopulationData,
  PopulationLabel,
  PopulationTitle,
  PopulationType,
} from '../../../interface/population';

interface PopulationChartProps {
  title: string; // グラフのタイトル
  label: PopulationLabel; // 抽出するデータのラベル
  populationData: PopulationType[]; // 人口データ
}

const PopulationChart: React.FC<PopulationChartProps> = (props) => {
  // データがない場合はエラーメッセージを表示
  if (!props.populationData?.[0]?.data?.[0]?.data) {
    return <div>データがありません</div>;
  }
  // ラベルに対応するカテゴリを取得。カテゴリは全てのデータで共通であることを前提としている。
  const categories = props.populationData?.[0]?.data
    ?.find((data: PopulationTitle) => data.label === props.label)
    ?.data.map((data: PopulationData) => data.year);

  const options = {
    title: { text: props.title },
    yAxis: {
      title: {
        text: '人口 (人)',
      },
    },
    xAxis: {
      categories: categories,
      title: {
        text: '年度（年）',
      },
    },
    series: props.populationData
      .map(
        (population: PopulationType) =>
          // ラベルに対応するデータがあれば
          population.data?.find(
            (data: PopulationTitle) => data.label === props.label,
          ) && {
            name: population.prefName,
            data: population.data
              // タイトルが一致するデータの人口データを取得
              ?.find((data: PopulationTitle) => data.label === props.label)
              // 人口データのvalueを取得
              ?.data?.map((data: PopulationData) => data.value),
          },
      )
      // APIの形式変更により予期せぬラベルが与えられた時はundefinedが含まれてtypeエラーとなるため、undefinedを除外する。
      .filter(Boolean),
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PopulationChart;
