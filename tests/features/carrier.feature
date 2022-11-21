# language: ru

Функционал: Регистрация Carrier
  Как пользователь user или админ
  Я должен иметь возможность регистрировать новый Carrier
  После ввода данных и отправки данных

  @carrierRegister
  Сценарий: Регистрация нового Carrier
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "carriers"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
      | title       | SWCS         |
      | mc          | 1234         |
      | dot         | 126          |
      | fedid       | 88-237       |
      | description | test company |
    Затем нажимаю на "Create"
    То я вижу "Carrier created!"

   @carrierRegisterFailed
  Сценарий: Регистрация нового Carrier не прошла
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "carriers"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
      | title       | BAHAWAY         |
      | mc          | 1180196         |
      | dot         | 3537967         |
      | fedid       | 83-3826233      |
      | description | test company #1 |
    Затем нажимаю на "Create"
    То я вижу "Carrier creation failed!"
