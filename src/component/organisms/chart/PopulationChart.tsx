import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationLabel, PopulationType } from '../../../interface/population';
import { getCategoriesFromPopulation } from '../../../utils/getCategoriesFromPopulation';
import { getSeriesFromPopulation } from '../../../utils/getSeriesFromPopulation';

interface PopulationChartProps {
  title: string;
  label: PopulationLabel;
  populationData: PopulationType[];
}

const PopulationChart: React.FC<PopulationChartProps> = (props) => {
  const categories = getCategoriesFromPopulation(
    props.populationData,
    props.label,
  );
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
