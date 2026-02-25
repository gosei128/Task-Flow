const TaskTab = () => {
  return (
    <main className="h-full w-full ">
      <div className="grid grid-cols-3 gap-4">
        <div className="Task p-2">
          <h1 className="">
            <span className="border rounded-full p-1 h-5"></span>Pending
          </h1>
        </div>
        <div className="Task">In Progress</div>
        <div className="Task">Completed</div>
      </div>
    </main>
  );
};

export default TaskTab;
