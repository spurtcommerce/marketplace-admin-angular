/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-spurt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: UntypedFormGroup;
  public userName: UntypedFormControl;
  public password: UntypedFormControl;
  public emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public ifSubmitted = false;
  public badResponse = false;
  public subscriptions: Array<Subscription> = [];
  emailInvalidShow: boolean = false;
  keepMeSignIn: any;
  constructor(
    public fb: UntypedFormBuilder, 
    public authSandbox: AuthSandbox, 
    public layoutSandbox: LayoutSandbox, 
    private title: Title
  ) {
    this.title.setTitle('Admin Log In');
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [Validators.required, Validators.pattern(this.emailPattern)]
      ],
      password: ['', Validators.required]
    });
  }

  // Validation for forget password
  validateAllFormFields(formGroup: UntypedFormGroup) {

    this.focusouterrorShow()

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // Handle the focus out error check for email validation
  focusouterrorShow() {

    if (!['', null, undefined].includes(this.loginForm.value.userName) && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.loginForm.value.userName)) {
      this.emailInvalidShow = true
    } else {
      this.emailInvalidShow = false;
    }

   
  }

  // Handle changes to the username input field
  changeUSername() {
    this.emailInvalidShow = false;

    // Get the current username value
    let username = this.loginForm.get('userName').value;

    // Trim any trailing spaces after .com
    if (username) {
      this.loginForm.get('userName').setValue(username.replace(/\.com\s+$/, '.com'));
    }
  }

  // Handle form submission
  onSubmit(form: any) {
    this.ifSubmitted = true;
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }
    const param: any = {};
    param.userName = this.loginForm.value.userName;
    param.password = this.loginForm.value.password;
    this.authSandbox.authLogin(param);
    
    this.subscriptions.push(this.authSandbox.loginLoaded$.subscribe(data => {
      if (data === true) {
        localStorage.setItem('keepMeSignIn', this.keepMeSignIn ?? false);
        const user = JSON.parse(localStorage.getItem('adminUser')) ? JSON.parse(localStorage.getItem('adminUser')) : JSON.parse(sessionStorage.getItem('adminUser'));
        this.layoutSandbox.getUserDetail(user);
      } else {
        this.loginForm.reset();
        this.keepMeSignIn = '';
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
