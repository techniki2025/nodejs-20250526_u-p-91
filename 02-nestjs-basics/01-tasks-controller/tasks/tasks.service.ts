import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private keyTask: string = '1';

  private findIndexTask(id: string) {
    return this.tasks.findIndex( task => task.id == id);
  };

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find( task => task.id == id);
    if(!task) throw new NotFoundException(`No task ${id}`);
    return task;
  }

  createTask(task: Task): Task {
    const id = this.keyTask;
    task.id = id;
    this.tasks.push(task);
    this.keyTask = +id + 1 + '';
    return task;
  }

  updateTask(id: string, update: Task): Task {
    const indexTask = this.findIndexTask(id);
    if(indexTask === -1) throw new NotFoundException(`No task ${id}`);
    this.tasks[indexTask] = update;
    this.tasks[indexTask].id = id;
    return this.tasks[indexTask];
  }

  deleteTask(id: string): Task {
    const indexTask = this.findIndexTask(id);
    if(indexTask === -1) throw new NotFoundException(`No task ${id}`);
    return this.tasks.splice(indexTask, 1)[0];
  }
}
