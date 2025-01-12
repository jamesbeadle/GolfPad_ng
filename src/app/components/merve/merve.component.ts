import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-merve',
  imports: [CommonModule, FormsModule],
  templateUrl: './merve.component.html',
  styleUrl: './merve.component.css',
})
export class MerveComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'ai', ai_response: LangChainReponse | null }[] = [];
  isTyping = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, sender: 'user', ai_response: null });
    const userMessage = this.userInput;
    this.userInput = '';

    try {
      const user = await this.authService.currentUser$.toPromise();
      if (user) {
        this.isTyping = true;
        const langchainResponse: any = await firstValueFrom(
          this.http.post(
            `https://golfpad-langchain-m2az.onrender.com/chat`,
            { question: userMessage, golfer_id: user.uid },
          )
        ) as LangChainReponse;
        this.isTyping = false;
  
        const aiResponse = langchainResponse;
        this.messages.push({ text: aiResponse.answer.content, sender: 'ai', ai_response: aiResponse });
      }
    } catch (error) {
      console.error('Error contacting LangChain model:', error);
      this.messages.push({ text: 'Error contacting AI service.', sender: 'ai', ai_response: null });
    }
  }
}

export interface LangChainReponse {
  answer: {
    headline: string;
    content: string;
    actions: string[];
    rule_number: string;
  };
}