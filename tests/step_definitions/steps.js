const { I } = inject();

Given('я захожу на страницу {string}', (page) => {
  I.amOnPage('/' + page);
  I.wait(4);
});

Given('я введу данные:', () => {
  // From "features/auth.feature" {"line":10,"column":3}
  throw new Error('Not implemented yet');
});

When('нажимаю на кнопку {string}', () => {
  // From "features/auth.feature" {"line":13,"column":3}
  throw new Error('Not implemented yet');
});

Then('я вижу текст {string}', () => {
  // From "features/auth.feature" {"line":14,"column":3}
  throw new Error('Not implemented yet');
});
