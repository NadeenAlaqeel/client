import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',

})
export class DetailsComponent implements OnInit {
  http = inject(HttpClient);
  tasks:any;
  constructor(private router: Router) {};
  isEditMode=false;
  model: any = {};
  Showform=false;
  private toastr = inject(ToastrService);


  ngOnInit(): void {
    this.getTasks();
   


  }

  getTasks(): void {
    this.http.get('http://localhost:5000/api/tasks').subscribe({
      next: response => this.tasks = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')

})
  }
 
goToEdit(taskId: number) {
  this.router.navigate(['AddEdit', taskId]); 
}
goToDelete(taskId: number){

  this.http.delete(`http://localhost:5000/api/tasks/${taskId}`).subscribe({
    next: (response) => {
      this.toastr.success("Delete Task successfully")

      this.router.navigate(['/Home']); 
    },
    error: (error) => {
      alert("Failed to Delete task!");
    }

});
}
  
}


