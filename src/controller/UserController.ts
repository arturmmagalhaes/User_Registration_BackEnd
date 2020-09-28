import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerate } from "../services/IdGenerate";

export class UserController {
    
    private static USERBUSINESS = new UserBusiness(
        new UserDatabase() as any,
        new IdGenerate() as any,
        new HashManager(),
        new Authenticator() as any
    );

    public async createUser(req: Request, res: Response){
        try {

            const token = await UserController.USERBUSINESS.createUser({
                email: req.body.email,
                password: req.body.password
            });
            
            res.status(200).send({
                token,
                "next-end-point": "CPF" 
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async insertCPF(req: Request, res: Response){
        try {
            await UserController.USERBUSINESS.insertCPF({
                token: req.headers.authorization as string,
                cpf: req.body.cpf
            });

            res.status(200).send({
                message: "Insert CPF!",
                "next-end-point": "Fullname" 
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async insertName(req: Request, res: Response){
        try {
            await UserController.USERBUSINESS.insertName({
                token: req.headers.authorization as string,
                name: req.body.name
            });

            res.status(200).send({
                message: "Insert Name!",
                "next-end-point": "Birthday" 
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async insertBirthday(req: Request, res: Response){
        try {
            await UserController.USERBUSINESS.insertBirthday({
                token: req.headers.authorization as string,
                birthday: req.body.birthday
            });

            res.status(200).send({
                message: "Insert Birthday!",
                "next-end-point": "Phone" 
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}