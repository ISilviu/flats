import { PrismaClient } from "@prisma/client";

export async function getFlats() {
    const prisma = new PrismaClient();
    return prisma.flat.findMany();
}