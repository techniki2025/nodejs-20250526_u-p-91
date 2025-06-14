import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from './task.model';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  id?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}