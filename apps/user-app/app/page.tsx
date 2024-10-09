import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {PrismaClient} from "@repo/db/client";
const client = PrismaClient();
export default function Home() {
  return (
  <>
      <div className="text-2xl  text-red-500 underline">

Home
      </div>
    </>
  )

}
