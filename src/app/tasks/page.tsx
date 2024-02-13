import CreateTask from "@/components/CreateTask";
import Tasks from "@/components/Tasks";
import { Button, Card } from "@nextui-org/react";

export default function TaskScreen() {

  return (
    <div className="max-w-[600px] m-auto">
      <Card className="rounded-t-none rounded-b-3xl	p-5 bg-zinc-800 mb-4">
        <h1 className="font-bold text-xl mb-2">¡Bienvenido de nuevo!</h1>
        <h1 className="text-l mb-8"> Organiza tu día con eficacia, empecemos a trabajar en tus tareas.</h1>
        <CreateTask />
      </Card>
      <div className="p-5">
        <Tasks />
      </div>
    </div>
  )
}
