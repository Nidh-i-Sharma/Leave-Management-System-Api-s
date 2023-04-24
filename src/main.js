import express from 'express'; 
import * as dotenv from 'dotenv'
import connectDB from './config/db';
import home from './controller/home'
const app = express();
dotenv.config()

    // We will store our client files in ./client directory.

const port = process.env.PORT;
const mongoDBURL = process.env.MONGOURI;
connectDB(mongoDBURL).then((res) =>{
    console.log(res);
})

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api',home);




app.listen(port , () => {
    console.log(`server started on ${port}`)
})