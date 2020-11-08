import * as Yup from 'yup';

const createClientValidator = Yup.object().shape({
  name: Yup.string().required(),
  fantasy_name: Yup.string().required(),
  cnpj: Yup.string().required(),
  neighborhood: Yup.string().required(),
  size: Yup.string().required(),
  contact_email: Yup.string().required().email(),
  email: Yup.string().required().email(),
  cep: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  number_of_employees: Yup.number().required().integer(),
  contact_phone: Yup.string().required(),
  commercial_phone: Yup.string().required(),
  address: Yup.string().required(),
});

export default createClientValidator;
