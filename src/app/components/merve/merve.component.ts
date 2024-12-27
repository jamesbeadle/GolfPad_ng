import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-merve',
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './merve.component.html',
  styleUrl: './merve.component.css',
  standalone: true
})
export class MerveComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'ai' }[] = [];

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
      const response: any = await firstValueFrom(
        this.http.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  `You are a helpful assistant that specializes in the official rules of golf. ` +
                  `Only answer questions related to golf rules. If asked anything unrelated, ` +
                  `politely refuse to answer or redirect to official resources.`
              },
              {
                role: 'user',
                content: userMessage
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${environment.openAIAPIKey}`,
            },
          }
        )
      );

      const aiText = response?.choices?.[0]?.message?.content ?? 'No response.';
      this.messages.push({ text: aiText, sender: 'ai' });
    } catch (error) {
      console.error('Error contacting OpenAI:', error);
      this.messages.push({
        text: 'Error contacting AI service.',
        sender: 'ai',
      });
    }
  }

}
