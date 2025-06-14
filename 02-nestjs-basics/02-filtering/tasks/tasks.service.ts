import { Injectable, BadRequestException, NotFoundException  } from "@nestjs/common";
import { SortBy, Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy? : SortBy,
  ): Task[] {
    let result: Task[] = [];

    if(status) {
      if(!Object.values(TaskStatus).includes(status)) throw new BadRequestException (`No exist status ${status}`)
      result.push(...this.tasks.filter( task => task.status === status));
    } else {
      result = this.tasks;
    }

    if(page) {
      result = result.slice(page - 1);
    }

    if(limit) {
      result = result.slice(0, limit);
    }

    //закоментил, т.к. тест ругается, где массив на выходе пустой ждет
    // if(!result.length) throw new NotFoundException(`Tasks is not found`);

    if(sortBy) {
      result = result.sort((a, b)=>{
        if(a[sortBy] < b[sortBy]) return -1;
        if(a[sortBy] > b[sortBy]) return 1;
        return 0;
      })
    }

    return result;
  }
}
