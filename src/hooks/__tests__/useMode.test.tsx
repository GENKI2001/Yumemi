import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { PopulationLabel } from '../../interface/population';
import useMode from '../useMode';

describe('useMode', () => {
  // テストデータ
  const mockLabel: PopulationLabel = '年少人口';

  it('should return an default value initially.', () => {
    const { result } = renderHook(() => useMode());

    expect(result.current.mode).toEqual(mockLabel);
  });

  it('should return value initially.', () => {
    const init: PopulationLabel = '生産年齢人口';
    const { result } = renderHook(() => useMode(init));

    expect(result.current.mode).toEqual(init);
  });

  it('should change new Label', () => {
    const init: PopulationLabel = '生産年齢人口';
    const { result } = renderHook(() => useMode(init));

    act(() => {
      result.current.handleChangeMode(mockLabel);
    });

    expect(result.current.mode).toEqual(mockLabel);
  });

  it('should not change the same label', () => {
    const init: PopulationLabel = '年少人口';
    const { result } = renderHook(() => useMode(init));

    act(() => {
      result.current.handleChangeMode(mockLabel);
    });

    expect(result.current.mode).toEqual(mockLabel);
  });
});
