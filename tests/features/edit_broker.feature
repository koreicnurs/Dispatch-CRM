# language: ru

Функционал: Редактирование Broker
  Как пользователь user или админ
  Я должен иметь возможность редактировать существущего Broker
  После ввода данных и отправки данных

  @brokerEdit
  Сценарий: Успешное редактирование Broker
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "brokers"
    И нажимаю на кнопку редактирования брокера
    Если я введу новые данные:
      | description | test broker edit |
    Затем нажимаю на "Save"
    То я вижу "You have successfully edited a broker!"

#  @editBrokerFailed
#  Сценарий: Ошибочное редактирование Broker
#    Допустим я захожу на страницу "login"
#    Если я введу данные:
#      | email    | admin@gmail.com |
#      | password | admin           |
#    И нажимаю на кнопку "Sign In"
#    То я вижу текст "HELLO, ADMIN"
#    Допустим я открываю страницу "brokers"
#    И нажимаю на кнопку редактирования брокера
#    Если я введу новые данные:
#      | name        | Ali          |
#      | phoneNumber | ++0333333333 |
#      | mc          | 238164       |
#      | description | test broker  |
#    Затем нажимаю на "Save"
#    То я вижу "Broker edit is failed!"