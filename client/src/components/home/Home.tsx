import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
export default function Home() {
  const user = useSelector((state: RootState) => state.pushUsers.value);
  return <div className="bg-[red]"></div>;
}
