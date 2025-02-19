//Common Table
export const Custom = [
    {
      displayName: "Document Title",
      id: "documentTitle",
      type: "default",
      checked: true,
    },
    {
      displayName: "Filename",
      id: "fileName",
      type: "default",
      checked: true,
    },
   {
      displayName: "Last Uploaded On",
      id: "modifiedDate",
      type: "date",
      checked: true,
    },
    {
        displayName: '',
        type: 'buttonGroup',
        checked: true,
        buttons: [
          {
            displayName: 'View',
            image: '',
             key: 'buttonGroup',
            customStyle: {
              tbody: {
                width: '50%',
                height: '3%',
                class: 'link-text'
              }
            }
          },
        ]
      },
       {
        displayName: 'Status',
        type: 'template',
        id:'ab',
        key:'checkBox',
        checked: true,
      },
  ];
  