import { PopulationType } from '../../interface/population';
import { handleCSVButtonClick } from '../handleCSVButtonClick';

describe('handleCSVButtonClick', () => {
  const mockHandleOpenLoginPopup = jest.fn();
  const mockDownloadPopulationCSV = jest.fn();
  const mockPopulationData: PopulationType[] = [
    {
      boundaryYear: 2020,
      prefCode: 1,
      prefName: 'Tokyo',
      data: [
        {
          label: '総人口',
          data: [
            { year: 2015, value: 1000000 },
            { year: 2020, value: 1100000 },
          ],
        },
        {
          label: '年少人口',
          data: [
            { year: 2015, value: 200000 },
            { year: 2020, value: 180000 },
          ],
        },
      ],
    },
    {
      boundaryYear: 2020,
      prefCode: 2,
      prefName: 'Osaka',
      data: [
        {
          label: '総人口',
          data: [
            { year: 2015, value: 500000 },
            { year: 2020, value: 480000 },
          ],
        },
        {
          label: '年少人口',
          data: [
            { year: 2015, value: 100000 },
            { year: 2020, value: 90000 },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display login popup when user is not logged in', () => {
    handleCSVButtonClick(
      false,
      mockPopulationData,
      mockHandleOpenLoginPopup,
      mockDownloadPopulationCSV,
    );

    expect(mockHandleOpenLoginPopup).toHaveBeenCalledTimes(1);
    expect(mockDownloadPopulationCSV).not.toHaveBeenCalled();
  });

  it('should execute CSV download when user is logged in', () => {
    handleCSVButtonClick(
      true,
      mockPopulationData,
      mockHandleOpenLoginPopup,
      mockDownloadPopulationCSV,
    );

    expect(mockDownloadPopulationCSV).toHaveBeenCalledTimes(1);
    expect(mockDownloadPopulationCSV).toHaveBeenCalledWith(mockPopulationData);
    expect(mockHandleOpenLoginPopup).not.toHaveBeenCalled();
  });
});
