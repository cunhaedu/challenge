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

  it('should be able to create a new budget', async () => {
    const client = await request(app).post('/clients').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      size: 'Grande Porte',
      contact_email: 'furry.nick02@starkindustries.com',
      email: 'shild.contat@starkindustries.com',
      cep: '10110',
      city: 'New York',
      state: 'New York',
      number_of_employees: 712,
      contact_phone: '1938348520',
      commercial_phone: '1938348520',
      address: '890 Fifth Avenue',
    });

    expect(client.body).toEqual(
      expect.objectContaining({
        name: 'Nick Furry',
        fantasy_name: 'S.H.I.L.D',
        cnpj: '86.009.491/0001-57',
        neighborhood: 'Manhattan',
        size: 'Grande Porte',
        contact_email: 'furry.nick02@starkindustries.com',
        email: 'shild.contat@starkindustries.com',
        cep: '10110',
        city: 'New York',
        state: 'New York',
        number_of_employees: 712,
        contact_phone: '1938348520',
        commercial_phone: '1938348520',
        address: '890 Fifth Avenue',
      }),
    );

    const product = await request(app).post('/products').send({
      name: 'McDonnell Douglas F/A-18 Hornet',
      little_size_base: 57000000.00,
      middle_size_base: 67000000.00,
      large_size_base: 74000000.00,
    });

    expect(product.body).toEqual(
      expect.objectContaining({
        name: 'EA-18G Growler',
        little_size_base: 67000000.00,
        middle_size_base: 78000000.00,
        large_size_base: 80000000.00,
        ...product.body,
      }),
    );

    const response = await request(app).post('/budgets').send({
      sale_type: 'Parceiro',
      client_id: client.body.id,
      users_quantity: 50,
      taxes: 11,
      commission: 30,
      amount: 289000000.00,
      budget_products: [
        {
          product_id: product.body.id,
          tax_free_amount: 150000000.00,
          tax_amount: 165000000.00,
          value_for_partners: 49500000.00,
        },
      ],
    });

    expect(response.status).toBe(201);
  }, 30000);

  it('should not be able to create a budget without budget products', async () => {
    const response = await request(app).post('/budgets').send({
      sale_type: 'Parceiro',
      client_id: '257491a9-83b1-46e7-aa9d-517e1064b760',
      users_quantity: 50,
      taxes: 11,
      commission: 30,
      amount: 289000000.00,
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a budget with one client id that not exists', async () => {
    const response = await request(app).post('/budgets').send({
      sale_type: 'Parceiro',
      client_id: '257491a9-83b1-46e7-aa9d-517e1064b760',
      users_quantity: 50,
      taxes: 11,
      commission: 30,
      amount: 289000000.00,
      budget_products: [
        {
          product_id: '3d96137c-8855-479c-91ed-7adfd962132e',
          tax_free_amount: 150000000.00,
          tax_amount: 165000000.00,
          value_for_partners: 49500000.00,
        },
      ],
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a budget with a product id that not exists', async () => {
    const client = await request(app).post('/clients').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      size: 'Grande Porte',
      contact_email: 'furry.nick02@starkindustries.com',
      email: 'shild.contat@starkindustries.com',
      cep: '10110',
      city: 'New York',
      state: 'New York',
      number_of_employees: 712,
      contact_phone: '1938348520',
      commercial_phone: '1938348520',
      address: '890 Fifth Avenue',
    });

    const response = await request(app).post('/budgets').send({
      sale_type: 'Parceiro',
      client_id: client.body.id,
      users_quantity: 50,
      taxes: 11,
      commission: 30,
      amount: 289000000.00,
      budget_products: [
        {
          product_id: '3d96137c-8855-479c-91ed-7adfd962132e',
          tax_free_amount: 150000000.00,
          tax_amount: 165000000.00,
          value_for_partners: 49500000.00,
        },
        {
          product_id: '257491a9-83b1-46e7-aa9d-517e1064b760',
          tax_free_amount: 150000000.00,
          tax_amount: 165000000.00,
          value_for_partners: 49500000.00,
        },
      ],
    });

    expect(response.status).toBe(400);
  });
});
