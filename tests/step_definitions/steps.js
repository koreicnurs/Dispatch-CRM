
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

  I.wait(4);
});

Then('я вижу текст {string}', text => {
 I.see(text);
});




Given('я открываю страницу {string}', page => {
  I.amOnPage('/' + page);
  I.wait(2);
});

Then('я нажимаю на кнопку {string}', add => {
  I.click(`[alt="${add}"]`);
});

const uniqNumber = new Date().getTime();

When('я напишу данные:', table => {
  table.rows.forEach(row => {
    const name = row.cells[0].value;
    const value = row.cells[1].value;
    I.fillField(name, `${value}${uniqNumber}`);
  });
});

Then('нажимаю на {string}', buttonText => {
  I.click(`//form//button[contains(text(), "${buttonText}")]`);

  I.wait(3);
});

Then('я вижу {string}', text => {
  I.see(text);
});
