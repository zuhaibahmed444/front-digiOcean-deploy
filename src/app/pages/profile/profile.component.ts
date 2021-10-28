import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  selectedFile: File;
  user = null;
  username =" ";
  sub ;
  imageName: any;
  del;
  constructor(private login: LoginService,private router: Router,private snack: MatSnackBar,private upload :UploadService) {}

  ngOnInit(): void {
    this.upload.onUpdate();
    this.user = this.login.getUser();
    if(this.user.subscribed){
      this.sub = "LIFETIME MEMBERSHIP"
    }
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
  }
  public backto(){
    if (this.login.getUserRole() == 'ADMIN') {
      
      this.router.navigate(['admin']);
      
    } else if (this.login.getUserRole() == 'NORMAL') {
      
      this.router.navigate(['user-dashboard/0']);
      
    }

  }
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile);
    console.log(uploadImageData)
    this.upload.updateProfilePic(uploadImageData).subscribe((data:any)=>{
      console.log(data)
      Swal.fire('Upload Success','','success')
      window.location.reload();
      window.location.reload();
    })
    
    
  }




  
  public Ondel(){

    this.username = this.user.username
    this.upload.deleteProfilePic(this.username).subscribe((data:any)=>{
      console.log(data)
      window.location.reload();
      window.location.reload();
    })
  }

  
}
 