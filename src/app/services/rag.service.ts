// rag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: any[];
  courseId?: number;
}

export interface ChatResponse {
  response: string;
  sources: any[];
  conversation_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private apiUrl = 'http://localhost:8000/api';
  
  // BehaviorSubject to track messages - initialized with empty array
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  // Store conversation IDs per course
  private conversationIds = new Map<number | undefined, string>();

  constructor(private http: HttpClient) {
    console.log('🔧 RagService initialized');
  }

  addMessage(role: 'user' | 'assistant', content: string, sources: any[] = [], courseId?: number): void {
    const newMessage: ChatMessage = {
      role,
      content,
      timestamp: new Date(),
      sources,
      courseId
    };
    
    // Get current messages and add new one
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = [...currentMessages, newMessage];
    
    console.log('➕ Adding message:', {
      role,
      content: content.substring(0, 50) + '...',
      courseId,
      totalMessages: updatedMessages.length
    });
    
    // Emit updated messages array
    this.messagesSubject.next(updatedMessages);
  }

  sendMessage(message: string, courseId?: number): Observable<ChatResponse> {
    const conversationId = this.conversationIds.get(courseId);
    
    console.log('🚀 Sending to backend:', {
      message,
      courseId,
      conversationId
    });

    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, {
      message,
      course_id: courseId,
      conversation_id: conversationId
    });
  }

  setConversationId(conversationId: string, courseId?: number): void {
    console.log('💾 Setting conversation ID:', { conversationId, courseId });
    this.conversationIds.set(courseId, conversationId);
  }

  clearConversation(courseId?: number): Observable<any> {
    const conversationId = this.conversationIds.get(courseId);
    
    console.log('🗑️ Clearing conversation:', { courseId, conversationId });
    
    // Clear messages for this course
    const currentMessages = this.messagesSubject.value;
    const filteredMessages = currentMessages.filter(msg => msg.courseId !== courseId);
    this.messagesSubject.next(filteredMessages);
    
    // Clear conversation ID
    this.conversationIds.delete(courseId);

    // Clear on backend if conversation exists
    if (conversationId) {
      return this.http.post(`${this.apiUrl}/clear-conversation`, {
        conversation_id: conversationId
      });
    }

    // Return empty observable
    return new Observable(observer => {
      observer.next({});
      observer.complete();
    });
  }

  getMessages(): ChatMessage[] {
    return this.messagesSubject.value;
  }
}
