# install

1. react-router-dom     -->     npm install react-router-dom@latest
2. concurrently         -->     npm i concurrently

# include script

"both": "concurrently \"npm run start\" \"nodemon backend/index.js\" "

include in package.json for start both things at a same time
command ->  npm run both

error:

localhost/:1 Access to fetch at 'http://localhost:5000/api/notes/fetchallnotes' from origin 'http://localhost:3000' has been blocked by CORS policy:

`npm install cors` in backend

