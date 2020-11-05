import Companies from '@models/Company';

test('it should be ok', () => {
  const companies = new Companies();

  companies.name = 'Eduardo';

  expect(companies.name).toEqual('Eduardo');
});
