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
      | phoneNumber | 333333333    |
      | mc          | 1234         |
      | dot         | 126          |
      | fedid       | 88-237       |
      | description | test company |
    Затем нажму на кнопку выбора документа "Browse"
    И выбираю нужный файл для документа "images/doc.pdf"

    Затем нажимаю на "Save"
    То я вижу "Carrier created!"

  @registerCarrierFailed
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
      | phoneNumber | 333333333       |
      | mc          | 1180196         |
      | dot         | 3537967         |
      | fedid       | 83-3826233      |
      | description | test company #1 |
    Затем нажму на кнопку выбора документа "Browse"
    И выбираю нужный файл для документа "images/doc.pdf"

    Затем нажимаю на "Save"
    То я вижу "Carrier creation failed!"


#  @filterCarrier
#  Сценарий: Поиск Carrier по введенным данным
#    Допустим я захожу на страницу "login"
#    Если я введу данные:
#      | email    | admin@gmail.com |
#      | password | admin           |
#    И нажимаю на кнопку "Sign In"
#    То я вижу текст "HELLO, ADMIN"
#    Допустим я открываю страницу "carriers"
#    То я ввожу данные в поле поиска
#    Если я введу следующие данные "918995"
#    То я вижу "918995"
