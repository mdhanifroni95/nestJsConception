import { faker } from "@faker-js/faker";
import { PropertyEntity } from "../entities/property.entity";
import { PropertyFeatureEntity } from "../entities/propertyFeature.entity";
import { PropertyTypeEntity } from "../entities/propertyType.entity";
import { UserEntity } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const typeRepo = dataSource.getRepository(PropertyTypeEntity)

    console.log("Seeding property types...");
    const propertyType = await typeRepo.save([{ value: "Condo" }, { value: "Apartment" }])

    const userFactory = factoryManager.get(UserEntity)

    console.log("Seeding users...");
    const users = await userFactory.saveMany(10)

    const propertyFactory = factoryManager.get(PropertyEntity);
    const propertyFeatureFactory = factoryManager.get(PropertyFeatureEntity);

    console.log("Seeding properties...");
    const properties = await Promise.all(
      Array(50).fill("").map(async () => {
        const property = await propertyFactory.make({
          user: faker.helpers.arrayElement(users),
          type: faker.helpers.arrayElement(propertyType),
          propertyFeatures: await propertyFeatureFactory.save()
        })
        return property;
      })
    );
    const propertyRepo = dataSource.getRepository(PropertyEntity)
    await propertyRepo.save(properties);
  }
}