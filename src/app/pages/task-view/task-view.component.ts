import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { List } from 'src/app/Models/list.model';
import { Task } from 'src/app/Models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.taskService.getTasks(params['listId']).subscribe((tasks: Task[]) =>{
          this.tasks = tasks;
        })
      }
    )
    
    this.taskService.getLists().subscribe((lists: List[])=>{
      this.lists = lists;
    })


  }
  onTaskClick(task: Task){
    //we want to set the task to completed
    this.taskService.iscompleted(task).subscribe(() => {
      console.log("Completed Successfully");
      // the task has been set to completed successfully
      task.completed = !task.completed;
    })
  }
}
