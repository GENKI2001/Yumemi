// 人口データの型を定義
export type PopulationData = {
  year: number;
  value: number;
  ratio?: number;
};

export type PopulationLabel =
  | '総人口'
  | '年少人口'
  | '生産年齢人口'
  | '老年人口';

export type PopulationTitle = {
  label: PopulationLabel;
  data: PopulationData[];
};

export type PopulationType = {
  boundaryYear: number;
  prefCode: number;
  prefName: string;
  data: PopulationTitle[];
};
