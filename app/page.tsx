import { Button } from "@/components/ui/button";
import type { FC } from "react";

const Home: FC = () => {
  return (
    <main className="flex flex-col gap-3 items-center justify-center p-24">
      <h2 className="text-2xl font-bold">Hello World!</h2>
      <Button>Click</Button>
    </main>
  );
};

export default Home;
