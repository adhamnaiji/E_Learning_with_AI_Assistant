import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RagService, ChatMessage } from '../../services/rag.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit, OnDestroy {
  @Input() courseId?: number;
  
  messages: ChatMessage[] = [];
  currentMessage = '';
  isLoading = false;
  isOpen = false;
  private subscription?: Subscription;

  constructor(private ragService: RagService) {}

  ngOnInit(): void {
    // ADD THIS: Verify courseId is received
    console.log('🔍 AI Chat initialized with courseId:', this.courseId);
    
    if (!this.courseId) {
      console.warn('⚠️ No courseId provided to chat widget!');
    }

    // Set the active course in the RagService so it emits the right message stream
    this.ragService.setActiveCourse(this.courseId ?? null);

    this.subscription = this.ragService.messages$.subscribe(messages => {
      this.messages = messages;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      console.log('💬 Chat opened for course:', this.courseId);
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const userMessage = this.currentMessage;
    
    // ADD THIS: Log what's being sent
    console.log('📤 Sending message:', {
      message: userMessage,
      courseId: this.courseId,
      hasCourseId: this.courseId !== undefined
    });

    this.ragService.addMessage('user', userMessage, [], this.courseId);
    this.currentMessage = '';
    this.isLoading = true;

    this.ragService.sendMessage(userMessage, this.courseId).subscribe({
      next: (response) => {
        // ADD THIS: Log response
        console.log('📥 Response received:', {
          response: response.response.substring(0, 100) + '...',
          sourcesCount: response.sources.length,
          sources: response.sources
        });
        
        this.ragService.addMessage('assistant', response.response, response.sources, this.courseId);
        // Associate the returned conversation id with the current course so subsequent messages keep context
        this.ragService.setConversationId(response.conversation_id, this.courseId);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.ragService.addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        this.isLoading = false;
      }
    });
  }

  clearChat(): void {
    console.log('🗑️ Clearing chat for course:', this.courseId);
    this.ragService.clearConversation(this.courseId).subscribe(() => {
      this.messages = [];
    });
  }

  private scrollToBottom(): void {
    const messagesContainer = document.querySelector('.chat-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
