import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit{
  title:string = 'To Do List';
  tasks:string[]=[];
  NewTask:string='';
  hasTasks:boolean=false;

  ngOnInit(){
    this.loadTasks()
  }

  addTask():void{
    if(this.NewTask !== "" && this.NewTask.replace(/\s+/g, '')!==''){
      this.tasks.push(this.NewTask.trim());
      this.hasTasks=true
      this.saveTasks()
    }
    this.NewTask=''
  }
  
  removeTask(index:number):void{
    this.tasks.splice(index,1);
    this.hasTasks = this.tasks.length>0
    this.saveTasks()
  }

  removeAll():void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove all!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasks.length=0;
        this.hasTasks=false;
        this.saveTasks();
        Swal.fire(
          'Confirmed!',
          'All tasks have been removed successfully',
          'success'
        );
      }
    });
  }
  saveTasks():void{
    localStorage.setItem('tasklist',JSON.stringify(this.tasks))
  }
  loadTasks():void{
    const savedTasks = localStorage.getItem('tasklist')
    if(savedTasks){
      this.tasks = JSON.parse(savedTasks)
      this.hasTasks = this.tasks.length>0;
    }
  }
}
