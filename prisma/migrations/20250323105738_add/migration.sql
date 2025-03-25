/*
  Warnings:

  - You are about to drop the column `name` on the `Record` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `style` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "name",
ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "released" TEXT NOT NULL,
ADD COLUMN     "style" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
