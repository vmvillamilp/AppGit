import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { HttpClient} from '@angular/common/http';
import { LoadingProvider } from '../../providers/loading/loading';
import { DatosEstaticos } from '../../providers/config/DatosEstaticos';
import { Observable} from 'rxjs/Observable';

import { LoginPage } from '../login/login';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'registro.html',
})


export class RegistroPage {

  lastImage: string = null;
  cropImagePath:any;
  data: Observable<any>;

  regData = { name: '', mail: '', pass: '', cnfpass: '' };
  authForm : FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  cnfpass: AbstractControl;
  passwordtype:string='password';
  cnfpasswordtype:string='password';
  cnfpasseye:string='eye';
  passeye:string ='eye';

  constructor(public staticData: DatosEstaticos ,public loadingProvider: LoadingProvider, public platform: Platform, public file: File, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient){
    this.authForm = this.fb.group({
      'username' : [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cnfpass': [null, Validators.compose([Validators.required])]
    });

    this.username = this.authForm.controls['username'];
    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
    this.cnfpass = this.authForm.controls['cnfpass'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(regData){
    if(regData.pass == regData.cnfpass){
      this.loadingProvider.startLoading();
      var url = this.staticData.urlServidor;

      let postData = new FormData();
      postData.append("name", regData.name);
      postData.append("pass", regData.pass);
      postData.append("mail", regData.mail);

      this.data = this.http.post(url+"/php/registrarNuevoUsuario.php",postData);
      this.data.subscribe(data =>{
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

    }else {
      this.presentToast('Both password are not matched!');
    }
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            //this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
    quality: 100,
    sourceType: sourceType,
    allowEdit: true,
    saveToPhotoAlbum: true,
    correctOrientation: true
  };

  // Get the data of an image
  /*
  this.camera.getPicture(options).then((imagePath) => {
  alert('imagePath '+imagePath);
  this.cropImagePath = imagePath;
  // Special handling for Android library
  if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  this.filePath.resolveNativePath(imagePath)
  .then(filePath => {
  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
});
} else {
var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
}
}, (err) => {
this.presentToast('Error while selecting image.');
});*/
}

private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
/*
alert('pathName->>'+namePath+'->currentName-->'+currentName+'->newFileName-->'+newFileName);
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.lastImage = newFileName;
}, error => {
this.presentToast('Error while storing file.');
});*/
}

moveToLogin(){
  this.navCtrl.pop();
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
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
managecnfPassword() {
  if(this.cnfpasswordtype == 'password'){
    this.cnfpasswordtype='text';
    this.cnfpasseye='eye-off';
  }else{
    this.cnfpasswordtype='password';
    this.cnfpasseye = 'eye';
  }
}

}
