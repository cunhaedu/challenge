import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '../typeorm';

import app from '../app';

let connection: Connection;

describe('Products', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS budgets_products');
    await connection.query('DROP TABLE IF EXISTS budgets');
    await connection.query('DROP TABLE IF EXISTS clients');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM clients');
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM budgets');
    await connection.query('DELETE FROM budgets_products');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new product', async () => {
    const response = await request(app).post('/products').send({
      name: 'EA-18G Growler',
      little_size_base: 67000000.00,
      middle_size_base: 78000000.00,
      large_size_base: 80000000.00,
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'EA-18G Growler',
        little_size_base: 67000000.00,
        middle_size_base: 78000000.00,
        large_size_base: 80000000.00,
      }),
    );
  });

  it('should not be able to create a product with one name thats already registered', async () => {
    const product = await request(app).post('/products').send({
      name: 'EA-18G Growler',
      little_size_base: 67000000.00,
      middle_size_base: 78000000.00,
      large_size_base: 80000000.00,
    });

    expect(product.body).toEqual(
      expect.objectContaining({
        name: 'EA-18G Growler',
        little_size_base: 67000000.00,
        middle_size_base: 78000000.00,
        large_size_base: 80000000.00,
      }),
    );

    const response = await request(app).post('/products').send({
      name: 'EA-18G Growler',
      little_size_base: 67000000.00,
      middle_size_base: 78000000.00,
      large_size_base: 80000000.00,
    });

    expect(response.status).toBe(400);
  });

  it('should delete a product by id', async () => {
    const product = await request(app).post('/products').send({
      name: 'EA-18G Growler',
      little_size_base: 67000000.00,
      middle_size_base: 78000000.00,
      large_size_base: 80000000.00,
    });

    const { id } = product.body;

    const response = await request(app).delete(`/products/${id}`);

    expect(response.status).toBe(200);
  });
});
