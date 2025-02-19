'use client'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Calendar } from "lucide-react"
import Image from "next/image"
import { TaskModal } from "@/components/TaskModal"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import type { Task } from "@/types/type"

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null)

  const priorityTranslations: Record<string, string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
  }
  const fetchTasks = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "tasks")
      const data = await response.json()
      if (response.ok) {
        setTasks(data)
      } else {
        alert("Erro ao carregar as tarefas")
      }
    } catch (error) {
      console.error("Erro na requisição", error)
    }
  }
  const addOrUpdateTask = async (task: Task) => {
    try {
      let response;

      const filteredTask = {
        ...task,
        assignee: task.assignee
          ? {
            login: task.assignee.login,
            avatar_url: task.assignee.avatar_url,
            name: task.assignee.name,
          }
          : null,
      };
      if (editingTask) {
        response = await fetch(process.env.NEXT_PUBLIC_API_URL + `tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredTask),
        });
      } else {
        response = await fetch(process.env.NEXT_PUBLIC_API_URL + "tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredTask),
        });
      }

      const updatedTask = await response.json();

      if (response.ok) {
        if (editingTask) {
          setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        } else {
          setTasks([...tasks, updatedTask]);
        }
        setEditingTask(null);
      } else {
        alert("Erro ao salvar a tarefa");
      }
    } catch (error) {
      console.error("Erro na requisição", error)
    }
  }


  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        alert("Erro ao excluir a tarefa");
      }
    } catch (error) {
      console.error("Erro na requisição", error)
    }
  }

  const openModal = (task: Task | null = null) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-200 text-green-800"
      case "medium":
        return "bg-yellow-200 text-yellow-800"
      case "high":
        return "bg-red-200 text-red-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-cajuina-cream p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-700 p-4 flex justify-between">
          <h1 className="text-2xl font-bold text-white">Lista de Tarefas</h1>
          <div>
            <Image alt="logo" src="/logo.png" className="w-12 h-w-12 rounded-full mr-2" width={100} height={100} />
          </div>
        </div>
        <div className="p-4">
          <Button onClick={() => openModal()} className="mb-4 bg-green-700 text-white hover:bg-green-600">
            Adicionar Nova tarefa
            <Plus className="ml-2 h-4 w-4" />
          </Button>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-cajuina-cream p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Vencimento: {task.dueDate}</span>
                    </div>
                    {task.assignee && (
                      <div className="flex items-center mt-2">
                        <Image
                          src={task.assignee.avatar_url || "/placeholder.svg"}
                          alt={task.assignee.name}
                          className="w-6 h-6 rounded-full mr-2"
                          width={100} height={100} layout="intrinsic"
                        />
                        <span className="text-sm text-gray-600">{task.assignee.name || task.assignee.login}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${getPriorityColor(task.priority)}`}
                    >
                      {priorityTranslations[task.priority] || "Desconhecida"}
                    </span>

                    <Button
                      onClick={() => openModal(task)}
                      variant="ghost"
                      size="sm"
                      className="text-green-700 hover:text-green-600 mr-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="text-green-700 hover:text-green-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addOrUpdateTask}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={() => taskToDelete !== null && deleteTask(taskToDelete)}
        title="Excluir Tarefa"
        description="Você realmente deseja excluir a tarefa?"
      />
    </div>
  )
}
