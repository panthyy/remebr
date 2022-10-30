import { prisma, PrismaClient } from "@prisma/client";

export default function (req, res) {
  res.status(200).json({ name: "Example" });
}
