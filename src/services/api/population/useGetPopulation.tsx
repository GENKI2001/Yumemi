import {
  useQueries,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';
import { PopulationType } from '../../../interface/population';
import { PrefectureType } from '../../../interface/prefecture';

interface QueryState<T>
  extends Pick<
    UseQueryResult<T>,
    'isLoading' | 'isError' | 'error' | 'status'
  > {
  data: T | undefined;
}

// Axiosクライアントの作成
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8', // 必須ヘッダー
  },
});

// 都道府県データを取得する関数
const getPopulation = async (
  prefCode: number,
  prefName: string,
): Promise<PopulationType> => {
  const response = await apiClient.get(
    '/api/v1/population/composition/perYear?prefCode=' + prefCode,
    {
      headers: {
        'X-API-KEY': process.env.REACT_APP_X_API_KEY, // X-API-KEYをヘッダーに追加
      },
    },
  );
  return { ...response.data.result, prefCode: prefCode, prefName: prefName }; // レスポンスデータを返却
};

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
