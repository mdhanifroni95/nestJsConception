
import { faker } from "@faker-js/faker";
import { UserEntity } from "../entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const UserFactory = setSeederFactory(UserEntity, () => {
    const user = new UserEntity();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.avatarUrl = faker.image.avatar();
    user.createdBy = faker.number.int({ min: 1, max: 1000 });
    user.updatedBy = faker.number.int({ min: 1, max: 1000 });
    return user;
})