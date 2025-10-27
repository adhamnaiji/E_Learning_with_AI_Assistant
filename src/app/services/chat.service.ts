import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CourseContext {
  id: string;
  title?: string;
  description?: string;
  // optionally: fullCourseText?: string; // if you have large textual course content
}

export interface ChatRequest {
  message: string;
  conversationId?: string; // optional if you keep multi-turn state
  course?: CourseContext;
}

export interface ChatResponse {
  reply: string;
  // optionally: updatedConversationId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiBase = 'http://localhost:8000'; // change to your backend
  constructor(private http: HttpClient) {}

  sendMessage(message: string, course?: CourseContext, conversationId?: string): Observable<ChatResponse> {
    const payload: ChatRequest = {
      message,
      conversationId,
      course
    };
    return this.http.post<ChatResponse>(`${this.apiBase}/chat`, payload);
  }
}
