import http from 'http';
import logger from './utilities/logger.js';

const server = http.createServer((req,res)=>{

    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/plain')
    // res.end('Test route')
    
    switch(req.url){
        case '/': {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        res.end('Home route')
        logger.info('Successful Home request')
        break;
        }
        case '/about': 
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        res.end('About route')
        break;

        case '/contact': 
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        res.end('Contact route')
        break;

        case '/login': 
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        res.end('Login route')
        break;

        case '/product': 
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain')
        res.end('Product route')
        break;

        default: 
        res.statusCode = 400;
        res.setHeader('Content-Type','text/plain')
        res.end('Page Not Found')

                        }
});

server.listen(9000, "localhost",()=>{
    console.log(`Server active at http://localhost:9000`)
})