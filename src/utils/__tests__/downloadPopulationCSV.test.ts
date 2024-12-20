import { PopulationType } from '../../interface/population';
import { downloadPopulationCSV } from '../downloadPopulationCSV';

global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

const mockPopulationData: PopulationType[] = [
  {
    boundaryYear: 2020,
    prefCode: 1,
    prefName: '北海道',
    data: [
      {
        label: '総人口',
        data: [
          { year: 2015, value: 5381733 },
          { year: 2020, value: 5216615 },
        ],
      },
    ],
  },
  {
    boundaryYear: 2020,
    prefCode: 2,
    prefName: '青森県',
    data: [
      {
        label: '総人口',
        data: [
          { year: 2015, value: 1308265 },
          { year: 2020, value: 1234567 },
        ],
      },
    ],
  },
];

describe('downloadPopulationCSV', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'mock-url');
    global.URL.revokeObjectURL = jest.fn();

    global.Blob = jest.fn().mockImplementation((content, options) => ({
      content,
      options,
    }));

    const mockLink = {
      href: '',
      setAttribute: jest.fn(),
      click: jest.fn(),
    };
    document.createElement = jest.fn().mockReturnValue(mockLink);

    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate CSV correctly in test environment', () => {
    process.env.NODE_ENV = 'test';
    const result = downloadPopulationCSV(mockPopulationData);

    const expectedCSV =
      '都道府県,種類,年度,人口\n' +
      '北海道,総人口,2015,5381733\n' +
      '北海道,総人口,2020,5216615\n' +
      '青森県,総人口,2015,1308265\n' +
      '青森県,総人口,2020,1234567';

    expect(result?.csvContent).toBe(expectedCSV);
    expect(result?.url).toBe('mock-url');
  });

  it('should generate CSV correctly in production environment', () => {
    process.env.NODE_ENV = 'production';
    downloadPopulationCSV(mockPopulationData);

    expect(global.Blob).toHaveBeenCalledWith([expect.any(String)], {
      type: 'text/csv;charset=utf-8;',
    });

    expect(global.URL.createObjectURL).toHaveBeenCalled();

    const mockLink = document.createElement('a');
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      'population_data.csv',
    );

    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });

  it('should be correct type of csv data', () => {
    process.env.NODE_ENV = 'test';
    const result = downloadPopulationCSV(mockPopulationData);
    const lines = result?.csvContent.split('\n');

    expect(lines?.[0]).toBe('都道府県,種類,年度,人口');

    const dataLine = lines?.[1];
    expect(dataLine).toMatch(/^[^,]+,[^,]+,\d+,\d+$/);
  });
});
