import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
     <div
        className="fixed top-0 left-0 w-full h-[100vh] -z-10 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: "url('/banner.png')",
        }}
      />
  );
}
