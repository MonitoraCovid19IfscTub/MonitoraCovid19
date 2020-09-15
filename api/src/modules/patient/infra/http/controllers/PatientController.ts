import CreateANewPatientService from '@modules/patient/services/CreateANewPatientService';
import Professional from '@modules/professional/infra/typeorm/entities/Professional';
import { Request, Response } from 'express';
import Patient from '../../typeorm/entities/Patient';

export default class PatientController {
  async create(request: Request, response: Response) {
    const data = request.body;
  try{
    console.log(data);
      //verifivar se o email já existe e retorna erro caso sim
    const createANewPatientService = new CreateANewPatientService(data);
    const patient = await createANewPatientService.run();
    if(!patient){
      return response.status(400).send({error : "invalid data, please check the data and try again"});

    }
    console.log(patient);
    return response.send();

  }catch(err){
    return response.status(500).send({err,
      error : 'failed register patient, try again'});
  }


    // quais dados cadastrar
/*

    */

    //criar um service para cadastrar estes dados


    // devolver sucesso


    // enviar um email para o email cadastrado
    //sendgrid
    /// professional authenticate
    /// const {professionalId} = response.professionalId;
    return response.status(200).send({message : "VOcê é um profissional autenticado!"});
  }
}
