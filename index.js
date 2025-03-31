import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = process.env.PORT

app.get('/',(req , res) => {
    res.status(200).json({
        message:'Heloo em',
        name:'Cuong',
        age:21,
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
//khacs nhau giua import va require
// so sanh web sever(Nginx,Apache)va Server Backend
// tim hieu nhung cai vua code vaf folder trong project