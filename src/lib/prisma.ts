import { PrismaClient } from "@prisma/client";

// This file is used to create a Prisma client instance that can be reused across the application.
// This is important for performance reasons, as creating a new Prisma client instance for each request can be slow and resource-intensive.

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

// vou usar para chamar meu banco de dados
export const db = prisma;
