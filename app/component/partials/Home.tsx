import Dashboard from "../Dashboard";
import Header from "./Header";
import TaskTab from "../TaskTabs";
const Homepage = () => {
  return (
    <main>
      <Header />
      <Dashboard />
      <TaskTab />
    </main>
  );
};

export default Homepage;
