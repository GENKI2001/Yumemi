import {
  useQueries,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { PopulationType } from '../interface/population';
import { PrefectureType } from '../interface/prefecture';
import { getPopulation } from '../services/api/population/getPopulation';

interface QueryState<T>
  extends Pick<
    UseQueryResult<T>,
    'isLoading' | 'isError' | 'error' | 'status'
  > {
  data: T | undefined;
}

// React Query用のカスタムフック
export const useGetPopulation = (
  prefecures: PrefectureType[],
): QueryState<PopulationType[]> => {
  const queryClient = useQueryClient();

  const prefectureQueries = useQueries({
    queries: prefecures.map((pref: PrefectureType) => ({
      queryKey: ['prefecture', pref.prefCode],
      queryFn: () => getPopulation(pref.prefCode, pref.prefName),
      // キャッシュの設定
      staleTime: 5 * 60 * 1000, // 5分間はキャッシュを新鮮として扱う
      cacheTime: 30 * 60 * 1000, // 30分間キャッシュを保持
      // オプションでプリフェッチしたデータを使用
      initialData: () => {
        return queryClient.getQueryData(['prefecture', pref.prefCode]);
      },
    })),
  });

  // 全てのクエリの状態を集約
  const isLoading = prefectureQueries.some((query) => query.isLoading);
  const isError = prefectureQueries.some((query) => query.isError);
  const error = prefectureQueries.find((query) => query.error)?.error ?? null;
  const status = isLoading ? 'pending' : isError ? 'error' : 'success';
  // 型安全なフィルタリング処理
  const data =
    isLoading || isError
      ? undefined
      : prefectureQueries
          .map((query) => query.data)
          .filter((data): data is PopulationType => data !== undefined);

  return {
    data,
    isLoading,
    isError,
    error,
    status,
  };
};
