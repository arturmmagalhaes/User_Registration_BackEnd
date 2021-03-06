import dayjs from "dayjs";
import axios from "axios";
import { AddressDatabase } from "../database/AddressDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class AddressBusiness {

    constructor(
        private addressDatabase: AddressDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async insertAddress(dataController: any) {
        if(!dataController || !dataController.cep || !dataController.street || !dataController.number || !dataController.complement || !dataController.city || !dataController.state || !dataController.token){
            throw new Error("Invalid Entry");
        }

        if(!(await this.getAddress(dataController))){
            throw new Error("Invalid Entry");
        }

        if(dataController.nextendpoint !== "ADDRESS"){
            throw new Error("Invalid Path");
          }

        const id = this.idGenerate.generate();
        const id_user = await this.authenticator.getData(dataController.token)

        await this.addressDatabase.insertAddress({
            id,
            cep: dataController.cep,
            street: dataController.street,
            number: dataController.number,
            complement: dataController.complement,
            city: dataController.city,
            state: dataController.state,
            id_user,
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }

    public async updateAddress(dataController: any) {
        if(!dataController || !dataController.id || !dataController.cep || !dataController.street || !dataController.number || !dataController.complement || !dataController.city || !dataController.state || !dataController.token){
            throw new Error("Invalid Entry");
        }

        if(!(await this.getAddress(dataController))){
            throw new Error("Invalid Entry");
        }

        const id_user = await this.authenticator.getData(dataController.token)

        await this.addressDatabase.updateAddress({
            id: dataController.id,
            cep: dataController.cep,
            street: dataController.street,
            number: dataController.number,
            complement: dataController.complement,
            city: dataController.city,
            state: dataController.state,
            id_user,
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }

    public async getAddress(dataController: any){
        return axios.get(`http://viacep.com.br/ws/${dataController.cep}/json/`)
            .then(response => {
                if(response.data.logradouro.toLowerCase() !== dataController.street.toLowerCase()||
                   response.data.localidade.toLowerCase() !== dataController.city.toLowerCase()) {
                    return false;
                   }
                return true;
            })
            .catch(error => {
                console.log(error);
            });
    }
}