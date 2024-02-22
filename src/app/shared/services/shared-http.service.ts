import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var webGlObject: any;


@Injectable({
    providedIn: 'root'
})
export class SharedHttpService {
    baseUrl: string = "ht0/";
    correspondanceDetailsObj: any;
    closeResult: string = '';

  

    get CurrentUserId(): boolean {
        return JSON.parse(localStorage.getItem("user")).userId;
    }
    constructor(private http: HttpClient, private translate: TranslateService,private modalService: NgbModal) {
        let wegObj = new webGlObject();
        this.baseUrl = wegObj.baseUrl;
        
    }

    get(url: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + url);
    }
    post(url: any, data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + url, data);
    }
    put(url: any, data: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + url, data);
    }

    delete(url): Observable<any> {
        // const options = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json',
        //     }),
        //     body: data,
        // };
        return this.http.delete<any>(this.baseUrl + url);
    }
    downloadFileGet(url: any): Observable<any> {
        return this.http.get(this.baseUrl + url, { responseType: 'arraybuffer' });
    }
    TranslateKey(key: any): Observable<any> {
        return this.translate.get(key);
    }
    numberOnly(event) {
        var inp = String.fromCharCode(event.keyCode);
        let pattern =/^\d+$/;
        if (pattern.test(inp)) {
          return true;
        } else {
          event.preventDefault();
          return false;
        }
    }
    open(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    openLg(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true,size:'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }



}
