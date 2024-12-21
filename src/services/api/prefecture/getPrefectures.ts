import axios from 'axios';
import { PrefectureType } from '../../../interface/prefecture';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

// ゆめみAPIを用いて都道府県情報を取得する
export const getPrefectures = async (): Promise<PrefectureType[]> => {
  const response = await apiClient.get('/api/v1/prefectures', {
    headers: {
      'X-API-KEY': process.env.REACT_APP_X_API_KEY,
    },
  });
  return response.data.result;
};
