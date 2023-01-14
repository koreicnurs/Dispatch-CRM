# language: ru

Функционал: Добавление новой категории базы знаний
  Как пользователь админ
  Я должен иметь возможность добавить новую категорию
  После ввода данных и отправки данных

  @addLearningCategory
  Сценарий: Добавление новой категории
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
      | title    | Cancelled load  |
    Затем нажимаю на "Save"
    То я вижу "Learning Category is added!"

  @addLearningCategoryFailed
  Сценарий: Добавление новой категории не прошла
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    То я нажимаю на кнопку "add"
    Если я напишу данные:
      | title    | Cancelled load  |
    Затем нажимаю на "Save"
    То я вижу "Learning Category creation failed!"

  @filterLearningCategory
  Сценарий: Поиск Learning Category по введенным данным
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    То я ввожу данные в поле поиска
    Если я введу следующие данные "Dis"
    То я вижу сущность с данными "Dispatch"

  @addLearningArticle
  Сценарий: Добавление новой статьи
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    И нажимаю на категорию "Dispatch"
    То я нажимаю на кнопку "add"
#    Затем нажимаю на выбор категории "Category"
#    И нажимаю на категорию "Dispatch"
    Если я напишу данные:
      | title       | test title       |
      | description | test description |
      | text        | test text        |

    Затем нажимаю на "Save"
    То я вижу "Learning Article is added!"

  @addLearningArticleFailed
  Сценарий: Добавление новой статьи не прошло
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    И нажимаю на категорию "Dispatch"
    То я нажимаю на кнопку "add"
#    Затем нажимаю на выбор категории "Category"
#    И нажимаю на категорию "Dispatch"
    Если я напишу данные:
      | title       | test title       |
      | description | test description |
      | text        | test text        |
    Затем нажимаю на "Save"
    То я вижу "Learning Article creation failed!"

  @editLearningArticle
  Сценарий: Успешное редактирование статьи
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    И нажимаю на категорию "Dispatch"
    То нажимаю на кнопку редактирования статьи
    Если я введу данные в форму редактирования статьи:
      | title       | test             |
      | description | test description |
      | text        | test text        |
    Затем нажимаю на "Save"
    То я вижу "You have successfully edited an Article!"

  @editLearningArticleFailed
  Сценарий: Ошибочное редактирование статьи
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    И нажимаю на категорию "Dispatch"
    То нажимаю на кнопку редактирования статьи
    Если я введу данные в форму редактирования статьи:
      | title       | Lorem Ipsum      |
      | description | test description |
      | text        | test text        |
    Затем нажимаю на "Save"
    То я вижу "Article editing failed!"

  @deleteLearningArticle
  Сценарий: Успешное удаление статьи
    Допустим я захожу на страницу "login"
    Если я введу данные:
      | email    | admin@gmail.com |
      | password | admin           |
    И нажимаю на кнопку "Sign In"
    То я вижу текст "HELLO, ADMIN"
    Допустим я открываю страницу "learnings"
    И нажимаю на категорию "Dispatch"
    Затем нажимаю на кнопку удаления статьи
    То я вижу "You have successfully deleted an Article!"
