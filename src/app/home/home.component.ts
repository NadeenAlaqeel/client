import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  tasks:any;
  index=0;
  ngOnInit(): void {
    
    this.getTasks();
  

  }

  getTasks(): void {
    this.http.get('http://localhost:5000/api/tasks').subscribe({
      next: response => this.tasks = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed'),

});

  }
  
  
}
