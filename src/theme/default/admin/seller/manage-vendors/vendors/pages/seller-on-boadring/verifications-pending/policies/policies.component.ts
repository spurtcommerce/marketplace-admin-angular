import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentmodalComponent } from '../commentmodal/commentmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  opencommentlog() {
    const modelRef = this.modalService.open(CommentmodalComponent, {
      size: 'xl', windowClass: 'commentlogmodal right', backdrop: 'static', backdropClass: 'createcr'
    });
  }

}

