import Head from "next/head";
import Image from "next/image";
import { Logo, DarkModeToggle } from "../components";
import { useCardStore } from "../stores/CardStore";
import styles from "../styles/Home.module.css";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
export default function Home() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-primaryLightest dark:bg-DarkPrimary ">
      <Logo className=" w-48 h-48" />

      <div className=" absolute top-10 right-10">
        <DarkModeToggle />
      </div>
      <Link
        href="/dashboard"
        className=" absolute w-full h-1/4 flex items-end justify-center pb-5 bottom-0 hover:cursor-pointer group"
      >
        <BsChevronDown className=" text-4xl text-primaryDarker group-hover:text-primary" />
      </Link>
    </div>
  );
}
