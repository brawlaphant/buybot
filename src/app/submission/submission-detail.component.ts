import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Submission } from '../models/submission.model';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-submission-detail',
  templateUrl: './submission-detail.component.html',
})
export class SubmissionDetailComponent implements OnInit {
  submission: Submission | null = null;

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadSubmission(id);
  }

  loadSubmission(id: string) {
    this.submissionService.getSubmission(id).subscribe(
      (submission) => {
        this.submission = submission;
      },
      (error) => {
        console.error('Error loading submission:', error);
      }
    );
  }

  onVote() {
    if (this.submission) {
      this.submissionService.voteForSubmission(this.submission.id).subscribe(
        () => {
          if (this.submission) {
            this.submission.votes++;
          }
        },
        (error) => {
          console.error('Error voting:', error);
        }
      );
    }
  }
}