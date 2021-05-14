import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NavbarModule } from './componentes/navbar/navbar.module';
import { FooterComponent } from './componentes/footer/footer.component';
import { FooterModule } from './componentes/footer/footer.module';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NavbarModule,
    FooterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
