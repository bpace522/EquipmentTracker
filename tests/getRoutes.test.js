const express = require('express');
const request = require('supertest');
jest.mock('../models/writeOperations', () => ({
  getAllDocument: jest.fn(),
  getOneDocument: jest.fn(),
}));
const model = require('../models/writeOperations');
const routes = require('../routes/writeOperations');

const app = express();
app.use('/', routes);

afterEach(() => jest.clearAllMocks());

describe('GET inventory routes', () => {
  test('GET /inventory returns all inventory items with status 200', async () => {
    const inventory = [{ _id: 'item-1', name: 'Excavator' }];
    model.getAllDocument.mockResolvedValue(inventory);

    const response = await request(app).get('/inventory');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(inventory);
    expect(model.getAllDocument).toHaveBeenCalledWith('inventory');
  });

  test('GET /inventory/:id returns 404 for a valid but nonexistent ID', async () => {
    const id = '507f1f77bcf86cd799439011';
    model.getOneDocument.mockResolvedValue(null);

    const response = await request(app).get(`/inventory/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Document not found' });
    expect(model.getOneDocument).toHaveBeenCalledWith('inventory', id);
  });
});

describe('GET customer routes', () => {
  test('GET /customers returns all customers with status 200', async () => {
    const customers = [{ _id: 'customer-1', firstName: 'Ada' }];
    model.getAllDocument.mockResolvedValue(customers);

    const response = await request(app).get('/customers');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(customers);
    expect(model.getAllDocument).toHaveBeenCalledWith('customers');
  });

  test('GET /customers/:id returns 404 for a valid but nonexistent ID', async () => {
    const id = '507f1f77bcf86cd799439012';
    model.getOneDocument.mockResolvedValue(null);

    const response = await request(app).get(`/customers/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Document not found' });
    expect(model.getOneDocument).toHaveBeenCalledWith('customers', id);
  });
});
