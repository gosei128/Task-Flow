import Dashboard from "../Dashboard";
import Header from "./Header";
import TaskTab from "../TaskTabs";
const Homepage = () => {
  return (
    <main className="w-full h-full ">
      <Header />
      <Dashboard />
      <TaskTab />
    </main>
  );
};

export default Homepage;
