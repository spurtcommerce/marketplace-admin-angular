/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class BucketdeletefileForm {
  public fileName: string;

  constructor(bucketdeletefileForm: any) {
    this.fileName = bucketdeletefileForm.fileName || '';
  }
}
