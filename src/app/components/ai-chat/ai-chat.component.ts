import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RagService, ChatMessage } from '../../services/rag.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit, OnDestroy, OnChanges {
  @Input() courseId?: number;
  
  messages: ChatMessage[] = [];
  currentMessage = '';
  isLoading = false;
  isOpen = false;
  private subscription?: Subscription;
  private courseContext: string | null = null;

  constructor(private ragService: RagService, private courseService: CourseService) {}

  ngOnInit(): void {
    // ADD THIS: Verify courseId is received
    console.log('🔍 AI Chat initialized with courseId:', this.courseId);
    
    if (!this.courseId) {
      console.warn('⚠️ No courseId provided to chat widget!');
    }

    // Set the active course in the RagService so it emits the right message stream
    this.ragService.setActiveCourse(this.courseId ?? null);
    // Prepare course context (if courseId provided)
    if (this.courseId) {
      this.prepareCourseContext(this.courseId);
    }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && !changes['courseId'].isFirstChange()) {
      const newId = changes['courseId'].currentValue as number | undefined;
      console.log('🔁 AI Chat courseId changed to', newId);
      this.ragService.setActiveCourse(newId ?? null);
      if (newId) {
        this.prepareCourseContext(newId);
      } else {
        this.courseContext = null;
      }
    }
  }

  private prepareCourseContext(courseId: number): void {
    this.courseContext = null; // reset while loading
    this.courseService.getCourseById(courseId).subscribe((course: Course | undefined) => {
      if (course) {
        const parts = [
          `Title: ${course.title}`,
          `Instructor: ${course.instructor}`,
          `Category: ${course.category}`,
          `Description: ${course.description}`,
          '',
          'Lessons:',
          ...course.lessons.map(l => `- ${l.title}: ${l.description}`)
        ];
        this.courseContext = parts.join('\n');
        console.log('🧾 Course context prepared for chat:', this.courseContext.substring(0, 200) + '...');
      }
    }, err => {
      console.warn('Could not load course for context', courseId, err);
      this.courseContext = null;
    });
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

    const doSend = (context: string | null) => {
      this.ragService.sendMessage(userMessage, this.courseId, context).subscribe({
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
    };

    if (this.courseId && !this.courseContext) {
      this.courseService.getCourseById(this.courseId).subscribe((course: Course | undefined) => {
        if (course) {
          const parts = [
            `Title: ${course.title}`,
            `Instructor: ${course.instructor}`,
            `Category: ${course.category}`,
            `Description: ${course.description}`,
            '',
            'Lessons:',
            ...course.lessons.map(l => `- ${l.title}: ${l.description}`)
          ];
          this.courseContext = parts.join('\n');
        }
        doSend(this.courseContext);
      }, err => {
        console.warn('Could not load course for sending context', this.courseId, err);
        doSend(null);
      });
    } else {
      doSend(this.courseContext);
    }
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
