"use client"

import { useState, useEffect } from "react"
import type { Task, GitHubUser } from "@/types/type"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { GitHubUserSearch } from "@/components/GitHubUserSearch"
import Image from "next/image"

interface TaskModalProps {
    task: Task | null
    isOpen: boolean
    onClose: () => void
    onSave: (task: Task) => void
}

export function TaskModal({ task, isOpen, onClose, onSave }: TaskModalProps) {
    const [editedTask, setEditedTask] = useState<Task>({
        id: 0,
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        assignee: null,
    })

    useEffect(() => {
        if (task) {
            setEditedTask(task)
        }
    }, [task])

    const handleAssignUser = (user: GitHubUser) => {
        setEditedTask({ ...editedTask, assignee: user })
    }
    const handleSave = () => {
        onSave(editedTask)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[575px]">
                <DialogHeader>
                    <DialogTitle>{task ? "Editar Tarefa" : "Adicionar Nova Tarefa"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Titulo
                        </Label>
                        <Input
                            id="title"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dueDate" className="text-right">
                            Vencimento
                        </Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={editedTask.dueDate}
                            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Prioridade
                        </Label>
                        <Select
                            value={editedTask.priority}
                            onValueChange={(value) => setEditedTask({ ...editedTask, priority: value as "low" | "medium" | "high" })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Baixa</SelectItem>
                                <SelectItem value="medium">Media</SelectItem>
                                <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Atribuir a</Label>
                        <div className="col-span-3">
                            {editedTask.assignee ? (
                                <div className="flex items-center gap-2 mb-2">
                                    <Image
                                        src={editedTask.assignee.avatar_url || "/placeholder.svg"}
                                        alt={editedTask.assignee.name}
                                        className="w-8 h-8 rounded-full"
                                        width={100} height={100} layout="intrinsic"
                                    />
                                    <span>{editedTask.assignee.name || editedTask.assignee.login}</span>
                                    <Button
                                        onClick={() => setEditedTask({ ...editedTask, assignee: null })}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Remover
                                    </Button>
                                </div>
                            ) : (
                                <GitHubUserSearch onSelect={handleAssignUser} />
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} className="bg-green-700 hover:bg-green-600">
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

