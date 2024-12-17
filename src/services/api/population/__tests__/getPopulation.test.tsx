/**
 * @jest-environment node
 */

import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';
import { setupServer } from 'msw/node';
import { PopulationType } from '../../../../interface/population';
import { getPopulation } from '../getPopulation';

// 環境変数を使用した URL
const apiUrl = process.env.REACT_APP_API_URL || '';
const apiKey = process.env.REACT_APP_X_API_KEY || '';

const server = setupServer(
  http.get<PathParams, DefaultBodyType>(
    `${apiUrl}/api/v1/population/composition/perYear`,
    ({ request }) => {
      const requestApiKey = request.headers.get('X-API-KEY');
      const url = new URL(request.url);
      const prefCode = url.searchParams.get('prefCode');

      // APIキーチェックと応答の実装
      if (requestApiKey !== process.env.REACT_APP_X_API_KEY) {
        return HttpResponse.json(
          { message: 'Invalid API Key' },
          { status: 403 },
        );
      }

      if (!prefCode) {
        return HttpResponse.json(
          { message: 'Prefecture code is required' },
          { status: 400 },
        );
      }

      // 成功時のレスポンス
      return HttpResponse.json(
        {
          message: null,
          result: {
            boundaryYear: 2020,
            data: [
              {
                label: '総人口',
                data: [
                  { year: 2015, value: 5381733 },
                  { year: 2020, value: 5224614 },
                ],
              },
              { label: '年少人口', data: [] },
            ],
          },
        },
        { status: 200 },
      );
    },
  ),
);

// MSW ライフサイクルフック
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getPopulation', () => {
  it('fetches population data successfully for a valid prefCode', async () => {
    const prefCode = 1; // 有効な都道府県コード
    const prefName = 'Hokkaido';

    const population = await getPopulation(prefCode, prefName);

    // 正しいデータが返却されるかを検証
    expect(population).toEqual<PopulationType>({
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2015, value: 5381733 },
            { year: 2020, value: 5224614 },
          ],
        },
        { label: '年少人口', data: [] },
      ],
      prefCode: prefCode,
      prefName: prefName,
    });
  });

  it('returns a 403 error for an invalid API key', async () => {
    // 無効な API キーをモック
    server.use(
      http.get(`${apiUrl}/api/v1/population/composition/perYear`, () =>
        HttpResponse.json({ message: 'Invalid API Key' }, { status: 403 }),
      ),
    );

    const prefCode = 1;
    const prefName = 'Hokkaido';

    // エラーがスローされるかを検証
    await expect(getPopulation(prefCode, prefName)).rejects.toThrow(
      'Request failed with status code 403',
    );
  });

  it('returns a 400 error for an invalid prefCode', async () => {
    // 無効な都道府県コードをモック
    server.use(
      http.get(`${apiUrl}/api/v1/population/composition/perYear`, () =>
        HttpResponse.json(
          { message: 'Prefecture code is required' },
          { status: 400 },
        ),
      ),
    );

    const prefCode = 0; // 無効な都道府県コード
    const prefName = 'Unknown';

    // エラーがスローされるかを検証
    await expect(getPopulation(prefCode, prefName)).rejects.toThrow(
      'Request failed with status code 400',
    );
  });
});
