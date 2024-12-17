import { PopulationLabel, PopulationType } from '../../interface/population';
import { getCategoriesFromPopulation } from '../getCategoriesFromPopulation';

describe('getCategoriesFromPopulation', () => {
  const mockPopulationData: PopulationType[] = [
    {
      prefCode: 13,
      prefName: 'Tokyo',
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2000, value: 1200000 },
            { year: 2010, value: 1300000 },
            { year: 2020, value: 1400000 },
          ],
        },
        {
          label: '年少人口',
          data: [
            { year: 2000, value: 600000 },
            { year: 2010, value: 650000 },
            { year: 2020, value: 700000 },
          ],
        },
      ],
    },
    {
      prefCode: 27,
      prefName: 'Osaka',
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2000, value: 800000 },
            { year: 2010, value: 850000 },
            { year: 2020, value: 900000 },
          ],
        },
      ],
    },
  ];

  it('should return the years for the given label', () => {
    const label: PopulationLabel = '総人口';
    const result = getCategoriesFromPopulation(mockPopulationData, label);
    expect(result).toEqual([2000, 2010, 2020]);
  });

  it('should return undefined if the populationData is empty', () => {
    const label: PopulationLabel = '総人口';
    const result = getCategoriesFromPopulation([], label);
    expect(result).toBeUndefined();
  });
});
