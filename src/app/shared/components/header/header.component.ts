import { Component, OnInit} from '@angular/core';
import { SharedHttpService } from '../../services/shared-http.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items={'home':true,'aboutUs':false,'courses':false,'schedule':false,'blog':false,'contactUs':false};
  userId:any;
  constructor(public sharedService: SharedHttpService,public router: Router, ) {
  }

  ngOnInit() {
    this.userId= localStorage.getItem('id') ?localStorage.getItem('id')  : undefined;
    
    
  }
  changeActive(navItemName){
    let url=this.router.url.split('/');
    if(url.length===2){
      console.log(url,this.items.home)
      this.items.home=false;
      console.log(this.items)
    }else{
      this.items[url[2]]=false;

    }

    this.items[navItemName]=true;
    if(navItemName=='home'){
      this.router.navigate(['/GYMAWY']);
    }else{
      this.router.navigate([`/GYMAWY/${navItemName}`]);
    }
    console.log(this.items)

  }
  logOut(){
    localStorage.clear(); 
    this.router.navigate(['/']).then(() => { window.location.reload();});
  }

  


}
