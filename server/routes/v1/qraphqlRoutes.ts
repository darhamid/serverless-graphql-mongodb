

import { graphqlAppId } from '../../apps/v1/graphqlAppId';
import { RouteHandler } from '../../lib/routehandler';

let async = require('async');

// qraphqlRoutes API Routes
class qraphqlRoutes extends RouteHandler {


    // Route handler called by Lambda
    public static handler = (event: any, context: any, callback: any) => {
        async.waterfall([

            (callback: any) => {
                qraphqlRoutes.normalize(event, context, callback);                                     // Normalize Lambda event object
            },
            (event: any, callback: any) => {
                // Routing
                switch (event.httpMethod) {
                    // for graph appId details
                    case "POST":
                        switch (event.path) {
                            case "/v1/graphql":
                                graphqlAppId.getAppId(event, callback);
                                break;
                            default:
                                callback({message:'Unknown method [%s]',statusCode:'501'});
                        }
                        break;
                    default:
                        callback({message:'Unknown method [%s]',statusCode:'501'});
                }
        }],
        (error: any, response: Object) => {
            qraphqlRoutes.lambdaCallback(error, response, callback);                                   // Handle response back to Lambda
        });
    }
}

module.exports.handler = qraphqlRoutes.handler;