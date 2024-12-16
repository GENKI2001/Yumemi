import axios from 'axios';
import { PrefectureType } from '../../../interface/prefecture';

// Axiosクライアントの作成
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8', // 必須ヘッダー
  },
});

// 都道府県データを取得する関数
export const getPrefectures = async (): Promise<PrefectureType[]> => {
  const response = await apiClient.get('/api/v1/prefectures', {
    headers: {
      'X-API-KEY': process.env.REACT_APP_X_API_KEY, // X-API-KEYをヘッダーに追加
    },
  });
  return response.data.result; // レスポンスデータを返却
};
