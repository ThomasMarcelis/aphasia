import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuizPage } from '../pages/quiz/quiz';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import {TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {Http} from "@angular/http";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuizPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuizPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},]
})
export class AppModule {


}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
