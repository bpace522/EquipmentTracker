const express = require('express');
const request = require('supertest');

jest.mock('../models/writeOperations', () => ({
  getAllDocument: jest.fn(),
  getOneDocument: jest.fn(),
}));

const model = require('../models/writeOperations');
const originalRoutes = require('../routes/writeOperations');
const newRoutes = require('../routes/maintenanceReservationsWrite');

const app = express();
app.use(express.json());
app.use('/', originalRoutes);
app.use('/', newRoutes);

const validId = '507f1f77bcf86cd799439011';

const collections = [
  ['inventory', '/inventory'],
  ['customers', '/customers'],
  ['maintenance', '/maintenance/order'],
  ['reservations', '/reservations'],
];

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe.each(collections)('%s GET routes', (collectionName, path) => {
  test('GET all returns documents and status 200', async () => {
    const documents = [{ _id: validId }];
    model.getAllDocument.mockResolvedValue(documents);

    const response = await request(app).get(path);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(documents);
    expect(model.getAllDocument).toHaveBeenCalledWith(collectionName);
  });

  test('GET by ID returns the matching document and status 200', async () => {
    const document = { _id: validId };
    model.getOneDocument.mockResolvedValue(document);

    const response = await request(app).get(`${path}/${validId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(document);
    expect(model.getOneDocument).toHaveBeenCalledWith(
      collectionName,
      validId
    );
  });

  test('GET by ID rejects an invalid ID with status 400', async () => {
    const response = await request(app).get(`${path}/abc`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid document ID' });
    expect(model.getOneDocument).not.toHaveBeenCalled();
  });

  test('GET by ID returns 404 when the document does not exist', async () => {
    model.getOneDocument.mockResolvedValue(null);

    const response = await request(app).get(`${path}/${validId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Document not found' });
    expect(model.getOneDocument).toHaveBeenCalledWith(
      collectionName,
      validId
    );
  });

  test('GET all handles database errors with status 500', async () => {
    model.getAllDocument.mockRejectedValue(new Error('Database unavailable'));

    const response = await request(app).get(path);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });

  test('GET by ID handles database errors with status 500', async () => {
    model.getOneDocument.mockRejectedValue(new Error('Database unavailable'));

    const response = await request(app).get(`${path}/${validId}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});