import * as Yup from 'yup';

const createCompanyValidator = Yup.object().shape({
  name: Yup.string().required(),
  little_size_base: Yup.number().required(),
  middle_size_base: Yup.number().required(),
  large_size_base: Yup.number().required(),
});

export default createCompanyValidator;
