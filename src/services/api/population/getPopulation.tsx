import axios from 'axios';
import { PopulationType } from '../../../interface/population';

// Axiosクライアントの作成
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8', // 必須ヘッダー
  },
});

// 人口データを取得する関数
export const getPopulation = async (
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
