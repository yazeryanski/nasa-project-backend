import app from 'app';
import request from 'supertest';
import {
  inputForAdding,
  inputForAddingWithInvalidDate,
  inputForAddingWithMissingProps,
  inputForAddingWithoutDate,
} from './mockInputData';

describe('Initially launches should be empty', () => {
  const API = request(app);

  test('GET | Should get empty array', async () => {
    const req = await API.get('/launches');

    expect(req.statusCode).toBe(200);
    expect(req.body.status).toBe(true);
    expect(req.body.data).toHaveLength(0);
  });
});

describe('Adding new launches and checking all list', () => {
  const API = request(app);

  test('POST | Should add a new launch', async () => {
    const req = await API.post('/launches').send(inputForAdding);

    expect(req.statusCode).toBe(201);
    expect(req.body.status).toBe(true);
    expect(req.body.data).toMatchObject(inputForAddingWithoutDate);
  });

  test('GET | Should get 1 launch after adding', async () => {
    const req = await API.get('/launches');

    expect(req.statusCode).toBe(200);
    expect(req.body.status).toBe(true);
    expect(req.body.data).toHaveLength(1);
  });

  test('GET | Should get 5 launch after adding another 4 launches', async () => {
    const requests = [
      API.post('/launches').send(inputForAdding),
      API.post('/launches').send(inputForAdding),
      API.post('/launches').send(inputForAdding),
      API.post('/launches').send(inputForAdding),
    ];

    await Promise.all(requests);

    const req = await API.get('/launches');

    expect(req.statusCode).toBe(200);
    expect(req.body.status).toBe(true);
    expect(req.body.data).toHaveLength(5);
  });
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
    const req = await API.post('/launches').send(inputForAddingWithInvalidDate);

    expect(req.statusCode).toBe(400);
    expect(req.body).toEqual({
      status: false,
      messages: ['The launchDate property is invalid'],
    });
  });
});
