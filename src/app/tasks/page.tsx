import CreateTask from "@/components/CreateTask";
import Tasks from "@/components/Tasks";
import { Button, Card } from "@nextui-org/react";

export default function TaskScreen() {

  return (
    <div className="max-w-[600px] m-auto">
      <Card className="rounded-t-none rounded-b-3xl	p-5 bg-[#E0AED0] mb-4">
        <h1 className="font-semibold text-gray-800		text-xl mb-2">Hora de administrar tus tareas</h1>
        <h1 className="font-semibold text-gray-800		text-l mb-6">Tienes 12 tareas pendientes</h1>
        <CreateTask />
      </Card>
      <div className="p-5">
        <Tasks />
      </div>
    </div>
  )
}
