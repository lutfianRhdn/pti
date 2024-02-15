/*
  Warnings:

  - You are about to drop the column `event_id` on the `LikeOnEvent` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `LikeOnEvent` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `LikeOnEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LikeOnEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LikeOnEvent` DROP FOREIGN KEY `LikeOnEvent_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `LikeOnEvent` DROP FOREIGN KEY `LikeOnEvent_user_id_fkey`;

-- AlterTable
ALTER TABLE `LikeOnEvent` DROP COLUMN `event_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `LikeOnEvent` ADD CONSTRAINT `LikeOnEvent_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeOnEvent` ADD CONSTRAINT `LikeOnEvent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
