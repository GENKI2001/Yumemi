import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PrefectureType } from '../interface/prefecture';
import { getPrefectures } from '../services/api/prefecture/getPrefectures';

// 都道府県情報を取得するためのカスタムフック
export const useGetPrefectures = (): UseQueryResult<PrefectureType[]> => {
  return useQuery<PrefectureType[]>({
    queryKey: ['prefectures'],
    queryFn: getPrefectures,
    staleTime: 1000 * 60 * 60, // 1時間
    gcTime: 1000 * 60 * 60, // 1時間
  });
};
