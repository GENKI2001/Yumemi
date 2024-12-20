export type PopulationData = {
  year: number;
  value: number;
  ratio?: number;
};

export const populationLabels: PopulationLabel[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

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
