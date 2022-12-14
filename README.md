Starting the server part

- cd copilot-backend-challenge-back
- npm run start:dev

In order to shorten the link, you need to make the following request

POST - http://localhost:8080/url
Request body:
    {
        url: 'example.com'
    }

In order to get a link by a shortened id, you need to make the following request

GET - http://localhost:8080/:shortenedURL
shortenedURL - Shortened id

In order to get a shortened id, you can go to the information storage location and copy the shortened id
Path - copilot-backend-challenge-back/src/json-database/database/urlData.json

Starting the client part

- cd copilot-backend-challenge-client
- npm run dev

There is a handler in the client that receives a response from the backend and sends it back to confirm that the client has received the request

The logic is on the following path

- copilot-backend-challenge-client/pages/api/index.js

Run test:
- Global test npm run test:e2e
- Simple test npm run test
