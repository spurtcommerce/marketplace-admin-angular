export const Custom = [
    {
      displayName: "Request Categories",
      id: "levels",
      type: "default",
      checked: true,
    },
    // {
    //   displayName: 'Status',
    //   id: 'isActive',
    //   type: 'toggle',
    //   checked: true,
    // },
    {
      displayName: 'Approval Status',
      type: 'template',
      id: 'pennding',
      key: 'checkBox',
      checked: true,
    },
 
    {
        displayName: 'Action',
        type: 'threeDotMenu',
        checked: true,
        menuData: [
          {
            name:'Approve'
          },
          {
            name:'Reject'
          },
         
        ] 
      }
     
  ];


  export const filterFields = [
    {
      name: 'Category Name',
      validatiors: [],
      type: 'text',
    },
    
    // {
    //   name: 'Status',
    //   validatiors: [],
    //   type: 'select',
    //   customData: {
    //     data: [
    //       { name: 'Active', id: 1 },
    //       { name: 'Inactive', id: 0 },
    //     ],
    //     key: 'name',
    //     value: 'id',
    //   },
    // },
    
  
  ];




  export const pageSizeOptions = [
    { id: 2 },
    { id: 5 },
    { id: 10 },
    { id: 15 },
    { id: 20 },
  ];

  export function removeEmptyKeys(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          delete obj[key];
        }
      }
    }
    return obj;
  }