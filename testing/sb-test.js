require('dotenv').config()
const msRest = require("@azure/ms-rest-js")
const msRestAzure = require("@azure/ms-rest-azure-js")
const msRestNodeAuth = require("@azure/ms-rest-nodeauth")
const armServiceBus = require("@azure/arm-servicebus")
const armSubscriptions = require('@azure/arm-subscriptions');
//const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];


(async () => {

  const creds = await msRestNodeAuth.interactiveLogin()

  const subs = new armSubscriptions.SubscriptionClient(creds)
  let subscriptionId = await subs.subscriptions.list()
  subscriptionId = subscriptionId[0].subscriptionId

  const client = new armServiceBus.ServiceBusManagementClient(creds, subscriptionId);
  const queues = await client.queues.listByNamespace('tfkdevtest', 'tfkdevtest')

  console.log(queues)
})().catch(err => {
  console.error(err)
})

