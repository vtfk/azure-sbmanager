let getServicebusses = require('../lib/get-servicebusses')
let getSBMessages = require('../lib/get-sb-messages')

module.exports = async function (context, req) {
    context.log('Getting servicebus queues.');

    if (req.body && req.body.authToken) {
        /*
        let serviceBusses = await getServicebusses()
        let serviceBusMessages = await getSBMessages(servicebusses)
        context.res = {
            status: 200,
            body: service
        };
        */
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};