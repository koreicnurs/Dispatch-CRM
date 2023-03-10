# language: ru

Функционал: Регистрация Broker
    Как пользователь user или админ
    Я должен иметь возможность регистрировать новый Broker
    После ввода данных и отправки данных

@brokerRegister
Сценарий: Регистрация нового Broker
    Допустим я захожу на страницу "login"
    Если я введу данные:
        | email    | admin@gmail.com |
        | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "brokers"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
        | name        | Ali          |
        | phoneNumber | 333333333    |
        | mc          | 1234         |
        | description | test broker  |
    Затем нажимаю на выбор компании "Carriers"
    И нажимаю на компанию "2"
    Затем нажимаю на "Save"
    То я вижу текст "Broker created!"

@registerBrokerFailed
Сценарий: Регистрация нового Broker не прошла
    Допустим я захожу на страницу "login"
    Если я введу данные:
        | email    | admin@gmail.com |
        | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "brokers"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
        | name        | Ali          |
        | phoneNumber | 333333333    |
        | mc          | 238164       |
        | description | test broker  |
    Затем нажимаю на выбор компании "Carriers"
    И нажимаю на компанию "2"
    Затем нажимаю на "Save"
    То я вижу текст "Broker creation failed!"
