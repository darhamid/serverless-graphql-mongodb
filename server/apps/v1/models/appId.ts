/**
 * Import modules
 */
const Joi = require('joi');

/**
 * Description : This is appId model 
 */

export class AppId {

    constructor(public email: string,
        public name?: string,
        public _id?: string,
        public created_at?:string,
        public updated_at?:string,
        public created_by?:string,
        public updated_by?:string

        ) {
    }
    /**
     * @param appId 
     * @return any
     */
    public static validateAppId(appId: AppId): any {

        const schema = Joi.object().keys({
            name: Joi.string().trim(),
            email: Joi.string().email().required()
        });
        const { error, value } = Joi.validate({ name: appId.name, email: appId.email }, schema);
        return error;
    }
}


