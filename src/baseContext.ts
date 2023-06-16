import { Sequelize } from "sequelize";
import { IUserType } from "./database/models/user";
import { IModelContainer } from "./database/models";

export interface IContextContainer extends IModelContainer {
    db: Sequelize,
}

export default class BaseContext {
    protected di: IContextContainer;

    constructor(opts: IContextContainer) {
        this.di = opts;
    }
}
