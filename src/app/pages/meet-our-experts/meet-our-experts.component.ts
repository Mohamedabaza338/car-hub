import { Component, OnInit } from '@angular/core';
import { SharedHttpService } from 'src/app/shared/services/shared-http.service';

@Component({
  selector: 'app-meet-our-experts',
  templateUrl: './meet-our-experts.component.html',
  styleUrls: ['./meet-our-experts.component.scss']
})
export class MeetOurExpertsComponent implements OnInit {
  allExpertsArr:any=[];
  constructor(private sharedService : SharedHttpService) { }

  ngOnInit(): void {
    this.sharedService.get('TopRatted').subscribe(res=>{
      this.allExpertsArr=res;
    });
  }

}
