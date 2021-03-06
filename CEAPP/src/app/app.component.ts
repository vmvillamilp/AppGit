import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ContratoPage } from '../pages/contrato/contrato';
import { ProyectoPage } from '../pages/proyecto/proyecto';
import { RegistroPage } from '../pages/registro/registro';
import { SubastaPage } from '../pages/subasta/subasta';
import { PerfilPage } from '../pages/perfil/perfil';
import { CrearSubastaPage } from '../pages/crear-subasta/crear-subasta';

import { DatosEstaticos} from '../providers/config/DatosEstaticos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public staticData: DatosEstaticos, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Contrato', component: ContratoPage},
      { title: 'Crear Subasta', component: CrearSubastaPage},
      { title: 'Home', component: HomePage},
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage},
      { title: 'Perfil', component: PerfilPage},
      { title: 'Proyecto', component: ProyectoPage },
      { title: 'Registro', component: RegistroPage},
      { title: 'Subasta', component: SubastaPage},
      { title: 'Salir', component: LoginPage}
    ];

  }

  salir(){
    console.log("Llamando a salir");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Salir"){
      this.salir();
    }else{
      this.nav.setRoot(page.component);
    }

  }
}
