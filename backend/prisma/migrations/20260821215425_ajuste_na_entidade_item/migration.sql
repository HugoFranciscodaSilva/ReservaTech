-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Reservado', 'Disponivel');

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "reserved" "Status" NOT NULL DEFAULT 'Disponivel';
