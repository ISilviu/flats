import { PrismaClient } from "@prisma/client";

type FlatsPaginationOptions = {
    pageNumber: number;
    pageSize: number;
};

const prisma = new PrismaClient();

export async function getFlats({ pageSize, pageNumber }: FlatsPaginationOptions) {
    return prisma.flat.findMany({
        skip: pageSize * pageNumber,
        take: pageSize,
        orderBy: {
            id: 'asc',
        },
    });
}

export async function getFlatsCount() {
    return prisma.flat.count();
}