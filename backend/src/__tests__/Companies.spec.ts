import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '../typeorm';

import app from '../app';

let connection: Connection;

describe('Companies', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS companies');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM companies');
    await connection.query('DELETE FROM products');
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
    const company = await request(app).post('/companies').send({
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

    expect(company.body).toEqual(
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

    expect(response.status).toBe(400);
  });

  it('should delete a company by id', async () => {
    const company = await request(app).post('/companies').send({
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

    const { id } = company.body;

    const response = await request(app).delete(`/companies/${id}`);

    expect(response.status).toBe(200);
  });
});
