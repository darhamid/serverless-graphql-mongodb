
import { CreateAppId } from '../../apps/v1/appCreate';
import { RouteHandler } from '../../lib/routehandler';

let async = require('async');


// appRoutes API Routes
class appRoutes extends RouteHandler {


    // Route handler called by Lambda
    public static handler = (event: any, context: any, callback: any) => {
        async.waterfall([

            (callback: any) => {
                appRoutes.normalize(event, context, callback);                                    
            },

            (event: any, callback: any) => {
                // Routing
                switch (event.httpMethod) {
                    case "POST":
                        switch (event.path) {
                            case "/v1/appid":                                               
                                CreateAppId.createAppId(event, callback);
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
                appRoutes.lambdaCallback(error, response, callback);                                   // Handle response back to Lambda
            });
    }
}


module.exports.handler = appRoutes.handler;