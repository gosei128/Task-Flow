"use client";
import { useState } from "react";
const Mainmenu = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <main className="py-2">
      <ul>
        <li className="text-sm font-semibold border px-2 py-1 rounded-md">
          Task
        </li>
      </ul>
    </main>
  );
};
export default Mainmenu;
