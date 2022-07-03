import { PrismaClient } from '@prisma/client'
import { range } from 'lodash';
const prisma = new PrismaClient()

async function main() {

    range(1, 201).forEach(async index => {
        await prisma.flat.create({
            data: {
                title: `Flat number ${index}`,
                image_url: index % 2 == 0 ?
                    'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg' :
                    'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg',
            },
        });
    });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })