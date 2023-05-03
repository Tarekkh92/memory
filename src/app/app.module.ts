import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { historiesService } from './shared/services/histories.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GameComponent,

    
  
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [historiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
