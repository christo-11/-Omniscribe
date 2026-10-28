import Head from "next/head";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <>
      <Head><title>Omniscribe Studio</title></Head>
      <Dashboard />
    </>
  );
}
