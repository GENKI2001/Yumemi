/**
 * @jest-environment node
 */

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { PrefectureType } from '../../../../interface/prefecture';
import { getPrefectures } from '../getPrefectures';

const server = setupServer(
  http.get(
    `${process.env.REACT_APP_API_URL}/api/v1/prefectures`,
    ({ request }) => {
      const apiKey = request.headers.get('X-API-KEY');

      // APIキーが一致しない場合はエラーレスポンスを返却
      if (apiKey !== process.env.REACT_APP_X_API_KEY) {
        return HttpResponse.json(
          { message: 'Invalid API Key' } as { message: string },
          { status: 403 },
        );
      }

      return HttpResponse.json(
        {
          result: [
            { prefCode: 1, prefName: 'Hokkaido' },
            { prefCode: 2, prefName: 'Aomori' },
          ],
        },
        { status: 200 },
      );
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getPrefectures', () => {
  it('fetches prefecture data successfully', async () => {
    const prefectures = await getPrefectures();

    expect(prefectures).toEqual<PrefectureType[]>([
      { prefCode: 1, prefName: 'Hokkaido' },
      { prefCode: 2, prefName: 'Aomori' },
    ]);
  });

  it('handles invalid API key error', async () => {
    server.use(
      http.get(`${process.env.REACT_APP_API_URL}/api/v1/prefectures`, () => {
        return HttpResponse.json(
          { message: 'Invalid API Key' },
          { status: 403 },
        );
      }),
    );

    await expect(getPrefectures()).rejects.toThrow(
      'Request failed with status code 403',
    );
  });
});
