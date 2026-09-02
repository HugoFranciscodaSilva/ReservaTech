/*
  Warnings:

  - Added the required column `icon` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "icon" TEXT NOT NULL;
