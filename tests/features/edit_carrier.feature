# language: ru

Функционал: Редактирование Carrier
  Как пользователь user или админ
  Я должен иметь возможность редактировать существущего Carrier
  После ввода данных и отправки данных

  @carrierEdit
  Сценарий: Регистрация нового Carrier
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "carriers"
    То я нажимаю на кнопку открытия модального окна для формы редактирования перевозчика
    Если я напишу данные:
      | title       | BAHAWAYCarrierNew |
      | mc          | 1180177           |
      | dot         | 3537977           |
      | fedid       | 83-3826233        |
      | description | test company New  |
    Затем нажимаю на "Save"
    То я вижу "You have successfully edited a carrier!"