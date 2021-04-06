# dubai-sightseeing

1. For the Front End execute the following commands
    - cd angularFE
    - npm install
    - npm start
2. Vital info    
    - localhost:4200 is the url you need to type for the site after it is built
    - in the logIn(top right corner) to test admin rights enter 
        - username: admin
        - password: admin
    - I also created another user with guest rights if you want to test it
        - username: lemon
        - password: 1234
    - extra dependencies:
        - "ngx-spinner": "^10.0.1"(not the latest version as there where issues)
        - "@types/lodash": "^4.14.168"
        - "ngx-cookie-service": "^11.0.2"
        - "@kolkov/angular-editor": "^1.1.4"
    - Angular version: 11+



1. For the Back end execute the following commands
    - cd express-parse
    - npm install
    - either nodemon index.js(if you have the package nodemon) or npm start
2. Vital Info
    - localhost:5000/dashboard is the url to access the parse dashboard
        - username: InstaShop
        - password: password
    - extra dependencies:
        - "dotenv": "^8.2.0"
        - "sharp": "^0.28.1"
