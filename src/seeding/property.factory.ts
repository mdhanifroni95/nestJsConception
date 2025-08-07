import { faker } from "@faker-js/faker";
import { PropertyEntity } from "../entities/property.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFactory = setSeederFactory(PropertyEntity, () => {
    const property = new PropertyEntity();
    property.name = faker.location.state();
    property.description = faker.lorem.sentence();
    property.price = +faker.commerce.price({ min: 1000, max: 100000 });
    property.created_by = faker.number.int({ min: 1, max: 1000 });
    property.updated_by = faker.number.int({ min: 1, max: 1000 });
    return property;
})