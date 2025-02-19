/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <mailto:support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// angular imports 
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Sandbox 
import { PermissionSandbox } from '../../../../../../../../core/admin/settings/permission/permission.sandbox';
// third party imports  
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-permission',
  templateUrl: 'permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
  public limit = 20;
  public count: any;
  public offset = 0;

  public type: string;
  public id: number;
  public detail: any;
  public permissionList: any;
  private subscriptions: Array<Subscription> = [];
  public selectAllPermission = false;
  public permissionArray = [];
  public selectedPermissionArray: any = [];
  public finalData: any = [];
  data: any;
  selectedData: any = [];
  selectAllData = false;
  dataChecked: boolean = false;
  constructor(public route: ActivatedRoute, public sandbox: PermissionSandbox, public changeDetect: ChangeDetectorRef,
    public router: Router, public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Access and permission');
  }
  ngOnInit() {
    this.detail = JSON.parse(this.route.snapshot.queryParams.user);


    this.type = this.detail.type;
    this.id = this.detail.id;
    // this.getPermissionList();
    this.subscribeList();

    this.reset();
  }

  subscribeList() {
    const params: any = {};
    params.count = 0;
    // params.limit=this.limit;
    params.offset = this.offset;
    this.sandbox.getPermissionlist(params)
    this.subscriptions.push(this.sandbox.getPermissionsList$.subscribe(val => {
      if (val) {
        this.permissionList = val
        this.permissionFullList();
      }
    }));
  }



  permissionFullList() {
    const params: any = {};
    params.refType = this.type === 'user' ? 2 : 1;
    params.refId = this.id;

    this.sandbox.getPermission(params)
    this.subscriptions.push(this.sandbox.getPermissionsList$.subscribe(val => {
      this.changeDetect.detectChanges();
      const permissionArray = Object.keys(val).map(key => ({ type: key, value: val[key] }));
      permissionArray.forEach(data => {
        if (data.value === true) {
          this.changeDetect.detectChanges();
          this.selectedPermissionArray.push(data.type);
        }
      });
      if (val) {
        this.permissionList.forEach(element => {
          element.permissionModule?.forEach(child => {

            if (this.selectedPermissionArray.includes(child.slugName)) {
              this.changeDetect.detectChanges();
              child.selected = true;
            } else {
              child.selected = false;
              this.changeDetect.detectChanges();
            }
            this.changeDetect.detectChanges();
          });
        });
      }
    }))
  }

  ngAfterContentChecked() {

    this.permissionList?.forEach(moduleGroup => {
      moduleGroup.permissionModule.forEach(module => {
        const filteredModules = moduleGroup.permissionModule.filter(module => module.isList === false);
        const hasSelectedFalse = filteredModules.some(module => module.selected === true);
        if (module.isList == true) {
          module.disabled = hasSelectedFalse
        }
      });
    });
  }

  result(val?) {
    if (val == 'selectAllData') {
      this.reset(this.selectAllData);
    }
    const allChildrenSelected: boolean[] = this.permissionList.map((data) => {
      const childrenSelected = data.permissionModule.every((child) => child.selected);
      this.changeDetect.detectChanges();

      // this.isSelected(this.permissionList);
      return childrenSelected;
    });
    this.selectAllData = allChildrenSelected.every((selected) => selected);

    this.changeDetect.detectChanges();
  }

  private reset(isChecked = false) {
    this.permissionList?.forEach(data => {
      data.permissionModule.forEach(val => val.selected = isChecked)
      this.changeDetect.detectChanges();
    })
    this.changeDetect.detectChanges();
  }




  isSelected(index, val, main, event) {
    // if (val.isListed == 'true' && val.selected) {

    //   return;
    // }

    // const isExistIndex = this.permissionList[index]?.permissionModule.findIndex(val => val.isListed == 'true');
    // const isChecked = this.permissionList[index]?.permissionModule.filter(val => val.isListed == 'false').some(val => val.selected);
    // if (isExistIndex >= 0) {
    //   this.permissionList[index].permissionModule[isExistIndex].selected = isChecked;
    // }
    // if (val.isListed == 'true' && !val.selected) {
    //   this.permissionList[index]?.permissionModule.forEach(val => val.selected = false);
    // }


    this.permissionList.forEach(element => {


      if (main.moduleGroupId == 59) {
        element.permissionModule.forEach(ele => {

          const filteredModules = element.permissionModule.filter(module => module.isList === false);
          const hasSelectedFalse = filteredModules.some(module => module.selected === true);

          if (ele.moduleId == 164) {
            ele.selected = true
          }
          if(ele.moduleId == 163){
            ele.selected = true
          }

          if (ele.moduleId == 171) {
            if (ele.isList == true) {
              ele.selected = event.target.checked
              ele.disabled = hasSelectedFalse
            }
           
          }

        });
      }else{
        if (element.moduleGroupId == main.moduleGroupId) {
          const filteredModules = element.permissionModule.filter(module => module.isList === false);
          const hasSelectedFalse = filteredModules.some(module => module.selected === true);
          element.permissionModule.forEach(list => {
  
  
            if (list.isList == true) {
              list.selected = true
              list.disabled = hasSelectedFalse
            }
            if (list.moduleId == val.moduleId) {
              list.selected = event.target.checked
            }
          });
        }
      }


    

  


    });



  }


  save() {

    this.permissionList.forEach(data => {
      if (data.permissionModule) {
        data.permissionModule.forEach(moduledata => {

          if (moduledata.selected == true) {
            this.permissionArray.push(moduledata.slugName);

          }
        });
      }
    });
    const params: any = {};

    params.refId = this.id;
    params.refType = this.type === 'user' ? 2 : 1;
    params.permission = JSON.stringify(this.permissionArray);
    this.sandbox.addPermission(params);
    this.subscriptions.push(this.sandbox.permissionAddLoaded$.subscribe(data => {
      if (data === true) {
        this.router.navigate(['/settings/access-and-permission']);
      }
    }));
  }









  selectAll(event) {
    this.sandbox.selectAllPermission(event);




    if (event == true) {
      this.permissionList.forEach(element => {
        element.permissionModule?.forEach(child => {
          if (child.isList == true) {
            child.disabled = true;
          }
          this.changeDetect.detectChanges();
        });
      });
    } else {
      this.permissionList.forEach(element => {
        element.permissionModule?.forEach(child => {
          if (child.isList == true) {
            child.disabled = false;
          }
          this.changeDetect.detectChanges();
        });
      });
    }

  }

  statusChange() {
    this.getStatus();
  }


  getStatus() {
    let isValid: any = true;

    this.permissionList?.forEach(data => {
      if (!isValid) {
        return;
      }
      isValid = data.permissionModule.every(item => item.selected === true);
    });
    this.selectAllPermission = isValid;
  }

  getPermissionList() {
    const params: any = {};
    params.count = 0;
    // params.limit=this.limit;
    params.offset = this.offset;
    this.sandbox.getPermissionlist(params);
  }

  getPermission() {
    const params: any = {};
    params.refType = this.type === 'user' ? 2 : 1;
    params.refId = this.id;
    this.sandbox.getPermission(params);
    this.subscriptions.push(this.sandbox.permissionLoaded$.subscribe(data => {

      if (data) {

        this.getStatus();
      }
    }));
  }



  cancel() {
    this.router.navigate(['/settings/access-and-permission']);
  }




  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
