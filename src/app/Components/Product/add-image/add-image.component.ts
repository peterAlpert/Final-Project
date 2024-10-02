import { ImageService } from './../../../Core/Services/image.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-image.component.html',
  styles: ``
})
export class AddImageComponent implements OnInit {

  userId: number = 0
  image: string | ArrayBuffer | null = null;
  imageSrc: string = ''
  // files: FileList | null = null

  files: File[] = []

  images: any[] = []

  constructor(private _ImageService: ImageService) {

    this.userId = Number(localStorage.getItem('userId'))

  }

  ngOnInit(): void {
    this._ImageService.gellAll(1).subscribe({
      next: res => {
        this.images = res
        console.log(this.images);

      }
    })

  }

  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.image = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


  // onFileSelected(event: any) {
  //   const files: FileList = event.target.files;
  //   // this.files = [];

  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files[i]);
  //   }

  //   console.log(this.files);


  // }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.files = [];

    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }

    console.log(this.files);

  }


  // upload() {
  //   if (this.image) {
  //     this.sendImage(this.image);
  //   }
  // }

  // sendImage(image: string | ArrayBuffer) {
  //   const base64String = (image as string).split(',')[1];

  //   const picDTO = {
  //     imageData: Array.from(base64String).join(''),
  //     userId: this.userId
  //   }

  //   this._ImageService.addImage(picDTO).subscribe({
  //     next: res => {
  //       console.log(picDTO);
  //       console.log('Image uploaded successfully!', res);
  //     },
  //     error: err => {
  //       console.log(picDTO);
  //       console.log(err);
  //     }
  //   })
  // }

  getImage() {
    this._ImageService.getImage(this.userId).subscribe({
      next: res => {
        console.log(res);
        this.imageSrc = res.image
        console.log(this.imageSrc);

      }
    })
  }

  sendImage() {

    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('files', file)
    })

    this._ImageService.addProductImg(formData).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })

  }

}







