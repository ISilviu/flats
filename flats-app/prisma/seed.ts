import { PrismaClient } from '@prisma/client'
import { range } from 'lodash';
const prisma = new PrismaClient()

async function main() {

    range(1, 201).forEach(async index => {
        await prisma.flat.create({
            data: {
                title: `Flat number ${index}`,
                image_url: index % 2 === 0 ?
                    'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg' :
                    'https://d18-a.sdn.cz/d_18/c_img_gZ_o/gJLEkw.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
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