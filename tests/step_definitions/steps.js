
const { I } = inject();

Given('я захожу на страницу {string}', (page) => {
  I.amOnPage('/' + page);
});

Given('я введу данные:', (table) => {
  table.rows.forEach(row => {
    const name = row.cells[0].value;
    const value = row.cells[1].value;

    I.fillField(name, value);

  });
});

When('нажимаю на кнопку {string}', buttonText => {
  I.click(`//form//button[contains(text(), "${buttonText}")]`);

  I.wait(6);
});

Then('я вижу текст {string}', text => {
 I.see(text);
});




Given('я открываю страницу {string}', page => {
  console.log(page);

});

Then('я нажимаю на кнопку {string}', () => {
  // From "features/carrier.feature" {"line":11,"column":3}
  throw new Error('Not implemented yet');
});

When('я напишу данные:', () => {
  // From "features/carrier.feature" {"line":12,"column":3}
  throw new Error('Not implemented yet');
});

Then('нажимаю на {string}', () => {
  // From "features/carrier.feature" {"line":18,"column":3}
  throw new Error('Not implemented yet');
});

Then('я вижу {string}', () => {
  // From "features/carrier.feature" {"line":19,"column":3}
  throw new Error('Not implemented yet');
});
