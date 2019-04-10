let cookie = require("cookie"),
	_ = require("lodash"),
	qs = require("querystring"),
	changeCase = require("change-case"),
	YAML = require("yamljs");

export class RouteHandler {
	private static event: any;

	protected static normalize = (event: any, context: any, callback: any) => {
		RouteHandler.event = event;
		context.callbackWaitsForEmptyEventLoop = false;
		if (!event.isOffline) {
			let newHeaders: any = {};
			_.forOwn(event.headers, (value: string, key: string) => {
				newHeaders[changeCase.headerCase(key)] = value;
			});
			event.headers = newHeaders;
		}
		if (event.headers["Content-Type"] && event.body) {
		let {
			headers: { "Content-Type": contentType }
		} = event;

		if (_.includes(contentType, "application/json")) {
			event.body = RouteHandler.safeParse(event.body);
		} else if (_.includes(contentType, "application/graphql")) {
			event.body = RouteHandler.safeParse(event.body);
		} else if (_.includes(contentType, "application/x-www-form-urlencoded")) {
			event.body = qs.parse(event.body);
		} else {
			console.error(
			"!![ROUTEHANDLER] Unknown Content-Type [%s]",
			contentType
			);
			event.body = RouteHandler.safeParse(event.body); // If Content-Type is unhandled, default to Json
		}
		}
		event.path = event.resource; // Rename attributes
		delete event.resource;
		event.params = event.pathParameters;
		delete event.pathParameters;
		event.query = event.queryStringParameters;
		delete event.queryStringParameters;
		if (event.headers.Cookie)
		event.headers.Cookie = cookie.parse(event.headers.Cookie);
		event.headers["User-Agent"] =
		event.headers["User-Agent"] ||
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36";

		callback(undefined, event);
  	};

  protected static lambdaCallback(error: any, response: any, callback: any) {
		let resp: any = {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Strict-Transport-Security": "max-age=31536000" // HTTP Strict Transport Security
			}
		};

		if (error) {
			console.error("[ERROR]", error.statusCode, error.message);
			resp["statusCode"] = error.statusCode;
			resp["body"] = JSON.stringify({ error: error });
		} else {
			if (
				_.isString(response.body) &&
				response.headers &&
				response.statusCode
			) {
				resp["statusCode"] = response.statusCode;
				resp["body"] = response.body;
				resp.headers = _.merge({}, resp.headers, response.headers);
			} else {
				resp["statusCode"] = 200;
				resp["body"] = JSON.stringify(response);
			}
		}
		callback(undefined, resp);
  }

  // Serverless Offline - load environmental variables
  public static loadEnvVariables = (path: string) => {
		_.forOwn(YAML.load(path), (envValue: any, envName: string) => {
			process.env[envName] = envValue;
		});
		console.log(
			"Serverless Offline - Loaded Environmental Variables from",
			path
		);
  };

  // Safe parse a string into a JSON object
  private static safeParse = (json: string): Object => {
		try {
			return JSON.parse(json);
		} catch (ex) {
			console.error("!![ROUTEHANDLER] Caught invalid JSON body: [%s]", json);
			return {};
		}
  	};
}
