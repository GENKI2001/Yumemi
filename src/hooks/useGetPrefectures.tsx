import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PrefectureType } from '../interface/prefecture';
import { getPrefectures } from '../services/api/prefecture/getPrefectures';

// React Query用のカスタムフック
export const useGetPrefectures = (): UseQueryResult<PrefectureType[]> => {
  return useQuery<PrefectureType[]>({
    queryKey: ['prefectures'],
    queryFn: getPrefectures,
    staleTime: 1000 * 60 * 60, // 1時間
    gcTime: 1000 * 60 * 60, // 1時間
  });
};
