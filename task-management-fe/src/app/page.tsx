import { redirect } from "next/navigation";
import Image from "next/image";

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (!args[0].includes('[antd: compatible]')) {
    originalConsoleWarn(...args);
  }
};

export default function Home() {
  redirect('/dashboard');
}
