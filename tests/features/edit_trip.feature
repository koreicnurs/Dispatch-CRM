# language: ru

Функционал: Редактирование данных о грузе
  Как пользователь user или админ
  Я должен иметь возможность редактировать данные о грузе
  После ввода данных и отправки данных

  @upcomingEditTrips
  Сценарий: Успешное редактирование данных груза в upcoming
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу "loads?status=upcoming"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"

    Если я напишу данные о грузе:
      | datePU   | 01/27/2023    |
      | dateDEL  | 02/16/2023    |
      | loadCode | T-111111161   |
      | pu       | Pittsburg, PA |
      | del      | Boston, MA    |
      | miles    | 503           |
      | rpm      | 5             |
      | price    | 8000          |
      | comment  | Test comment  |

    Затем нажимаю на выбор статуса для редактирования "upcoming"
    И нажимаю на статус "transit"

    Затем нажимаю на выбор водителя "Keldibek"
    И нажимаю на водителя "Mirbek"

    Также прикрепляю в поле "RC" файл "images/rc.pdf"
    Также прикрепляю в поле "BOL" файл "images/bol.pdf"

    Затем нажимаю на кнопку редактирования водителя "Save"
    То я вижу текст о успешном редактировании водителя "Trip edited!"


  @editTripsUpcomingFailed
  Сценарий: Неуспешное редактирование данных груза
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу водителей "loads?status=upcoming"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"
    Если я напишу данные о грузе:
      | datePU   | 01/26/2023    |
      | dateDEL  | 01/13/2023    |
      | loadCode | T-111111111   |
      | pu       | Pittsburg, PA |
      | del      | New-York, NY  |
      | miles    | 500           |
      | rpm      | 2             |
      | price    | 1000          |
      | comment  | Some comment  |
    Когда нажимаю на кнопку "Save"
    То я вижу текст об ошибке некорректной даты "Error! DEL date cannot be earlier than PU date!"
    И я вижу текст о ошибке редактирования "Trip edit failed!"


  @transitEditTrips
  Сценарий: Успешное редактирование данных груза в transit
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу "loads?status=transit"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"

    Если я напишу данные о грузе:
      | datePU   | 12/08/2022      |
      | dateDEL  | 01/10/2023      |
      | loadCode | T-111111161     |
      | pu       | Pittsburg, PA   |
      | del      | Boston, MA      |
      | miles    | 450             |
      | rpm      | 3               |
      | price    | 9000            |
      | comment  | Transit comment |

    Затем нажимаю на выбор статуса для редактирования "transit"
    И нажимаю на статус "finished"

    Также прикрепляю в поле "RC" файл "images/rc.pdf"
    Также прикрепляю в поле "BOL" файл "images/bol.pdf"

    Затем нажимаю на кнопку редактирования водителя "Save"
    То я вижу текст о успешном редактировании водителя "Trip edited!"


  @editTransitTripsFailed
  Сценарий: Неуспешное редактирование данных груза
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу водителей "loads?status=upcoming"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"
    Если я напишу данные о грузе:
      | datePU   | 11/29/2022    |
      | dateDEL  | 11/02/2022    |
      | loadCode | T-111111111   |
      | pu       | Pittsburg, PA |
      | del      | New-York, NY  |
      | miles    | 699           |
      | rpm      | 5             |
      | price    | 6000          |
      | comment  | Test2 comment |
    Когда нажимаю на кнопку "Save"
    То я вижу текст об ошибке некорректной даты "Error! DEL date cannot be earlier than PU date!"
    И я вижу текст о ошибке редактирования "Trip edit failed!"


  @historyEditTrips
  Сценарий: Успешное редактирование данных груза в history
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу "loads?status=finished"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"

    Если я напишу данные о грузе:
      | datePU   | 12/31/2022      |
      | dateDEL  | 01/18/2023      |
      | loadCode | T-111561161     |
      | pu       | Pittsburg, PA   |
      | del      | Boston, MA      |
      | miles    | 900             |
      | rpm      | 4               |
      | price    | 2000            |
      | comment  | History comment |

    Также прикрепляю в поле "RC" файл "images/rc.pdf"
    Также прикрепляю в поле "BOL" файл "images/bol.pdf"

    Затем нажимаю на кнопку редактирования водителя "Save"
    То я вижу текст о успешном редактировании водителя "Trip edited!"

  @tripsHistoryEditFailed
  Сценарий: Неуспешное редактирование данных груза
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу водителей "loads?status=finished"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"
    Если я напишу данные о грузе:
      | datePU   | 11/29/2022    |
      | dateDEL  | 10/02/2022    |
      | loadCode | T-111111111   |
      | pu       | Pittsburg, PA |
      | del      | New-York, NY  |
      | miles    | 699           |
      | rpm      | 5             |
      | price    | 6000          |
      | comment  | Test2 comment |
    Когда нажимаю на кнопку "Save"
    То я вижу текст об ошибке некорректной даты "Error! DEL date cannot be earlier than PU date!"
    И я вижу текст о ошибке редактирования "Trip edit failed!"


  @noRightsEditForUser
  Сценарий: Успешное редактирование данных груза в history
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | user@gmail.com |
      | password | user           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, USER"

    Допустим я открываю страницу "loads?status=finished"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Attach"
    Также я вижу "Leave a comment"
    Также я вижу "View all"
