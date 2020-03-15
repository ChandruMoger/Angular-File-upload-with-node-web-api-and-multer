import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'File-Upload-Client';
  selectedImages: File = null;
  constructor(private http: HttpClient) {

  }
  ngOnInit(){

  }

  selectTheFiles(event) {
    if (event.target.files.length > 0) {
      this.selectedImages =  event.target.files[0];
    }
  }
    
  uploadSingleImage() {
    const formData = new FormData();
    formData.append('file', this.selectedImages);

    this.http.post<any>('http://localhost:4000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
