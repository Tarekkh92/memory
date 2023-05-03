import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { GameComponent } from './app/game/game.component';



const appRoutes: Routes = [
     { path: "home", component: HomeComponent },
      { path: "game", component: GameComponent },
    
      { path: "", component: GameComponent },


];



@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppRoutingModule { }


