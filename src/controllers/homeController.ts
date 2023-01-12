import { Request, Response } from 'express';
import { Json } from 'sequelize/types/utils';
import {sequelize } from '../instances/pg';

import { User } from '../models/User';

export const home = async (req:Request, res:Response) => {

    //Consultando dados
    let usuarios = await User.findAll();
    console.log("Usuários", JSON.stringify(usuarios));   //transformar em json
   JSON.stringify(usuarios);   //transformar em json
    res.json(usuarios);//exibe o json

    //testar a conexao com o banco
    try{
        await sequelize.authenticate();
        console.log("consexão estabelecida com sucesso!!!");    
    }catch(error){
        console.log("problemas", error);
    }

    // let age: number = 90;
    // let showOld: boolean = false;

    // if(age > 50) {
    //     showOld = true;
    // }

    // let list = Product.getAll();
    // let expensiveList = Product.getFromPriceAfter(12);

    // res.render('pages/home', {
    //     name: 'Bonieky',
    //     lastName: 'Lacerda',
    //     showOld,
    //     products: list,
    //     expensives: expensiveList,
    //     frasesDoDia: []
    // });
};


export const create = async (req:Request, res: Response) =>{
    
      let { name, age} = req.body;

      let newUsers = await User.create({name,age});

    // console.log(req.body);
    res.json({newUsers});
}

export const del = async (req:Request, res: Response) =>{
    let {id} = req.params;
    await User.destroy({where: {id}});
    res.json({id})
}


export const update = async (req: Request, res: Response) =>{
    let {id} = req.params;
    let {age, name} = req.body;

    let user = await User.findByPk(id);
    //se existir...
    if(user){
        user.age= age;
        user.name= name;
        await user.save();

        res.json({user});
    } else{
        res.json({error: 'Usuario nao encontrado'});
    }
}