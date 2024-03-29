import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  toDoForm = new FormGroup({
    task: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ])
  })
  
  todos: Task[] = []
  taskDone: number = 0
  color: string = 'warn'
  progress: number = 0

  constructor(){
  }

  resetForm(){
    this.toDoForm.reset()
  }
  
  ngOnInit(): void {
    this.todos = [
      { content: 'First task', completed: false },
      { content: 'Second task', completed: false }
    ]
  }
  
  // Send form 
  onSubmit(){
    this.todos.push({
      content: this.toDoForm.value.task,
      completed: false
    })

    this.toDoForm.reset()
  }

  // Delete task
  deleteTask(index: number){
    this.todos = this.todos.filter((v, i) => i !== index)

    let counterDone = 0
    this.todos.forEach((todo) => {
      if(todo.completed){
        counterDone++
      }
    })

    this.taskDone = counterDone
    this.progress = ((this.taskDone / this.todos.length) * 100)
  }

  // Task done
  doneTask(index: number){
    
    this.todos.map((v, i) => {
      if(i === index){
        v.completed = !v.completed
        return v
      }
    })

    if(this.todos[index].completed){
      this.taskDone = this.taskDone + 1
      this.progress = ((this.taskDone / this.todos.length) * 100)
    } 

    if(this.todos[index].completed === false){
      this.taskDone = this.taskDone - 1
      this.progress = ((this.taskDone / this.todos.length) * 100)
    } 

    // Change colors
    if(this.progress < 35){
      return this.color = 'warn'
    } else if(this.progress < 70){
      return this.color = 'accent'
    } else {
      return this.color = 'primary'
    }
  }

  // Delete ALL task
  deleteAll(){
    this.todos = []
    this.taskDone = 0
    this.progress = 0
  }
  
}
