import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '../typeorm';

import app from '../app';

let connection: Connection;

describe('Clients', () => {
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

  it('should be able to create a new client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      size: 'Grande Porte',
      contact_email: 'furry.nick@starkindustries.com',
      email: 'shild.contat@starkindustries.com',
      cep: '10110',
      city: 'New York',
      state: 'New York',
      number_of_employees: 712,
      contact_phone: '1938348520',
      commercial_phone: '1938348520',
      address: '890 Fifth Avenue',
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Nick Furry',
        fantasy_name: 'S.H.I.L.D',
        cnpj: '86.009.491/0001-57',
        neighborhood: 'Manhattan',
        size: 'Grande Porte',
        contact_email: 'furry.nick@starkindustries.com',
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
  });

  it('should not be able to create a client with one e-mail thats already registered', async () => {
    const client = await request(app).post('/clients').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      size: 'Grande Porte',
      contact_email: 'furry.nick@starkindustries.com',
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
        contact_email: 'furry.nick@starkindustries.com',
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

    const response = await request(app).post('/clients').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      size: 'Grande Porte',
      contact_email: 'furry.nick@starkindustries.com',
      email: 'shild.contat@starkindustries.com',
      cep: '10110',
      city: 'New York',
      state: 'New York',
      number_of_employees: 712,
      contact_phone: '1938348520',
      commercial_phone: '1938348520',
      address: '890 Fifth Avenue',
    });

    expect(response.status).toBe(400);
  });

  it('should delete a client by id', async () => {
    const client = await request(app).post('/clients').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      size: 'Grande Porte',
      contact_email: 'furry.nick@starkindustries.com',
      email: 'shild.contat@starkindustries.com',
      cep: '10110',
      city: 'New York',
      state: 'New York',
      number_of_employees: 712,
      contact_phone: '1938348520',
      commercial_phone: '1938348520',
      address: '890 Fifth Avenue',
    });

    const { id } = client.body;

    const response = await request(app).delete(`/clients/${id}`);

    expect(response.status).toBe(200);
  });
});
