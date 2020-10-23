import { defaultCipherList } from "constants";

export default interface IEmailService {

  send(to :string, templateDir :string , context : object) : boolean;

}
