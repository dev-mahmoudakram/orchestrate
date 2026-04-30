-- AlterTable
ALTER TABLE `page` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `partner` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sector` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `teammember` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Page_deletedAt_idx` ON `Page`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Partner_deletedAt_idx` ON `Partner`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Project_deletedAt_idx` ON `Project`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Sector_deletedAt_idx` ON `Sector`(`deletedAt`);

-- CreateIndex
CREATE INDEX `Service_deletedAt_idx` ON `Service`(`deletedAt`);

-- CreateIndex
CREATE INDEX `TeamMember_deletedAt_idx` ON `TeamMember`(`deletedAt`);
