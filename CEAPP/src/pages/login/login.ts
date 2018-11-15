import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { LoadingProvider } from '../../providers/loading/loading';
import { DatosEstaticos } from '../../providers/config/DatosEstaticos';
import { HttpClient} from '@angular/common/http';

import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : []
})
export class LoginPage {

	userData:any;
	loginData = { email:'', password:'' };
	authForm : FormGroup;
	email: AbstractControl;
	password: AbstractControl;
  passwordtype:string='password';
  passeye:string ='eye';

  constructor(private http: HttpClient, public staticData: DatosEstaticos ,public loadingProvider: LoadingProvider, public toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
  	this.authForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });

        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

/*------------------
--------------------*/

// For User Login

  userLogin(loginData){

    this.loadingProvider.startLoading();
      let email = loginData.email;
      let pass = loginData.password;

      var url = this.staticData.urlServidor;

      let postData = new FormData();
      postData.append("user", email);
      postData.append("pass", pass);

      let data = this.http.post(url+"/php/registrarNuevoUsuario.php",postData);
      data.subscribe(data =>{
        let obj = JSON.parse(JSON.stringify(data));
        this.loadingProvider.stopLoading();
        console.log(obj);
        if(obj.EstadoInsercion == 'Aprobado'){
            this.presentToast('Se ha registrado correctamente! Revise su correo para activar la cuenta.');
            this.navCtrl.setRoot(LoginPage);

        }else{
          this.presentToast('Se ha registrado correctamente! Revise su correo para activar la cuenta.');
        }
      });
    /*
  	console.log('loginData',loginData);
  		this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
        .then(result => {
          console.log('result >>',result);
          this.loadingProvider.stopLoading();
          this.moveToHome(result);
        }).catch(err => {
          this.loadingProvider.stopLoading();
          console.log('err',err);
          this.presentToast(err);
        });*/
  }


  // Move to register page
  moveToRegister(){
  	this.navCtrl.push(RegistroPage);
  }

  //Move to Home Page
  moveToHome(res){
  	console.log('res',res);
  	//this.navCtrl.setRoot(HomePage,{res:res});
  }

  presentToast(err) {
  const toast = this.toastCtrl.create({
    message: err.message,
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}

accederMenuPrincipal(){
  this.navCtrl.push(HomePage);
}

managePassword() {
  if(this.passwordtype == 'password'){
    this.passwordtype='text';
    this.passeye='eye-off';
  }else{
    this.passwordtype='password';
    this.passeye = 'eye';
  }
}
forgetpassword(){
  //this.navCtrl.setRoot(ForgetPage);
}

}
