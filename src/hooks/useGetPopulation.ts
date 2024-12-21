import { useQueries, useQueryClient } from '@tanstack/react-query';
import { PopulationType } from '../interface/population';
import { PrefectureType } from '../interface/prefecture';
import { getPopulation } from '../services/api/population/getPopulation';

// 人口情報を取得するためのカスタムフック
export const useGetPopulation = (
  prefecures: PrefectureType[],
): {
  data?: PopulationType[];
  isLoading: boolean;
  isError: boolean;
} => {
  const queryClient = useQueryClient();

  const populationQueries = useQueries({
    queries: prefecures.map((pref: PrefectureType) => ({
      queryKey: ['prefecture', pref.prefCode],
      queryFn: () => getPopulation(pref.prefCode, pref.prefName),
      // キャッシュの設定
      staleTime: 30 * 60 * 1000, // 30分間はキャッシュを新鮮として扱う
      cacheTime: 30 * 60 * 1000, // 30分間キャッシュを保持
      initialData: () => {
        return queryClient.getQueryData(['prefecture', pref.prefCode]);
      },
    })),
  });

  const isLoading = populationQueries.some((query) => query.isLoading);
  const isError = populationQueries.some((query) => query.isError);

  const data = populationQueries
    .map((query) => query.data)
    .filter((data): data is PopulationType => data !== undefined);

  return {
    data,
    isLoading,
    isError,
  };
};
