export const settings = {
    // storeSettings
    storeSettings: ['edit-general-settings'],
    
    // Localization
       // Country
       country: ["list-country", "create-country", "edit-country", "delete-country"],
    
       // Zone
       zone: ["list-zone", "create-zone", "edit-zone", "delete-zone"],
    
       // Language
       language: ["list-language", "create-language", "edit-language", "delete-language"],
    
       // Currency
       currency: ["list-currency", "create-currency", "edit-currency", "delete-currency"],
       
       // Tax
       tax: ["list-tax", "create-tax", "edit-tax", "delete-tax"],
    
    // User and Role permissions
       user: ['create-user', 'edit-user', 'delete-user', 'list-user', 'edit-user-permission'],
       role: ['create-role', 'edit-role', 'delete-role', 'list-role', 'edit-role-permission'],
    
    //  System
        system:['audit-log'],
    
    //  Personalize
        product: ['edit-personalize-product'],
        order: ['edit-personalize-order'],
        emailTemplates: ['list-email-template', 'edit-email-template', 'delete-email-template'],
        socialMedia:['edit-social-url'],
    
    //  SEO
        seo: ['edit-seo-url'],
    
    //  Orderfulfilment status
        manageOrderStatus: ['list-order-status', 'create-order-status', 'edit-order-status', 'delete-order-status'],
    
     // add-ons
        addOns: ['edit-addons'],
        attribute: ['product-attribute-list', 'add-attribute', 'attribute-settings'],
        variant: ['variant-add', 'variant-product-list', 'variant-settings'],
       
    };

export const permissionConfigs={
    // Buyer
    'buyer': [ "edit-buyer","create-buyer","delete-buyer","list-buyer",'view-buyer'],
      //Cms   
     // pages
     'pages':["list-pages","edit-pages","delete-pages","create-pages","add-page-localization"],
    
     //pages-group 
     'pagesGroup':["page-group-list","page-group-delete","add-page-group","Edit-page-group"],

     //Promotion Widget
     'PromotionWidget' :["widget-list","widget-delete","edit-widget","add-widget"],

     //Question and Answer
     'questionAndAnswer':["product-question-list","delete-product-question","create-product-question","update-question-status","update-product-question",'product-answer-list','delete-product-answer','create-product-answer','update-product-answer','update-answer-status'],

     //Rating And Review
     'RatingAndReview':["list-rating-review","edit-rating-review"],

     //Banners
     'banners':["list-banners","edit-banners","delete-banners","create-banners"],

     //Seo 
     'products-seo':["product-seo"],

     //CategorySeo
     'CategorySeo':["category-seo"],

     //page seo
     'pageSeo':["pages-seo"],

     //blog seo
     'blogSeo':["blog-seo"],

     //sitemap
     'siteMap':["site-map-seo"],

     // posts and Category
     "postAndcategory":["list-blogs","create-blogs","edit-blogs","delete-blogs","add-blog-localization"],

    // seller group 
    "sellerGroup":["create-seller-group","update-seller-group","list-seller-group","delete-seller-group"],

    //seller 
    "seller":["list-vendor","export-vendor","export-all-vendor","edit-vendor","download-vendor-document","delete-vendor","create-vendor","view-vendor","set-vendor-commission"],

    // approved seller
    "kyc":["approve-vendor"],


    // Marketing 
    "marketing":["list-coupon","edit-coupon","delete-coupon","create-coupon"],

    //Related product 

    "relatedProduct":["list-related-product","update-related-product"],
    //  chat
    'chat': ['chat-list'],


//  Marketplace
    'manage-product':['list-market-place-product','approve-market-place-product'],
    'common-product':['common-catalog-product-list','set-common-products','common-product-detail','update-common-product-status'],
    'categories':['list-category','create-category','edit-category','delete-category','add-category-localization'],
    // 'data-export':['bulk-export-list','export-list'],
    'product-qr':['list-product-qr','manage-product-qr'],
    'order':['list-order','view-order','update-order-status'],
    'back-order':['back-order-list'],
    'failed-order':['failed-order-list','view-failed-order-detail','move-failed-order-to-main-order'],
    'payments':['list-payment','export-all-payment'],
    'abandoned-Cart':['list-abandoned-cart'],
    'live-cart':['list-live-cart'],
    'abondonedlive':['list-abandoned-cart','list-live-cart'],
    'settlement':['settlement order list','make-settlement'],
    'history':['history-settlement'],
    'reports':['sales-by-vendor-report','total-sales-report','settlement-report-list','sales-report-list'],
     // Settings
     'settings': Object.values(settings).reduce((acc, curr) => acc.concat(curr), []),
}




export const permission = {
    "Audit-log-bulk-export": true,
    "Edit-page-group": true,
    "add-attribute": true,
   "add-blog-localization": true,
    "add-customer-address": true,
   " add-delivery-location": true,
    "add-page-group": true,
    "add-page-group-localization": true,
    "add-page-localization": true,
    "add-widget": true,
    "add-widget-localization": true,
    "approval-pending-list": true,
    "approve-market-place-product": true,
    "approve-vendor": true,
    "approved-list": true,
    "archive-payment-list": true,
    "archive-payment-list-export-excel": true,
    "assign-category": true,
    "attribute-group-add": true,
    "attribute-group-delete": true,
    "attribute-list": true,
    "attribute-settings": true,
    "audit-log": true,
    "audit-log-single-excel": true,
    "back-order-list": true,
    "banner-export": true,
    "bulk-category-delete": true,
    "bulk-delete-buyer": true,
    "bulk-delete-seller": true,
    "bulk-export-admin-coupon-list": true,
    "bulk-export-list": true,
    "bulk-product-import-list": true,
    "chat-list": true,
    "common-catalog-product-list": true,
    "common-product-detail": true,
    "create-banners": true,
    "create-blogs": true,
    "create-buyer": true,
    "create-category": true,
    'add-category-localization': true,
    "create-country": true,
    "create-coupon": true,
    "create-currency": true,
    "create-customer": true,
    "create-customer-group": true,
    "create-language": true,
    "create-market-place-product": true,
    "create-order-status": true,
    "create-pages": true,
    "create-product": true,
    "create-product-answer": true,
    "create-product-question": true,
    "create-role": true,
    "create-seller": true,
    "create-seller-group": true,
    "create-tax": true,
    "create-user": true,
    "create-vendor": true,
    "create-zone": true,
    "customer-address-list": true,
    "delete-attribute": true,
    "delete-banners": true,
    "delete-blogs": true,
    "delete-buyer": true,
    "delete-category": true,
    "delete-country": true,
    "delete-coupon": true,
    "delete-currency": true,
    "delete-customer": true,
    "delete-customer-address": true,
    "delete-customer-group": true,
    "delete-email-template": true,
    "delete-failed-order": true,
    "delete-language": true,
    "delete-market-place-product": true,
    "delete-order": true,
    "delete-order-status": true,
    "delete-pages": true,
    "delete-product": true,
    "delete-product-answer": true,
    "delete-product-question": true,
    "delete-product-variant": true,
    "delete-role": true,
    "delete-seller": true,
    "delete-seller-group": true,
    "delete-tax": true,
    "delete-user": true,
    "delete-vendor": true,
    "delete-zone": true,
    "delivery-location-delete": true,
    "delivery-location-list": true,
    "download-vendor-document": true,
    "edit-attribute": true,
    "edit-banners": true,
    "edit-blogs": true,
    "edit-category": true,
    "edit-country": true,
    "edit-coupon": true,
    "edit-currency": true,
    "edit-customer": true,
    "edit-customer-group": true,
    "edit-email-template": true,
    "edit-general-settings": true,
    "edit-language": true,
    "edit-market-place-product": true,
    "edit-order-status": true,
    "edit-pages": true,
    "edit-personalize-order": true,
    "edit-personalize-product": true,
    "edit-product": true,
    "edit-rating-review": true,
    "edit-role": true,
    "edit-role-permission": true,
    "edit-seo-url": true,
    "edit-social-url": true,
    "edit-tax": true,
    "edit-user": true,
    "edit-user-permission": true,
    "edit-vendor": true,
    "edit-widget": true,
    "edit-zone": true,
    "export-abandoned-cart-details": true,
    "export-all-customer": true,
    "export-all-market-place-product": true,
    "export-all-payment": true,
    "export-all-sales-payments": true,
    "export-all-vendor": true,
    "export-buyer": true,
    "export-category": true,
    "export-customer": true,
    "export-data": true,
    "export-list": true,
    "export-live-cart-details": true,
    "export-market-place-product": true,
    "export-order": true,
    "export-product": true,
    "export-seller": true,
    "export-vendor": true,
    "failed-order-list": true,
    "failed-order-list-export-excel": true,
    "history-settlement": true,
    "import-product": true,
    "inventory-export-list": true,
    "inventory-list": true,
    "inventory-product-list": true,
    "list-abandoned-cart": true,
    "list-approved-products": true,
    "list-banners": true,
    "list-blogs": true,
    "list-buyer": true,
    "list-category": true,
    "list-common-products": true,
    "list-country": true,
    "list-coupon": true,
    "list-currency": true,
    "list-customer": true,
    "list-customer-group": true,
    "list-email-template": true,
    "list-language": true,
    "list-live-cart": true,
    "list-market-place-product": true,
    "list-order": true,
    "list-order-status": true,
    "list-pages": true,
    "list-payment": true,
    "list-product": true,
    "list-product-qr": true,
    "list-rating-review": true,
    "list-rejected-products": true,
    "list-related-product": true,
    "list-role": true,
    "list-sales": true,
    "list-sales-payments": true,
    "list-sales-report": true,
    "list-seller": true,
    "list-seller-group": true,
    "list-seller-signup-request": true,
    "list-stock-status": true,
    "list-tax": true,
    "list-user": true,
    "list-vendor": true,
    "list-waiting-for-approval": true,
    "list-zone": true,
    "make-feature": true,
    "make-settlement": true,
    "settlement order list": true,
    "make-today-deal": true,
    "manage-product-qr": true,
    "move-failed-order-to-main-order": true,
    "page-group-delete": true,
    "page-group-list": true,
    "product-answer-list": true,
    "product-attribute-list": true,
    "product-question-list": true,
    "product-quotation-detail": true,
    "product-quotation-list": true,
    "product-variant-detail": true,
    "product-variant-inventory-list": true,
    "product-variant-update": true,
    "rejected-list": true,
    "related-product-detail": true,
    "sales-by-vendor-report": true,
    "sales-report-export": true,
    "sales-report-list": true,
    "set-commision-seller": true,
    "set-commission": true,
    "set-common-product": true,
    "set-common-products": true,
    "set-vendor-commission": true,
    "settlement-order-list": true,
    "settlement-report-list": true,
    "stock-update": true,
    "total-sales-report": true,
    "update-answer-status": true,
    "update-buyer": true,
    "update-common-product-status": true,
    "update-customer-address": true,
    "update-delivery-location": true,
    "update-inventory-status": true,
    "update-order-status": true,
    "update-product-answer": true,
    "update-product-attribute": true,
    "update-product-question": true,
    "update-question-status": true,
    "update-quotation-status": true,
    "update-related-product": true,
    "update-seller": true,
    "update-seller-group": true,
    "update-stock-status": true,
    "variant-add": true,
    "variant-detail": true,
    "variant-edit": true,
    "variant-product-list": true,
    "variant-settings": true,
    "varient-delete": true,
    "vendor-document-list": true,
    "verify-vendor-document": true,
    "view-customer": true,
    "view-failed-order-detail": true,
    "view-order": true,
    "view-product": true,
    "view-stock-status": true,
    "view-vendor": true,
    "widget-delete": true,
    "widget-list": true,
    "settlement-report":true,
    "buyer-address-list":true,
    "update-buyer-address":true,
    "add-buyer-address":true,
    "delete-buyer-address":true,
    "edit-buyer":true,
    "view-buyer":true,
    "category-seo":true,
    "product-seo":true,
    "pages-seo":true,
    "blog-seo":true,
    "site-map-seo":true
}

export const apiResponse = apiResp();



export function apiResp() {

    const val = JSON.parse(sessionStorage.getItem('permissions')) ?? {};
    if(Object.keys(val).length>0){
        return val;
    }else{
       
        return permission;
    }
     
}


export function combineArrays(...arrays: any[]): any[] {
    return [].concat(...arrays);
   }
   
   export function hasTrueValue(multipleHideUnAuthorized) {
    let data = apiResp();
       return multipleHideUnAuthorized?.some(key => data[key] === true)
   };



