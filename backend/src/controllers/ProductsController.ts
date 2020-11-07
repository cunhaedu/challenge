import Product from '@entities/Product';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import productValidator from '../validators/ProductValidator';

export default class CompaniesController {
  public async index(req: Request, res: Response) {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find();

    return res.json(products);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      res.status(400).json({ message: 'Cannot find any product with that id' });
    }

    return res.json(product);
  }

  public async create(req: Request, res: Response) {
    const {
      name,
      little_size_base,
      middle_size_base,
      large_size_base,
    } = req.body;

    const productRepository = getRepository(Product);

    const findProductWithSameName = await productRepository.findOne({
      where: {
        name,
      },
    });

    if (findProductWithSameName) {
      return res.status(400).json({ message: 'Theres already a product registered with that name. Please, try it again with another name.' });
    }

    const data = {
      name,
      little_size_base,
      middle_size_base,
      large_size_base,
    };

    await productValidator.validate(data, {
      abortEarly: false,
    });

    const product = productRepository.create(data);

    await productRepository.save(product);

    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      little_size_base,
      middle_size_base,
      large_size_base,
    } = req.body;

    const productRepository = getRepository(Product);

    const findProductById = await productRepository.findOne(id);

    if (!findProductById) {
      return res.status(400).json({ message: 'cannot find any product with that id.' });
    }

    const findProductWithSameName = await productRepository.findOne({
      where: {
        name,
      },
    });

    if (findProductWithSameName && findProductWithSameName.name !== name) {
      return res.status(400).json({ message: 'Theres already a product registered with that name. Please, try it again with another name.' });
    }

    const data = {
      name,
      little_size_base,
      middle_size_base,
      large_size_base,
      updated_at: new Date(),
    };

    await productValidator.validate(data, {
      abortEarly: false,
    });

    await productRepository.update(id, data);

    const updatedProduct = await productRepository.findOne(id);

    return res.status(201).json(updatedProduct);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      res.status(400).json({ message: 'Cannot find any company with that id' });
    }

    await productsRepository.delete(id);

    return res.json();
  }
}
