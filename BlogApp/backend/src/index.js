//console.log('Hello World!')

import { app } from "./app.js";
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
const resultEnvLoading= dotenv.config({
    path: './.env'
})
if (resultEnvLoading.error) {
    console.log(`Error loading environment variables`);
    throw resultEnvLoading.error;
} else {
    
}

const port = process.env.PORT || 9001;

connectDB().then(()=>{
    app.listen(port ,()=>{
        console.log(`Server active at: http://localhost:${port}` )
    })
    
}).catch((err)=>{console.log(`Mongo db connection error hua`)});
