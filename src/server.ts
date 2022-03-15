import express, { Request, Response, ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import routerApi from '../src/routes/api';

dotenv.config();

const server = express();

server.use(cors())

server.use(express.static(path.join(__dirname, '../public')));
// server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(routerApi);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400) //Bad Request

    if(err instanceof MulterError) {
        res.json({
            error: err.code,
            message: err.message
        })
    } else {
        console.log(err);
        res.json({error: 'Ocorreu algum erro.'})
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);