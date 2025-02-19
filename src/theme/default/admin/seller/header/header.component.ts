import { Component, HostListener, OnInit } from '@angular/core';
import { permissionConfigs } from '../../shared/components/services/permission.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  permissionVals: any = permissionConfigs;

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.checked = false;
  }

  checked: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onclick(e){
    this.checked = true
  }
  combineArrays(...arrays: any[]): any[] {
    return [].concat(...arrays);
  }

}
