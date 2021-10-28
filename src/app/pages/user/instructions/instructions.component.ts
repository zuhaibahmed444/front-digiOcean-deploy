import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from 'src/app/services/question.service';
import { Component, OnInit, ViewChild, ElementRef ,AfterViewInit} from '@angular/core';
import { base64StringToBlob } from 'blob-util';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements AfterViewInit  {
  //to set the image settings
  WIDTH = 400;
  HEIGHT = 350;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured: boolean;
  //quiz settings
  isVerified = false;
  qid;
  num;
  eachmark;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    isActive: true,
    category: {
      cid: '',
    },
  };
  questions;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
    private _question: QuestionService,
    private upload :UploadService,
  
  ) {}

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

  OnVerify(){
    // console.log(this.captures[0])
    var imageBase64 = this.captures[0];
    var blob = dataURItoBlob(imageBase64);

    var file = new File([blob], "fileName.jpeg", {
      type: "'image/jpeg'"
    });

    const uploadImageData = new FormData();
    uploadImageData.append('file', file);

    console.log(uploadImageData)

    this.upload.verifyImage(uploadImageData).subscribe((data:any)=>{
      if(data == "SUCCESS"){
        this.isVerified = true
        this.qid = this._route.snapshot.params.qid;
        Swal.fire('User Verified', 'Please Take the Test', 'success');
        this._router.navigate(['/start/' + this.qid]);
        console.log(data)
        
      }
      if(data == "Fail"){
        Swal.fire("User AUthentication Failed", "Please Check for recent Profile Pic","error")
        this._router.navigate(['user-dashboard/0']);
      }
    })
  

  }

  

  


  startQuiz() {
    Swal.fire("User Verification needed to start test","Please Verify","warning")
  }

 
  

  

}

function dataURItoBlob(dataURI) {

  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}


