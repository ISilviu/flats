import { PrismaClient } from "@prisma/client";

type FlatsPaginationOptions = {
    pageNumber: number;
    pageSize: number;
};

const prisma = new PrismaClient();

export async function getFlats({ pageSize, pageNumber }: FlatsPaginationOptions) {
    let databasePageNumber = pageNumber - 1;
    if (databasePageNumber < 0) {
        databasePageNumber = 0;
    }

    return prisma.flat.findMany({
        skip: pageSize * databasePageNumber,
        take: pageSize,
        orderBy: {
            id: 'asc',
        },
    });
}

export async function getFlatsCount() {
    return prisma.flat.count();
}