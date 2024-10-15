"use client";

import { Button } from "@repo/ui/button";
import { useBalance } from "@repo/store/useBalance"
import { Appbar } from "@repo/ui/appbar";

let user1 = {
  name: "sidd"
}

export default function Home() {
  const balance = useBalance()
  return (
    <>
      <Appbar user={user1} onSignin={console.log("SIngin")} onSignout={console.log("sinout")} />
      <p>{balance}</p>
      <Button onClick={() => console.log("button clicked")} > Comp Button</Button>
      <div className="text-2xl  text-red-500 underline">

        Home
      </div>
    </>
  )

}
