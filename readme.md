# Quiz App Game

### Competing in a quiz with players around the **WORLD** anonymously was the object in writing this website.

### The Objective of this game is to get a score of 10 as quickly as possible.

### Every question answered correctly gives the player 1 point.

### Every question answered wrong subtracts the player score by 1 point.

### The final score calculated is based on two parameters, 
  - Number of questions answered. (answering more than ten questions to reach a score of 10 will obviously give a penalty to the score.)
  - Time taken to answer said questions. (more time means less score.)

# This Website is hosted live at the url: https://quiz-app-veeru.netlify.app/

---

## Contents Of This Project

- client
- server

## server

    node main.js

The main.js is the code required to setup the express server.

The highScores.json file is the single database file and is required by the main.js

The Procfile can be used to deploy to heroku easily.

## client

    npm run build

The above command must be run within the context front-end to build the front-end.

The Front-End was built using Vue3 and as such can be built using the above command.
