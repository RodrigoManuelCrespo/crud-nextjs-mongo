import NavbarComponent from "@/components/Navbar";
import TasksComponent from "@/components/TasksComponent";
import TasksWelcomeComponent from "@/components/TasksWelcomeComponent";

export default function TaskScreen() {

  return (
    <>
      <NavbarComponent />
      <div className="max-w-[600px] m-auto">
        <TasksWelcomeComponent />
        <TasksComponent />
      </div>
    </>
  )
}
