import TasksComponent from "@/components/TasksComponent";
import TasksWelcomeComponent from "@/components/TasksWelcomeComponent";

export default function TaskScreen() {

  return (
    <div className="max-w-[600px] m-auto">
      <TasksWelcomeComponent />
      <TasksComponent />
    </div>
  )
}
