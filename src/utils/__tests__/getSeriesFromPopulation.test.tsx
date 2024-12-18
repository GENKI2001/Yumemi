import { PopulationLabel, PopulationType } from '../../interface/population';
import { getSeriesFromPopulation } from '../getSeriesFromPopulation';

describe('getSeriesFromPopulation', () => {
  const mockLabel: PopulationLabel = '総人口';

  const mockPopulationData: PopulationType[] = [
    {
      prefCode: 1,
      prefName: 'Hokkaido',
      boundaryYear: 2015,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2000, value: 1000000 },
            { year: 2010, value: 900000 },
          ],
        },
        {
          label: '年少人口',
          data: [
            { year: 2000, value: 200000 },
            { year: 2010, value: 250000 },
          ],
        },
      ],
    },
    {
      prefCode: 2,
      prefName: 'Aomori',
      boundaryYear: 2015,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2000, value: 800000 },
            { year: 2010, value: 750000 },
          ],
        },
      ],
    },
    {
      prefCode: 3,
      prefName: 'Iwate',
      boundaryYear: 2016,
      data: [
        {
          label: '老年人口',
          data: [
            { year: 2000, value: 100000 },
            { year: 2010, value: 120000 },
          ],
        },
      ],
    },
  ];

  it('returns correct series for the given label', () => {
    const result = getSeriesFromPopulation(mockPopulationData, mockLabel);

    expect(result).toEqual([
      {
        name: 'Hokkaido',
        data: [1000000, 900000],
      },
      {
        name: 'Aomori',
        data: [800000, 750000],
      },
    ]);
  });

  it('returns an empty array if no populations match the label', () => {
    const result = getSeriesFromPopulation(mockPopulationData, '生産年齢人口');

    expect(result).toEqual([]);
  });

  it('handles empty population data', () => {
    const result = getSeriesFromPopulation([], mockLabel);

    expect(result).toEqual([]);
  });

  it('handles populations with no data field', () => {
    const incompleteData: PopulationType[] = [
      {
        prefCode: 4,
        prefName: 'Miyagi',
        boundaryYear: 2015,
        data: [],
      },
    ];

    const result = getSeriesFromPopulation(incompleteData, mockLabel);

    expect(result).toEqual([]);
  });

  it('handles populations with empty data arrays in their label', () => {
    const incompleteData: PopulationType[] = [
      {
        prefCode: 5,
        prefName: 'Akita',
        boundaryYear: 2015,
        data: [
          {
            label: '総人口',
            data: [],
          },
        ],
      },
    ];

    const result = getSeriesFromPopulation(incompleteData, mockLabel);

    expect(result).toEqual([
      {
        name: 'Akita',
        data: [],
      },
    ]);
  });
});
