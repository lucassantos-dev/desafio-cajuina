
export interface GitHubUser {
    login: string
    avatar_url: string
    name: string
}
export interface Task {
    id: number
    title: string
    description: string
    dueDate: string
    priority: "low" | "medium" | "high"
    assignee: GitHubUser | null
}
