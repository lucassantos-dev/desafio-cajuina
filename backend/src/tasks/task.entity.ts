import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


interface GitHubUser {
    login: string;
    avatar_url: string;
    name: string;
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    dueDate: string;

    @Column({
        type: 'text',
        default: 'medium',
    })
    priority: 'low' | 'medium' | 'high';

    @Column({ type: 'json', nullable: true })
    assignee: GitHubUser | null;
}
