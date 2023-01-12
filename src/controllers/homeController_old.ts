import { Request, Response } from "express";
import {sequelize } from '../instances/pg';


export const home = async (req:Request, res:Response) => {
    //testar a conexao com o banco
    try{
        await sequelize.authenticate();
        console.log("consexão estabelecida com sucesso!!!");
    }catch(error){
        console.log("problemas", error);
    }
}