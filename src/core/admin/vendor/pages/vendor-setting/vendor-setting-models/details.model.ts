/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2025  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class DetailRequest {


   public vendorId: number;


    constructor(detailRequest: any) {
        this.vendorId = detailRequest.id || '';
    }
}
