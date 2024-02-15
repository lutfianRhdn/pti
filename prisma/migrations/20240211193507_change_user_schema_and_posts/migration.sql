/*
  Warnings:

  - You are about to drop the column `author_id` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_author_id_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `author_id`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `image_banner` VARCHAR(191) NOT NULL DEFAULT 'https://apod.nasa.gov/apod/image/2402/sts98plume_nasa_1111.jpg',
    ADD COLUMN `image_profile` VARCHAR(191) NOT NULL DEFAULT 'https://ui-avatars.com/api/?background=random';
