import { faker } from "@faker-js/faker";
import { PropertyFeatureEntity } from "../entities/propertyFeature.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFeatureFactory = setSeederFactory(PropertyFeatureEntity, () => {
    const propertyFeature = new PropertyFeatureEntity();
    propertyFeature.area = faker.number.int({ min: 50, max: 500 });
    propertyFeature.bathrooms = faker.number.int({ min: 1, max: 5 });
    propertyFeature.parkingSpots = faker.number.int({ min: 0, max: 3 });
    propertyFeature.hasSwimmingPool = faker.datatype.boolean();
    propertyFeature.hasGardenYard = faker.datatype.boolean();
    propertyFeature.hasGarage = faker.datatype.boolean();
    propertyFeature.hasParking = faker.datatype.boolean();
    propertyFeature.hasPool = faker.datatype.boolean();
    return propertyFeature;
})