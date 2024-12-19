/**
 * @jest-environment node
 */

import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';
import { setupServer } from 'msw/node';
import { PopulationType } from '../../../../interface/population';
import { getPopulation } from '../getPopulation';

const apiUrl = process.env.REACT_APP_API_URL || '';

const server = setupServer(
  http.get<PathParams, DefaultBodyType>(
    `${apiUrl}/api/v1/population/composition/perYear`,
    ({ request }) => {
      const requestApiKey = request.headers.get('X-API-KEY');
      const url = new URL(request.url);
      const prefCode = url.searchParams.get('prefCode');

      if (requestApiKey !== process.env.REACT_APP_X_API_KEY) {
        return HttpResponse.json(
          { message: 'Invalid API Key' },
          { status: 403 },
        );
      }

      if (Number(prefCode ?? 0) < 1 || Number(prefCode ?? 0) > 47) {
        return HttpResponse.json(
          { message: 'invalid Prefecture code' },
          { status: 404 },
        );
      }

      if (!prefCode) {
        return HttpResponse.json(
          { message: 'Prefecture code is required' },
          { status: 400 },
        );
      }

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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getPopulation', () => {
  it('fetches population data successfully for a valid prefCode', async () => {
    const prefCode = 1;
    const prefName = 'Hokkaido';

    const population = await getPopulation(prefCode, prefName);

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
    server.use(
      http.get(`${apiUrl}/api/v1/population/composition/perYear`, () =>
        HttpResponse.json({ message: 'Invalid API Key' }, { status: 403 }),
      ),
    );

    const prefCode = 1;
    const prefName = 'Hokkaido';

    await expect(getPopulation(prefCode, prefName)).rejects.toThrow(
      'Request failed with status code 403',
    );
  });

  it('returns a 400 error for an invalid prefCode', async () => {
    server.use(
      http.get(`${apiUrl}/api/v1/population/composition/perYear`, () =>
        HttpResponse.json(
          { message: 'Prefecture code is required' },
          { status: 400 },
        ),
      ),
    );

    const prefCode = 0;
    const prefName = 'Unknown';

    await expect(getPopulation(prefCode, prefName)).rejects.toThrow(
      'Request failed with status code 400',
    );
  });

  it('returns a 404 error for a non-existent prefCode', async () => {
    server.use(
      http.get(`${apiUrl}/api/v1/population/composition/perYear`, () =>
        HttpResponse.json(
          { message: 'Requested prefecture not found' },
          { status: 404 },
        ),
      ),
    );

    const prefName = 'Non-existent Prefecture';

    await expect(getPopulation(48, prefName)).rejects.toThrow(
      'Request failed with status code 404',
    );
    await expect(getPopulation(0, prefName)).rejects.toThrow(
      'Request failed with status code 404',
    );
  });
});
