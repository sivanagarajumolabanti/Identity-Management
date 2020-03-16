const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const User = require('../models/user.model')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        // properties: {
        //   username: { isVisible: { list: false, filter: true, show: true, edit: false } },
        //   email: { isVisible: { list: true, filter: true, show: true, edit: false } },
        //   password: { isVisible: { list: false, filter: false, show: false, edit: false } },
        //   owner: { isVisible: { list: true, filter: true, show: true, edit: false } },
        //   usage_plan: { isVisible: { list: true, filter: true, show: true, edit: false } },
        //   API_Key: { isVisible: { list: true, filter: true, show: true, edit: true } },
        // }
      }
    }
  ],
  branding: {
    logo: 'URL_TO_YOUR_LOGO',
    companyName: 'Chromata',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  }

})

module.exports = adminRouter = AdminBroExpress.buildRouter(adminBro)