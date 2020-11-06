import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '../typeorm';

import app from '../app';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS companies');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM companies');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new company', async () => {
    const response = await request(app).post('/companies').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      company_size: 'Grande Porte',
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
        company_size: 'Grande Porte',
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

  it('should not be able to create a company with one e-mail thats already registered', async () => {
    const customer = await request(app).post('/customers').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      company_size: 'Grande Porte',
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

    expect(customer.body).toEqual(
      expect.objectContaining({
        name: 'Nick Furry',
        fantasy_name: 'S.H.I.L.D',
        cnpj: '86.009.491/0001-57',
        neighborhood: 'Manhattan',
        company_size: 'Grande Porte',
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

    const response = await request(app).post('/customers').send({
      name: 'Nick Furry',
      fantasy_name: 'S.H.I.L.D',
      cnpj: '86.009.491/0001-57',
      neighborhood: 'Manhattan',
      company_size: 'Grande Porte',
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
});
