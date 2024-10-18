import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { takePicture, requestPermissions } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
})
export class SubmissionComponent {
  title: string = '';
  description: string = '';
  imageSrc: string = '';

  constructor(
    private routerExtensions: RouterExtensions,
    private submissionService: SubmissionService
  ) {}

  async onTakePhoto() {
    await requestPermissions();
    const options = {
      width: 300,
      height: 300,
      keepAspectRatio: true,
      saveToGallery: false
    };

    takePicture(options).then((imageAsset) => {
      const source = new ImageSource();
      source.fromAsset(imageAsset).then((imageSource) => {
        this.imageSrc = imageSource.toBase64String('png');
      });
    }).catch((err) => {
      console.log("Error -> " + err.message);
    });
  }

  onRecordVideo() {
    // Implement video recording functionality
    console.log('Video recording not implemented yet');
  }

  canSubmit(): boolean {
    return this.title.length > 0 && this.description.length > 0 && this.imageSrc.length > 0;
  }

  onSubmit() {
    if (this.canSubmit()) {
      this.submissionService.addSubmission({
        title: this.title,
        description: this.description,
        imageData: this.imageSrc,
        votes: 0
      }).subscribe(
        () => {
          this.routerExtensions.navigate(['/home'], { clearHistory: true });
        },
        (error) => {
          console.error('Error submitting:', error);
        }
      );
    }
  }
}