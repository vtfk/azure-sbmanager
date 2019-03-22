require('dotenv').config()
const auth = require('../lib/authenticate')
const armServiceBus = require("@azure/arm-servicebus")
const armResources = require('@azure/arm-resources');


(async () => {

  const authRes = await auth()
  const creds = authRes.credentials
  const subscriptionId = authRes.subscriptions[0].id

  const resource = new armResources.ResourceManagementClient(creds, subscriptionId)
  const resourceGroups = await resource.resourceGroups.list()
  const resources = await resource.resources.list()

  console.log(
    resources.filter(resource => resource.type === 'Microsoft.ServiceBus/namespaces')
    .map(res => res.name)
  )
  
    

  const client = new armServiceBus.ServiceBusManagementClient(creds, subscriptionId);
  const queues = await client.queues.listByNamespace('tfkdevtest', 'tfkdevtest')

  

  console.log(queues.map(queue => queue.name))
})().catch(err => {
  console.error(err)
})

