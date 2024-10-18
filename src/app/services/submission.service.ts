import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Submission } from '../models/submission.model';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private submissions: Submission[] = [];
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    // Initialize Ethereum provider and contract
    this.provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR-PROJECT-ID');
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = []; // Add your contract ABI here
    this.contract = new ethers.Contract(contractAddress, contractABI, this.provider);
  }

  getSubmissions(): Observable<Submission[]> {
    // In a real app, this would fetch from the blockchain
    return of(this.submissions);
  }

  getSubmission(id: string): Observable<Submission | undefined> {
    return of(this.submissions.find(s => s.id === id));
  }

  addSubmission(submission: Submission): Observable<void> {
    submission.id = Date.now().toString(); // Simple ID generation
    this.submissions.push(submission);
    // In a real app, this would interact with the blockchain
    return of(void 0);
  }

  voteForSubmission(id: string): Observable<void> {
    const submission = this.submissions.find(s => s.id === id);
    if (submission) {
      submission.votes++;
      // In a real app, this would interact with the blockchain
    }
    return of(void 0);
  }

  // Example of interacting with the blockchain (not fully implemented)
  async submitToBlockchain(submission: Submission) {
    try {
      const tx = await this.contract.submitEntry(submission.title, submission.description, submission.imageData);
      await tx.wait();
      console.log('Submission added to blockchain');
    } catch (error) {
      console.error('Error submitting to blockchain:', error);
    }
  }
}