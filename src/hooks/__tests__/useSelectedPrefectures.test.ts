import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { PrefectureType } from '../../interface/prefecture';
import useSelectedPrefectures from '../useSelectedPrefectures';

describe('useSelectedPrefectures', () => {
  const mockPrefecture1: PrefectureType = {
    prefCode: 1,
    prefName: '北海道',
  };

  const mockPrefecture2: PrefectureType = {
    prefCode: 2,
    prefName: '青森県',
  };

  it('should return an sepecified array initially.', () => {
    const { result } = renderHook(() =>
      useSelectedPrefectures([mockPrefecture1]),
    );

    expect(result.current.prefectures).toEqual([mockPrefecture1]);
  });

  it('should return an empty array initially.', () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    expect(result.current.prefectures).toEqual([]);
  });

  it('should add a prefecture', () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.handleSelectedPrefectures(mockPrefecture1);
    });

    expect(result.current.prefectures).toEqual([mockPrefecture1]);
  });

  it('should add prefectures', () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.handleSelectedPrefectures(mockPrefecture1);
      result.current.handleSelectedPrefectures(mockPrefecture2);
    });

    expect(result.current.prefectures).toEqual([
      mockPrefecture1,
      mockPrefecture2,
    ]);
  });

  it('Should delete already selected prefectures', () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.handleSelectedPrefectures(mockPrefecture1);
      result.current.handleSelectedPrefectures(mockPrefecture2);
    });

    act(() => {
      result.current.handleSelectedPrefectures(mockPrefecture1);
    });

    expect(result.current.prefectures).toEqual([mockPrefecture2]);
  });

  it('Should remove all prefectures.', () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.handleSelectedPrefectures(mockPrefecture1);
      result.current.handleSelectedPrefectures(mockPrefecture2);
    });

    act(() => {
      result.current.handleSelectedPrefectures(mockPrefecture1);
      result.current.handleSelectedPrefectures(mockPrefecture2);
    });

    expect(result.current.prefectures).toEqual([]);
  });
});
