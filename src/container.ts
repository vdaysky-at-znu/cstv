import * as awilix from "awilix";
import { InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import mysql2 from 'mysql2';
import services, { IServicesContainer } from "@/services";
import models, { IModelContainer, IModelType } from "@/database/models";

export interface IContextContainer extends IModelContainer, IServicesContainer {
    db: Sequelize;
}

const container = awilix.createContainer<IContextContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
});

const createDB = () => {
    return new Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD || "", {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        dialectModule: mysql2
    });
}

container.register({
    ...services,
    ...models,
    db: awilix.asFunction(createDB).singleton(),
})

export default container;

//#region model relationship resolution
const resolvedModels: IModelType<unknown>[] = [];

for (const modelName in models) {
    const model: IModelType<unknown> = container.resolve(modelName);
    resolvedModels.push(model);

}

for (const resoledModel of resolvedModels) {
    if (typeof resoledModel.initRels != "function") {
        throw new Error("Model " + resoledModel.name + " does not have initRels method")
    }
    resoledModel.initRels();
}
//#endregion

export function getService<T extends {new(opts: IContextContainer): InstanceType<T>}>(serviceType: T): InstanceType<T> {
    return container.resolve(serviceType.name);
}

