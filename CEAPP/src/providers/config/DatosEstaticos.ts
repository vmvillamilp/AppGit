import { Injectable } from '@angular/core';

@Injectable()
export class DatosEstaticos {
  public urlServidor:string = "http://161.10.194.218:42500";
  private email:string;
  private password:string;

  setDatosUsuario(email , password){
    this.email=email;
    this.password = password;
  }

  getEmailUsuarioConectado(){
    return this.email;
  }

  getPasswordUsuarioConectado(){
    return this.password;
  }

}
