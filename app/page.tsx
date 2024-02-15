import UpButton from "@/components/UpButton";
import type { FC } from "react";

const Home: FC = () => {
  return (
    <main className="flex flex-col gap-3 items-center justify-center p-24">
      <UpButton />
    </main>
  );
};

export default Home;
