/**
 * Import modules
 */

import { AppId } from "./models/appId";
import { DbOperation } from "./../../lib/dbOperation";
const _ = require("lodash"),
  async = require("async");

/**
 * Declare Interface for AppId model
 */
interface IAppId {
	_id: string;
	email: string;
	name: string;
	created_at:string;
	updated_at:string;
	created_by:string;
	updated_by:string;
}

export class CreateAppId {
	//save AppId in data source
	public static createAppId = (event: any, callback: any) => {
		if (!_.get(event, "body.appId"))
		return callback({ message: "Missing appId object", statusCode: "400" });
		const appIdBody: IAppId = event.body.appId;
		// apply validation
		let error: any = AppId.validateAppId(appIdBody);
		if (!error) {
		DbOperation.saveAppId(appIdBody, (error, response) => {
			callback(error, response);
		});
		} else {
		callback(error);
		}
	};
}
