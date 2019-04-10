/**
 * Import npm module
 */
import { DbOperation } from "./../../lib/dbOperation";
interface IAppId {
    _id: string;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
}

/**
 * Description :
 */
class AppIdInfo {
  static getAppId(appId: string): Promise<IAppId> {
		return new Promise<IAppId>((resolve, reject) => {
			DbOperation.findAppById(appId, (error: any, data: IAppId) => {
				if (!error) {
					resolve(data);
				} else {
					reject(error);
				}
			});
		});
  	}
}

/**
 * Description :
 */
const resolvers = {
  Query: {
		appId: (obj: any, args: any, context: any) => {
		console.log("resolvers: ", args);
		return new Promise<any>((resolve, reject) => {
			AppIdInfo.getAppId(args._id)
				.then((appId: IAppId) => {
					resolve(appId);
				})
				.catch((error: any) => {
					reject(error);
				});
			});
		}
  	}
};

export { resolvers };
