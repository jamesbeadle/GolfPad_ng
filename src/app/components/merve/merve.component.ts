import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AIResponse, DefaultResponse, ResponseQuery, RulesRepsonse, ShotInputResponse, ShotQueryResponse } from '../../interfaces/ai-responses';

@Component({
  selector: 'app-merve',
  imports: [CommonModule, FormsModule],
  templateUrl: './merve.component.html',
  styleUrl: './merve.component.css',
})
export class MerveComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'ai', ai_response: AIResponse }[] = [];
  isTyping = false;

  constructor(private http: HttpClient, private authService: AuthService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, sender: 'user', ai_response: { content: this.userInput, response_type: -1 } });
    const userMessage = this.userInput;
    this.userInput = '';

    try {
      this.authService.currentUser$.subscribe(async user => {

        if (user) {
          this.isTyping = true;
          const langchainResponse: any = await firstValueFrom(
            this.http.post(
              `https://golfpad-langchain-m2az.onrender.com/chat`,
              { query: userMessage, golfer_id: user.uid },
            )
          ) as any;
          console.log(langchainResponse)
          var response = JSON.parse(langchainResponse);
          console.log(response)
          this.messages.push({ text: response.content, sender: 'ai', ai_response: response });
          console.log(this.messages)

          this.isTyping = false;
        }
      });
    } catch (error) {
      console.error('Error contacting LangChain model:', error);
      this.messages.push({ text: 'Error contacting AI service.', sender: 'ai', ai_response: {content: 'Error contacting AI service', response_type: 0} });
    }

    
  
  }

  hasValue<T extends Record<string, unknown>>(obj: T, key: keyof T): boolean {
    const value = obj[key];
    return value !== null && value !== undefined && value !== '';
  }

  isRulesResponse(response: AIResponse): response is RulesRepsonse {
    return response.response_type == 2;
  }

  isShotResponse(response: AIResponse): response is RulesRepsonse {
    return response.response_type == 3;
  }
  
  
}
