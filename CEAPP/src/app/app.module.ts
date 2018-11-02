import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ContratoPage } from '../pages/contrato/contrato';
import { ProyectoPage } from '../pages/proyecto/proyecto';
import { RegistroPage } from '../pages/registro/registro';
import { SubastaPage } from '../pages/subasta/subasta';
import { PerfilPage } from '../pages/perfil/perfil';
import { CrearSubastaPage } from '../pages/crear-subasta/crear-subasta';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ContratoPage,
    ProyectoPage,
    RegistroPage,
    SubastaPage,
    PerfilPage,
    CrearSubastaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ContratoPage,
    ProyectoPage,
    RegistroPage,
    SubastaPage,
    PerfilPage,
    CrearSubastaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
