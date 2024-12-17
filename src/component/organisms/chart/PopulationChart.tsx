import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationLabel, PopulationType } from '../../../interface/population';
import { getCategoriesFromPopulation } from '../../../utils/getCategoriesFromPopulation';
import { getSeriesFromPopulation } from '../../../utils/getSeriesFromPopulation';

interface PopulationChartProps {
  title: string; // グラフのタイトル
  label: PopulationLabel; // 抽出するデータのラベル
  populationData: PopulationType[]; // 人口データ
}

const PopulationChart: React.FC<PopulationChartProps> = (props) => {
  // カテゴリ（年度）を取得
  const categories = getCategoriesFromPopulation(
    props.populationData,
    props.label,
  );
  // 系列データを取得
  const series = getSeriesFromPopulation(props.populationData, props.label);

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
    series: series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PopulationChart;
