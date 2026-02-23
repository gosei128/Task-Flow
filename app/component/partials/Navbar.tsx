import { auth, signIn, signOut } from "@/middleware/auth";
import { Github } from "griddy-icons";
import SidebarGroup from "../SidebarGroup";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
const Navbar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-3xl font-bold text-dark-blue-600">TaskFlow</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div>
          {session && session.user ? (
            <div className="">
              <div className="border border-gray-400 inset-shadow-sm inset-shadow-gray-300 px-4 py-2 rounded-lg mb-2">
                <h1>
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-2 inline-block"
                    />
                  )}
                  {session.user.name}
                </h1>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className=" border-2  cursor-pointer bg-[#131316] text-white rounded-lg px-4 py-2 text-center"
              >
                <button
                  type="submit"
                  className="cursor-pointer w-full items-center gap-1 justify-center flex text-center"
                >
                  <Github size={20} />
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <div className="border-2 p-2 rounded-lg mb-2 bg-dark-blue-400 text-white border-dark-blue-500">
                <h1>Guest</h1>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
                className=" border-2  cursor-pointer bg-[#131316] text-white rounded-lg p-3 ring-2  text-center"
              >
                <button
                  type="submit"
                  className="cursor-pointer w-full items-center gap-1 justify-center flex text-center"
                >
                  <Github size={20} />
                  Login with Github
                </button>
              </form>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default Navbar;
