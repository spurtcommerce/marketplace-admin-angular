import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { companyVerifySandbox } from '../../../../../../../../../../../src/core/admin/manageseller/companyverify/companyverify.sandbox';
import { SellerManagementSandbox } from '../../../../../../../../../../../src/core/admin/manageseller/sellermanagement/sellermanagement.sandbox';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-commentmodal',
  templateUrl: './commentmodal.component.html',
  styleUrls: ['./commentmodal.component.scss']
})
export class CommentmodalComponent implements OnInit {

  //textarevalue
  textarea: any
  //seller_id
  id: any
  //commentName
  name: any

  //arrayvalue
  arrvalue:any

  commentlist:any

  
  constructor(private activeModal: NgbActiveModal, private cdRef: ChangeDetectorRef, public sandox: SellerManagementSandbox ,public sandboxcompany: companyVerifySandbox , public titleService: Title) {
    this.titleService.setTitle('Seller Onboarding'); 
  }

  ngOnInit(): void {



   this.getList()

  }
  public dismiss() {
    this.activeModal.close();
  }



  getList() {
    const param = { vendorId: this.id };
    this.sandboxcompany.companyVerifyList(param);
    this.sandboxcompany.companyVerifyList$.subscribe(val => {
      if (val.status == 1) {
        this.commentlist = val?.data.verificationDetailComment;
        this.cdRef.detectChanges(); // Manually trigger change detection after updating commentlist
      }
    });
  }


  save() {

    if([undefined,null,""].includes(this.textarea)){

    }else{

    const params = {
        comment: this.textarea,
        commentFor: this.name,
        vendorId: this.id
      }
      this.sandox.comment(params)
      this.sandox.comment$.subscribe(val=>{
        if(val.status==1){
          this.textarea=""
         this.getList()
         
        }
      })
    }

  }

}
