# language: ru

Функционал: Регистрация водителя
  Как пользователь user или админ
  Я должен иметь возможность регистрировать нового водителя
  После ввода данных и отправки данных

  @driverRegister
  Сценарий: Регистрация нового водителя
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "drivers"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
      | email       | jhondoe@gmail.com |
      | name        | Jhon Doe          |
      | phoneNumber | 3213213212        |
      | address     | test address      |
      | DOB         | test DOB          |
      | info        | test info         |
      | reference   | test reference    |
    Затем нажимаю на выбор компании "Carriers"
    И нажимаю на компанию "2"

    Затем нажму на кнопку выбора лицензии "Browse"
    И выбираю нужный файл для лицензии "images/license.jpg"

    Затем нажимаю на "Save"
    То я вижу текст "You have successfully added a driver!"


    @registerDriverFailed
  Сценарий: Регистрация нового водителя не прошла
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
      Допустим я открываю страницу "drivers"
      То я нажимаю на кнопку "add"
      Если я напишу данные:
      | email       | umot@gmail.com                   |
      | name        | Umot                             |
      | phoneNumber | +2675350802                      |
      | address     | US, LA, Avalan c., str. 1, h. 45 |
      | DOB         | 15.12.1980                       |
      | info        | Lorem ipsum dolor sit amet       |
      | reference   | Punctual, decent                 |
    Затем нажимаю на выбор компании "Carriers"
    И нажимаю на компанию "2"

    Затем нажму на кнопку выбора лицензии "Browse"
    И выбираю нужный файл для лицензии "images/license.jpg"

    Затем нажимаю на "Save"
    То я вижу текст "Driver creation failed!"


  @filterDriver
  Сценарий: Поиск Driver по введенным данным
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "drivers"
    То я ввожу данные в поле поиска
    Если я введу следующие данные "umot@gmail.com"
    То я вижу "umot@gmail.com"