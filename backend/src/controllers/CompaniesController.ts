import Company from '@entities/Company';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export default class CompaniesController {
  public async index(req: Request, res: Response) {
    const companiesRepository = getRepository(Company);

    const companies = await companiesRepository.find();

    return res.json(companies);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(id);

    if (!company) {
      res.status(400).json({ message: 'Cannot find any company with that id' });
    }

    return res.json(company);
  }

  public async create(req: Request, res: Response) {
    const {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      company_size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    } = req.body;

    const companiesRepository = getRepository(Company);

    const findCompanyWithSameEmail = await companiesRepository.findOne({
      where: {
        contact_email,
      },
    });

    if (findCompanyWithSameEmail) {
      return res.status(400).json({ message: 'Theres already a company registered with that email. Please, try it again with another email.' });
    }

    const data = {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      company_size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    };

    const company = companiesRepository.create(data);

    await companiesRepository.save(company);

    return res.status(201).json(company);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      company_size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    } = req.body;

    const companiesRepository = getRepository(Company);

    const findCompanyById = await companiesRepository.findOne(id);

    if (!findCompanyById) {
      return res.status(400).json({ message: 'cannot find any company with that id.' });
    }

    const data = {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      company_size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    };

    await companiesRepository.update(id, data);

    const updatedCompany = await companiesRepository.findOne(id);

    return res.status(201).json(updatedCompany);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(id);

    if (!company) {
      res.status(400).json({ message: 'Cannot find any company with that id' });
    }

    await companiesRepository.delete(id);

    return res.json();
  }
}
