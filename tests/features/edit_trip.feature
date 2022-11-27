# language: ru

Функционал: Редактирование данных о грузе
  Как пользователь user или админ
  Я должен иметь возможность редактировать данные о грузе
  После ввода данных и отправки данных

  @upcomingEditTrips
  Сценарий: Успешное редактирование данных груза
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу "loads?status=upcoming"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
#    Затем я вижу "Edit"
    То я нажимаю на кнопку открытия модального окна для формы редактирования груза "Edit"
    Если я введу данные в форму редактирования груза:
      | datePU    | 11/29/2022    |
      | dateDEL   | 12/05/2022    |
      | timeToPU  | 11:20         |
      | timeToDel | 20:35         |
      | loadCode  | T-D1A38SR1C   |
      | pu        | Pittsburg, PA |
      | del       | New-York, NY  |
      | miles     | 500           |
      | rpm       | 3             |
      | price     | 775,5         |
      | comment   | some comment  |
#      | email       | petr@gmail.com         |
#      | name        | Petr                   |
#      | phoneNumber | 3305772012             |
#      | address     | US, IL, Chicago c., 75 |
#      | DOB         | 07.09.1988             |
#      | info        | Some driver info       |
#      | reference   | Communicative          |
#    Затем нажимаю на выбор компании для редактирования "BAHAWAY"
#    И нажимаю на компанию "TURAN EXPRESS"
#
#    Затем нажимаю на выбор статуса для редактирования "in transit"
#    И нажимаю на статус "upcoming"
#
#    Затем нажимаю на кнопку редактирования водителя "Save"
#    То я вижу текст о успешном редактировании водителя "You have successfully updated a driver!"


  @upcomingEditTrips
  Сценарий: Успешное редактирование данных груза
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"

    Допустим я открываю страницу водителей "loads?status=upcoming"
    И нажимаю на кнопку, чтобы открыть форму редактирования данных о грузе
    Затем я вижу "Edit"
    Если я введу данные в форму редактирования груза:
      | datePU    | 11/29/2022    |
      | dateDEL   | 12/05/2022    |
      | timeToPU  | 11:20         |
      | timeToDel | 20:35         |
      | loadCode  | T-D1A38SR1C   |
      | pu        | Pittsburg, PA |
      | del       | New-York, NY  |
      | miles     | 500           |
      | rpm       | 3             |
      | price     | 775,5         |
      | comment   | some comment  |

    Затем нажимаю на выбор статуса для редактирования "upcoming"
    И нажимаю на статус "transit"

    Затем нажимаю на выбор водителя "Keldibek"
    И нажимаю на водителя "Mirbek"

    Также прикрепляю в поле "RC" файл "images/rc.pdf"
    Также прикрепляю в поле "BOL" файл "images/bol.pdf"

    Когда нажимаю на кнопку "Save"
    То я вижу "Trip edited!"



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
    Если я напишу данные:
      | datePU    | 01/26/2023    |
      | dateDEL   | 01/13/2023    |

    Когда нажимаю на кнопку "Save"
    То я вижу текст об ошибке некорректной даты "Error! DEL date cannot be earlier than PU date!"
    И я вижу текст о ошибке редактирования "Trip edit failed!"

