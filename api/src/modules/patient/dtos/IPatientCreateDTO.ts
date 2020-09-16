import Professional from "@modules/professional/infra/typeorm/entities/Professional";
import Profile from "@modules/Profile/infra/typeorm/entities/Profile";

export default interface IPatientCreateDTO {

  name: string;

  birthDate: string;

  email :string;

  password :string;

  contact :string;

  monitoringStart: string;

  professional: Professional;

  accompanying?:{
    name : string;
    contact : string;
	},

  address: {
    street: string;
    number: number;
    complement: string;
    postalCode: string;
    neighborhood: string;
    city: string;
    state: string;
  }
}
