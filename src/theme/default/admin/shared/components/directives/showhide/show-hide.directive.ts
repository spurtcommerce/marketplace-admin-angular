import { Directive, ElementRef, Input } from '@angular/core';
import { apiResp, apiResponse,permission } from '../../services/permission.constant';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {
  @Input() appShowHide?: any = false;
  @Input() multipleHideUnAuthorized?: any = [];
  @Input() hideUnAuthorized?:string = null;
  
  constructor(private el: ElementRef) {
  }
  
  ngOnInit() {
   let otherUser = JSON.parse(sessionStorage.getItem('permissions')) ?? {};
  
  if(Object.keys(otherUser).length == 0){
    otherUser = permission
  }
  
  const hasTrueValue = this.multipleHideUnAuthorized.some(key => otherUser[key]);
   
  if(this.multipleHideUnAuthorized.length>0 && !hasTrueValue) {
    this.el.nativeElement.style.display = 'none';
  }
  
  if(this.hideUnAuthorized) {
      if(otherUser.hasOwnProperty(this.hideUnAuthorized) && !otherUser[this.hideUnAuthorized]) {
        this.el.nativeElement.style.display = 'none';
      }
  }
 
}

}
