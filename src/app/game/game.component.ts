import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { historiesService } from '../shared/services/histories.service';
import { GameHistory } from '../shared/models/history.model';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent   implements OnInit{
    
   
    bool: boolean=true;
    moves: number=0;
    duration1: number;
    duration: number;
    startOfGame:Date;
    endOfGame: Date;
    count: number=0;
    Seconds: number;
    Minutes: number;
    Hours:number;
    totalTime:Date;
    // imgSrc: string = "assets/flippedDown.png";
    index:number;
    lock:boolean=false;
    private sub: Subscription;
    public history: GameHistory[];
    now: String;
    counter :number=1;
    constructor(private historiesService : historiesService) {
        
        
    }
    
    boxes1 =[
            {
             picID:2,
             picDescription:"fox",
             picName:"assets/2.jpg",
             clicked:false
              
            },
            {
                picID:3,
                picDescription:"lama",
                picName:"assets/3.jpg",
                clicked:false  
            },
               {
                picID:4,
                picDescription:"dog" ,
                picName:"assets/4.jpg"
                ,clicked:false  
               },
               {
                picID:5,
                picDescription:"panda"  ,
                picName:"assets/5.jpg" 
                ,clicked:false
               },
               {picID:6,
                picDescription:"mouse", 
                picName:"assets/6.jpg"  
                ,clicked:false
               },
               {picID:7,
                picDescription:"quala"   ,
                picName:"assets/7.jpg"
                ,clicked:false
               },
               {
                picID:8,
                picDescription:"elephant"   ,
                picName:"assets/8.jpg"
                ,clicked:false
               },
               {
                picID:9,
                picDescription:"tiger",
                picName:"assets/9.jpg"
                ,clicked:false
               
               },
               {picID:2,
                picDescription:"fox",
                picName:"assets/2.jpg"
                ,clicked:false  
               },
               {
                   picID:3,
                   picDescription:"lama",
                   picName:"assets/3.jpg",
                   clicked:false   
               },
                  {
                   picID:4,
                   picDescription:"dog" ,
                   picName:"assets/4.jpg"
                   ,clicked:false  
                  },
                  {
                   picID:5,
                   picDescription:"panda"  ,
                   picName:"assets/5.jpg"
                   ,clicked:false 
                  },
                  {picID:6,
                   picDescription:"mouse", 
                   picName:"assets/6.jpg" 
                   ,clicked:false 
                   
                  },
                  {picID:7,
                   picDescription:"panda1"   ,
                   picName:"assets/7.jpg"
                   ,clicked:false
                  },
                  {
                   picID:8,
                   picDescription:"elephant"   ,
                   picName:"assets/8.jpg"
                   ,clicked:false
                  },
                  {
                   picID:9,
                   picDescription:"tiger",
                   picName:"assets/9.jpg"
                   ,clicked:false   
                  },
              
                  
    ];
  
    
    
    ngOnInit() {
        this.sub = this.historiesService.getHistoryAsync()
        .subscribe(history => this.history = history);
          this.boxes1=this.shuffle(this.boxes1);
        this.startOfGame=new Date();
        setInterval(() => {
            
            this.Hours = new Date().getHours();
            this.Minutes = new Date().getMinutes();
            this.Seconds = new Date().getSeconds();
            this.now="     "+this.Hours +":"+ this.Minutes + ":"+ this.Seconds;
              }, 1);
        for(let i=0;i<this.boxes1.length;i++){
            this.boxes1[i].picName="assets/flippedDown.png";
        }

       
    }
 
  


shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}




playerClick(i,bool)
{   
  
    if(this.counter==1 &&this.boxes1[i].clicked==false  )
    {
       // console.log("first");
        this.index=i;
         this.boxes1[i].picName="assets/"+this.boxes1[i].picID+".jpg";
        this.lock=true;
        this.counter+=1;  
        
    }
    else if(this.counter==2 &&this.boxes1[i].picID==this.boxes1[this.index].picID && this.index!=i
        && this.boxes1[this.index].clicked==false &&this.boxes1[i].clicked==false )
    {    
       
            this.boxes1[i].picName="assets/"+this.boxes1[i].picID+".jpg";
            
            setTimeout(()=>{
                this.counter=0;
             this.boxes1[i].picName="assets/white.png";
             this.boxes1[this.index].picName="assets/white.png";
             this.boxes1[i].clicked=true;
             this.boxes1[this.index].clicked=true;
            this.count++;
            this.counter+=1;  
            },300);
            if(this.count==7)
            {
                
                
                this.endOfGame = new Date();
                this.duration= (new Date().getTime()-this.startOfGame.getTime());
                this.duration1= this.duration/1000;   
                this.totalTime= new Date();
                this.bool = false;      
                this.addHistory();

            }
         
    }
    else if(this.counter==2 &&this.boxes1[i].picID != this.boxes1[this.index].picID && 
        this.boxes1[this.index].clicked==false &&this.boxes1[i].clicked==false )
    {    
        this.boxes1[i].picName="assets/"+this.boxes1[i].picID+".jpg";
       
        setTimeout(() => { 
            this.counter=0;
            this.boxes1[this.index].picName="assets/flippedDown.png";
            this.boxes1[i].picName="assets/flippedDown.png";
            this.counter+=1;  
            this.moves++;
     }, 500);
    }
    else if(this.counter==2 &&this.boxes1[i].picID != this.boxes1[this.index].picID && 
        this.boxes1[this.index].clicked==false &&this.boxes1[i].clicked==true ||
        this.boxes1[this.index].clicked==true &&this.boxes1[i].clicked==false  )
    {    
        
        this.counter=0;
        this.counter+=1;  
    }
    
     
   
    
  
 
}

ngOnDestroy(): void {
    this.sub.unsubscribe();
}
public addHistory() {
    if (this.duration1>59.01)
    {
       
        this.duration1=this.duration1/60;
    }

      var history= new GameHistory(
          this.endOfGame.toLocaleDateString()+
          " "+this.endOfGame.toLocaleTimeString(),this.moves+(this.count+1),this.duration1);
      this.sub =  this.historiesService.addGameAsync(history).subscribe();
      setTimeout(() => { 
       window.location.href = "/game";
    }, 3000);
}





}
