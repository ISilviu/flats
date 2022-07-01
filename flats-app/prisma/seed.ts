import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    [
        {
            title: 'The best apartment in Prague',
            image_url: 'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg',
        },
        {
            title: 'Best flats in Plsen!',
            image_url: 'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg'
        }
    ].forEach(async flat => await prisma.flat.create({ data: flat }));
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })