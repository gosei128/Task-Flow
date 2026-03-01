import { auth } from "@/middleware/auth";

const Header = async () => {
  const session = await auth();
  return (
    <header className="bg-white shadow-sm text-black rounded-lg p-4">
      <h1 className="text-2xl font-bold">
        {session && session.user
          ? `Hello, ${session.user.name}!`
          : "Hello, Guest!"}
      </h1>
      <p>
        <small className="text-gray-400">What do you want to do today?</small>
      </p>
    </header>
  );
};

export default Header;
