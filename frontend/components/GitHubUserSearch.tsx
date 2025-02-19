"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { GitHubUser } from "@/types/type"
import Image from "next/image"

interface GitHubUserSearchProps {
    onSelect: (user: GitHubUser) => void
}
interface UserGit {
    login: string
}

export function GitHubUserSearch({ onSelect }: GitHubUserSearchProps) {
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState<GitHubUser[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const searchUser = async () => {
        if (!username) return
        setIsLoading(true)
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${username}`)
            const data = await response.json()
            const detailedUsers = await Promise.all(
                data.items.slice(0, 5).map(async (user: UserGit) => {
                    const userResponse = await fetch(`https://api.github.com/users/${user.login}`)
                    return await userResponse.json()
                }),
            )
            setUsers(detailedUsers)
        } catch (error) {
            console.error("Erro ao buscar dados do usuario:", error)
        }
        setIsLoading(false)
    }

    return (
        <div>
            <div className="flex gap-2 mb-2">
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Pesquisar usuario do Github"
                />
                <Button onClick={searchUser} disabled={isLoading} className="bg-green-700 hover:bg-green-600">
                    Pesquisar
                </Button>
            </div>
            {users.map((user) => (
                <div key={user.login} className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded">
                    <Image src={user.avatar_url || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" width={100} height={100} layout="intrinsic" />
                    <span>{user.name || user.login}</span>
                    <Button onClick={() => onSelect(user)} className="ml-auto bg-green-700 hover:bg-green-600">
                        Selecionar
                    </Button>
                </div>
            ))}
        </div>
    )
}

