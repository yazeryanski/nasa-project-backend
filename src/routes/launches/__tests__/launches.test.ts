import app from 'app';
import request from 'supertest';
import {
  inputForAdding,
  inputForAddingWithInvalidDate,
  inputForAddingWithMissingProps,
} from './mockInputData';
import { disconnectDBConnection, setDbConnection } from 'db';

describe('Launches API', () => {
  beforeAll(async () => {
    await setDbConnection();
  });

  afterAll(async () => {
    await disconnectDBConnection();
  });

  describe('Adding new launches and checking all list', () => {
    const API = request(app);

    test('POST | Should add a new launch', async () => {
      const req = await API.post('/launches').send(inputForAdding);

      expect(req.statusCode).toBe(201);
      expect(req.body.status).toBe(true);
    });

    test('GET | Should get at least 1 launch', async () => {
      const req = await API.get('/launches');

      expect(req.statusCode).toBe(200);
      expect(req.body.status).toBe(true);

      expect(req.body.data.length).toBeGreaterThan(0);
    });

    describe('Failing cases when the input data is invalid', () => {
      const API = request(app);

      test('POST | Should fail when the input data is invalid', async () => {
        const req = await API.post('/launches').send(
          inputForAddingWithMissingProps
        );

        expect(req.statusCode).toBe(400);
        expect(req.body).toEqual({
          status: false,
          messages: ['Invalid Params'],
        });
      });

      test('POST | Should fail when the launchDate is invalid', async () => {
        const req = await API.post('/launches').send(
          inputForAddingWithInvalidDate
        );

        expect(req.statusCode).toBe(400);
        expect(req.body).toEqual({
          status: false,
          messages: ['The launchDate property is invalid'],
        });
      });
    });
  });
});
