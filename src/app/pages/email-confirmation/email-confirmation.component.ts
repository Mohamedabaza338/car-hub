import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedHttpService } from './../../shared/services/shared-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  
  constructor(private _route: ActivatedRoute,private sharedService : SharedHttpService,private toastr :ToastrService,private router : Router) { }
  
  ngOnInit(): void {
    this.confirmEmail();
  }
  
  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];
    localStorage.setItem('token',token);
    console.log('email',email)
    this.sharedService.get(`EmailConfirmation?email=${email}&token=${token}`).subscribe(res=>{
      if(res){
        this.toastr.success('تم تأكيد بريدك الإلكتروني');
        this.showSuccess=true;
      }
    })
  }
  navigate(){
    let userType=localStorage.getItem('userType');
    if(userType=='User'){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/payment']);
    }
  }

}
