import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-merve',
  imports: [CommonModule, FormsModule],
  templateUrl: './merve.component.html',
  styleUrl: './merve.component.css',
  standalone: true
})
export class MerveComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'ai' }[] = [];
  isTyping = false;

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, sender: 'user' });
    const userMessage = this.userInput;
    this.userInput = '';

    try {
      this.isTyping = true;
      const langchainResponse: any = await firstValueFrom(
        this.http.post(
          'https://golfpad-langchain-m2az.onrender.com/chat',
          { question: userMessage },
        )
      );
      this.isTyping = false;

      const aiResponse = langchainResponse?.answer || 'I am here to help with question related to the official rules of golf. If you have any other golf rules-related questions, feel free to ask!';
      this.messages.push({ text: aiResponse, sender: 'ai' });
    } catch (error) {
      console.error('Error contacting LangChain model:', error);
      this.messages.push({ text: 'Error contacting AI service.', sender: 'ai' });
    }
  }
}