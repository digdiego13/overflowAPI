# OverflowAPI
## About this Project
OverFlow is an API that controlls different types of questions and answers.


## Database Layout

first of all, you can create a dev DATABASE just openning "createDatabase.txt" file and copying the scripts there.

## Functionalities

post users: create user using the following objet
```
{
  name: 'exemplo nome',
  classroom: 'turma exemplo'
}
```

post question: create new question. use the following object:

```
{
	question: "Uki ta contecendo?",
	student: "Zoru",
	classroom: "T3",
	tags: "typescript, vida, javascript, java?"
}
```

get questions: list all unanswered questions.

get questions /:id  : receive question with this id.

post question /:id : answer question. Use Bearer Token and the following object:

```
{
	answer: "teste"
}
```

## Installing

**Cloning the Repository**

```
$ git clone https://github.com/digdiego13/overflowAPI.git
```

**Installing dependencies**

```
$ npm install
```

**Run the application in development mode**

Create a .env.dev file and fill it using your environment variables following the .env.example

```
$ ntl -> dev
```


## Technologies
Main thechnologies used in the construction of the project:<br>
<p>
  <img src="https://img.shields.io/badge/-Nodejs-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Express-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-PostgreSQL-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Jest-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Typescript-green?style=for-the-badge" />
</p>

