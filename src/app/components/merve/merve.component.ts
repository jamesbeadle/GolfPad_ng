import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-merve',
  templateUrl: './merve.component.html',
  styleUrl: './merve.component.css',
  standalone: false
})
export class MerveComponent {
  isOpen = false;
  messages: { text: string; sender: 'user' | 'ai', ai_response: LangChainReponse | null }[] = [];
  isTyping = false;
  form = new FormGroup({
    userInput: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    const userMessage = this.form.value.userInput?.trim();
    if (!userMessage) return;

    this.messages.push({ text: userMessage, sender: 'user', ai_response: null });
    this.form.reset();

    try {
      this.isTyping = true;
      const langchainResponse: any = await firstValueFrom(
        this.http.post(
          'https://golfpad-langchain-m2az.onrender.com/chat',
          { question: userMessage },
        )
      ) as LangChainReponse;
      this.isTyping = false;

      const aiResponse = langchainResponse;
      this.messages.push({ text: aiResponse.answer.content, sender: 'ai', ai_response: aiResponse });
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