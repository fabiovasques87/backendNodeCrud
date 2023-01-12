import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoute from './routes/api';
import mainRoutes from './routes/index';


dotenv.config();



const server = express();

server.use(cors({
    origin:'*'
}));

server.use(express.urlencoded({
    extended:true
}));

server.use(express.json());



server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));


server.use(apiRoute);
server.use(mainRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});

server.listen(process.env.PORT);