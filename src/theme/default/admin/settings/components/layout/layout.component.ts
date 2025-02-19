/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { settingsConfig } from '../../settings.constant';

@Component({
  selector: 'app-cms-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLayoutComponent implements OnInit {
  isClassVisible: boolean;
  settingPermissionConfig = settingsConfig;

  constructor(public titleService: Title) {
    this.isClassVisible = false;
  }

  ngOnInit() {
    this.titleService.setTitle('Settings | Store Settings');
  }
}
