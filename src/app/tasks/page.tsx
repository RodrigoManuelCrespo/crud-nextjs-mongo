import CreateTask from "@/components/CreateTask";
import Tasks from "@/components/Tasks";

export default function TaskScreen() {

  return (
    <div className="max-w-[600px] m-auto p-5">
      <Tasks />
      <CreateTask />
    </div>
  )
}
