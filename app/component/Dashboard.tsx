import { ClipboardList } from "griddy-icons";
const Dashboard = () => {
  return (
    <main className=" py-2 ">
      <div className="grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(3,1fr)] gap-y-2.5 gap-x-2.5">
        <div className="columns p-2">
          <div className="flex items-center justify-between">
            <h3>Total Task</h3>
            <ClipboardList
              size={35}
              className="text-indigo-500 p-1 rounded-lg  bg-indigo-300"
            />
          </div>

          <h1 className="text-3xl font-bold">127</h1>
          <p>
            <small className="text-green-600">+12% from last week</small>
          </p>
        </div>
        <div className="columns">2</div>
        <div className="columns">3</div>
        <div className="columns">4</div>
      </div>
    </main>
  );
};

export default Dashboard;
