// # language: ru
//
// Функционал: Регистрация груза
//   Как пользователь user или админ
//   Я должен иметь возможность регистрировать новый груз
//   После ввода данных и отправки данных
//
//   @tripRegister
//   Сценарий: Регистрация нового груза
//     Допустим я захожу на страницу "login"
//     Если я введу данные:
//       | email    | admin@gmail.com |
//       | password | admin           |
//     И нажимаю на кнопку "Sign In"
//     То я вижу текст "HELLO, ADMIN"
//     Допустим я открываю страницу "loads/?status=upcoming"
//     И я нажимаю на кнопку "add"
//     Если я напишу данные:
//       | datePU    | 11/24/2022   |
//       | dateDEL   | 11/25/2022   |
//       | timeToPU  | 11:20        |
//       | timeToDel | 20:35        |
//       | loadCode  | T-D1A38SR1C  |
//       | pu        | Boston, MA   |
//       | del       | New-York, NY |
//       | miles     | 235          |
//       | rpm       | 3,3          |
//       | price     | 775,5        |
//       | comment   | some comment |
//
//     Затем нажимаю на выбор компании "Driver"
//     И нажимаю на компанию "1"
//
//     Также прикрепляю в поле "RC" файл "images/rc.pdf"
//     Также прикрепляю в поле "BOL" файл "images/bol.pdf"
//
//     Когда нажимаю на "Save"
//     То я вижу "Trip created!"
//
//
//   @registerTripFailed
//   Сценарий: Регистрация нового груза не прошла
//     Допустим я захожу на страницу "login"
//     Если я введу данные:
//       | email    | admin@gmail.com |
//       | password | admin           |
//     И нажимаю на кнопку "Sign In"
//     То я вижу текст "HELLO, ADMIN"
//     Допустим я открываю страницу "loads/?status=upcoming"
//     И я нажимаю на кнопку "add"
//     Если я напишу данные:
//       | datePU    | 11/24/2022   |
//       | dateDEL   | 11/25/2022   |
//       | timeToPU  | 11:20        |
//       | timeToDel | 20:35        |
//       | loadCode  | T-114K1J2M7  |
//       | pu        | Boston, MA   |
//       | del       | New-York, NY |
//       | miles     | 235          |
//       | rpm       | 3,3          |
//       | price     | 775,5        |
//       | comment   | some comment |
//     Когда нажимаю на "Save"
//     То я вижу "Trip creation failed!"
