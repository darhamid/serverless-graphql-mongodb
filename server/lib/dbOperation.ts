import { AppId } from "../apps/v1/models/appId";
import { DbConnect } from "./dbConnect";

const shortid = require("shortid"), 
COLLECTION_NAME = "appId";

export class DbOperation {
	public static saveAppId(postData: AppId, callback: any) {
		(postData._id = shortid.generate()),
		(postData.created_at = new Date().toUTCString()),
		(postData.updated_at = new Date().toUTCString());
		postData.created_by = "10"; // TODO: Need to change as current logged user id
		postData.updated_by = "10"; // TODO: Need to change as current logged user id

		DbConnect.dbConnect((error, db) => {
			if (!error) {
				let collection = db.collection(COLLECTION_NAME);
				collection.save(postData, (error, result) => {
				if (!error) {
					console.log("data save in db", JSON.stringify(result));
					db.close();
					callback(null, result);
				} else {
					callback(error, null);
				}
				});
			} else {
				callback(error, null);
			}
		});
	}
	/**
	 *
	 * @param appId
	 * @param callback
	 */
	public static findAppById(appId: string, callback: any) {
		DbConnect.dbConnect((error, db) => {
			if (!error) {
				let collection = db.collection(COLLECTION_NAME);
				collection.find({ _id: appId }).toArray((error, result) => {
				if (!error) {
					db.close();
					callback(null, result[0]);
				} else {
					callback(error, null);
				}
				});
			} else {
				callback(error, null);
			}
		});
	}
}
