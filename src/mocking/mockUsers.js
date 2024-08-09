import { faker } from "@faker-js/faker"

const users = []

const createRandomUsers = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: faker.internet.password({ length: 20, memorable: true }),
        age: faker.helpers.rangeToNumber({ min: 18, max: 90 }),
        email: faker.internet.email(),
        avatar: faker.image.avatarGitHub(),
        role: "user",
        cart_id: faker.string.uuid(),
        documents:faker.helpers.arrayElements(['cat', 'dog', 'mouse']),
        last_connection: faker.date.recent()
    }
}

for (let i = 0; i < 100; i++) {
    users.push(createRandomUsers())
}

console.log(users)

// first_name: ,
// last_name: ,
// password: ,
// age: ,
// email: ,
// role: ,
// cart_id:,
// documents:,
// last_connection: