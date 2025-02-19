import { settings } from "../shared/components/services/permission.constant";

export const settingsConfig =  {
    storeSetting: [...settings.storeSettings],
    localization: [...settings.country,...settings.zone,...settings.language,...settings.currency,...settings.tax],
    accessPermission: [...settings.user,...settings.role],
    personalize: [...settings.order,...settings.product,...settings.emailTemplates,...settings.socialMedia],
    seo: [...settings.seo],
    orderfulfilment: [...settings.manageOrderStatus],
    system: [...settings.system],
    addOns: [...settings.addOns,...settings.attribute,...settings.variant]
  }