const auth = require('../lib/authenticate')
const getResources = require('../lib/get-resources')
const createConnString = require('../lib/get-or-create-conn-string')

;(async () => {
  try {
    const {credentials, subscriptions} = await auth()
    
    const subId = subscriptions[0].id
    const resources = await getResources(credentials)
    /*
    let resourceGroups = await resources.getResourcegroups(subId)
    let namespaces = await resources.getNamespaces(subId)
    let queues = await resources.getQueues(subId, namespaces)

    let allResources = {
      resourceGroups: resourceGroups,
      namespaces: namespaces,
      queues: queues
    }
    console.log(allResources)
    console.log('################')
    */
    const mySubId = '/subscriptions/2662324a-9871-4dfc-b301-a5836afb44d1/resourceGroups/tfkdevtest/providers/Microsoft.ServiceBus/namespaces/tfkdevtest/queues/sherexdevqueue'

    let connstring = await createConnString(credentials, subId, mySubId)

    console.log(connstring)

  } catch (error) {
    console.error(error)
  }
})()
