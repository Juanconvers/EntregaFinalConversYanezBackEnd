import { faker } from "@faker-js/faker"

const products = []

const createRandomProducts = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        category:faker.helpers.arrayElement(['Local', 'Imported', 'Handcrafted', 'Industrial Design']),
        status: faker.datatype.boolean(0.9),
        stock: faker.helpers.rangeToNumber({ min: 0, max: 250 }),
        code: faker.string.alphanumeric(6),
        price: faker.commerce.price(),
        thumbnail: faker.image.url() 
    }
}

for (let i = 0; i < 100; i++) {
    products.push(createRandomProducts())
}

console.log(products)

