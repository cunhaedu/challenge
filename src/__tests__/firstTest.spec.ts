import Companies from '@entities/Company';

test('it should be ok', () => {
  const companies = new Companies();

  companies.name = 'Eduardo';

  expect(companies.name).toEqual('Eduardo');
});
