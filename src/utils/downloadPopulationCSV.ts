import { PopulationType } from '../interface/population';

// 人口情報をCSV形式でダウンロードする
export const downloadPopulationCSV = (populationData: PopulationType[]) => {
  const headers = ['都道府県', '種類', '年度', '人口'];

  const csvContent = [
    headers.join(','),
    ...populationData.flatMap((population) =>
      population.data.flatMap((title) =>
        title.data.map(
          (entry) =>
            `${population.prefName},${title.label},${entry.year},${entry.value}`,
        ),
      ),
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'population_data.csv');

  // テスト環境の場合はダウンロード操作をシミュレートする
  if (process.env.NODE_ENV === 'test') {
    link.click();
    URL.revokeObjectURL(url);
    return { csvContent, url };
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
