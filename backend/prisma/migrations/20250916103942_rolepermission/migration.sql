/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Made the column `menu_id` on table `toppings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `toppings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."toppings" DROP CONSTRAINT "toppings_menu_id_fkey";

-- AlterTable
ALTER TABLE "public"."toppings" ALTER COLUMN "menu_id" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "role",
ADD COLUMN     "role_id" INTEGER;

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."toppings" ADD CONSTRAINT "toppings_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
