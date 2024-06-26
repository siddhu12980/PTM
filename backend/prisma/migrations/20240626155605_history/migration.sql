/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sender_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `time_stamp` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_sender_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "receiver_id",
DROP COLUMN "sender_id",
DROP COLUMN "time_stamp",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL,
ADD COLUMN     "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
