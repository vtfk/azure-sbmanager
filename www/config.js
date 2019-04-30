require('dotenv').config()

module.exports = {
  adal: {
    // 'common' (multi-tenant gateway) or Azure AD Tenant ID
    tenant: process.env.VUE_APP_TENANT_ID || 'common',

    // Application ID
    clientId: process.env.VUE_APP_CLIENT_ID,

    // Host URI
    redirectUri: process.env.VUE_APP_REDIRECT_URL,

    // Cache Location
    cacheLocation: 'localStorage'
  },
  // Students API base URL
  dataApiUrl: process.env.BACKEND_API_URL,
  theme: {
    primary: process.env.COLOR_PRIMARY || '#000000',
    secondary: process.env.COLOR_SECONDARY || '#ffd520',
    accent: process.env.COLOR_ACCENT || '#6ac4ae',
    error: process.env.COLOR_ERROR || '#e30438',
    info: process.env.COLOR_INFO || '#00b1c7',
    success: process.env.COLOR_SUCCESS || '#4CAF50',
    warning: process.env.COLOR_WARNING || '#FFC107'
  }
}
