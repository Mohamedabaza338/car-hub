import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  name:any;
  phone:any;
  email:any;
  subject:any;
  message:any;

  constructor(public sharedService:SharedHttpService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  sendMessage(){
    let obj={
      "name": this.name,
      "phone": this.phone,
      "email": this.email,
      "message": this.message,
      "subject": this.subject
    }
    this.sharedService.post(`api/ContactUs/AddContactUS`,obj).subscribe(res=>{
      this.toastr.success('تم إرسال رسالتك بنجاح ');
      this.name=undefined;
      this.phone=undefined;
      this.email=undefined;
      this.message=undefined;
      this.subject=undefined;

    });
  }

}
