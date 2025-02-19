import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    dueDate: string;

    @IsEnum(['low', 'medium', 'high'])
    priority: 'low' | 'medium' | 'high';

}
