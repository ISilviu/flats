import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.flat.upsert({
        where: {},
        update: {},
        create: {
            title: 'The best apartment in Prague',
            image_url: 'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg',
        },
    });

    await prisma.flat.upsert({
        where: {},
        update: {},
        create: {
            title: 'Best flats in Plsen!',
            image_url: 'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg'
        },
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