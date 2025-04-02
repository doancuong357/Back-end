import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color:rgb(226, 231, 188);
                }
                h1 {
                    font-size: 3rem;
                    text-align: center;
                    color: #333;
                }
                svg {
                cursor:pointer;
                }
            </style>
        </head>
        <body>
            <h1><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -1050 960 960" width="50px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg> HOME PAGE</h1>
        </body>
        </html>`
    );
});

app.use('/users', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//khacs nhau giua import va require
// so sanh web sever(Nginx,Apache)va Server Backend
// tim hieu nhung cai vua code vaf folder trong project
//app.use(express.json());