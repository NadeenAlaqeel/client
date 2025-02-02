import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  http = inject(HttpClient);
  taskname: any;
  title: any;
  isEditMode = false;
  model: any = {};
  private toastr = inject(ToastrService);
  private router = inject(Router);
  apiUrl = 'http://localhost:5000/api/tasks'; 
  taskId: any;


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id'); 

    if (this.taskId) {
      this.http.get(`http://localhost:5000/api/tasks/${this.taskId}`).subscribe(task => {
        this.model = task; // Load task
        console.log("Loaded task:", this.model);
      });
      this.taskname = "Edit";
       this.isEditMode=true



    }
        this.taskname = "New";
        this.title = "Add";
        
  }
  

  
  
  save() {
  if(this.isEditMode){

    this.http.put(`http://localhost:5000/api/tasks/${this.taskId}`, this.model).subscribe({
      next: (response) => {
        this.toastr.success("Update Task successfully")

        this.router.navigate(['/Details']); 
      },
      error: (error) => {
        alert("Failed to update task!");
      }
    });




  }
    else{
  
      this.http.post("http://localhost:5000/api/tasks", this.model).subscribe({
              complete: () => console.log('Request has completed'),
             
              

        });
       
        this.toastr.success("Create Task successfully")
        
        this.router.navigate(['/Home']); 
    }

      }}
    

