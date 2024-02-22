import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  Selectedlang='';
  activeTab =[false,false,false,false,false];
  constructor( private router: Router) { }
  ngOnInit(): void {
    if(this.router.url.includes('/brands')){
      this.activeTab.map((el:any,i:any)=>{
        if(i===0){
          this.activeTab[i]=true;
        }else{
          this.activeTab[i]=false;
        }
      })
    }else if(this.router.url.includes('/messages')){
      this.activeTab.map((el:any,i:any)=>{
        if(i===1){
          this.activeTab[i]=true;
        }else{
          this.activeTab[i]=false;
        }
      })
    }else if(this.router.url.includes('/products')){
      this.activeTab.map((el:any,i:any)=>{
        if(i===2){
          this.activeTab[i]=true;
        }else{
          this.activeTab[i]=false;
        }
      })
    }else if(this.router.url.includes('/orders')){
      this.activeTab.map((el:any,i:any)=>{
        if(i===3){
          this.activeTab[i]=true;
        }else{
          this.activeTab[i]=false;
        }
      })
    }else{
      this.activeTab.map((el:any,i:any)=>{
        if(i===4){
          this.activeTab[i]=true;
        }else{
          this.activeTab[i]=false;
        }
      })
    }
  }

  logOut(){
    localStorage.clear(); 
    this.router.navigate(['/']).then(() => { window.location.reload();});
  }



}
