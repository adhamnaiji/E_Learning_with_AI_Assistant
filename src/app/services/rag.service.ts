import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{
    course_id: number;
    title: string;
    content: string;
  }>;
}

export interface ChatResponse {
  response: string;
  sources: Array<{
    course_id: number;
    title: string;
    content: string;
  }>;
  conversation_id: string;
}

export interface SearchResult {
  course_id: number;
  title: string;
  description: string;
  relevance_score: number;
}

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private apiUrl = 'http://localhost:8000/api';
  // Track conversation IDs per course so chat context stays tied to the right course.
  private conversationIds = new Map<number, string>();
  // Fallback conversation id for non-course chats
  private fallbackConversationId: string | null = null;
  // Messages stored per-course; fallback for non-course chats
  private messagesByCourse = new Map<number, ChatMessage[]>();
  private fallbackMessages: ChatMessage[] = [];

  // The active course id determines what messages are emitted via messages$
  private activeCourseId: number | null = null;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  /**
   * Make a specific course the active context for emitted messages.
   * Pass `undefined` or null to switch to fallback (non-course) messages.
   */
  setActiveCourse(courseId?: number | null): void {
    this.activeCourseId = typeof courseId === 'number' ? courseId : null;
    if (this.activeCourseId !== null) {
      const msgs = this.messagesByCourse.get(this.activeCourseId) || [];
      this.messagesSubject.next([...msgs]);
    } else {
      this.messagesSubject.next([...this.fallbackMessages]);
    }
  }


  constructor(private http: HttpClient) {}

  sendMessage(message: string, courseId?: number, courseContext?: any): Observable<ChatResponse> {
    // If a courseId is provided, use the mapped conversation id for that course (if any).
    const convId = typeof courseId === 'number' ? this.conversationIds.get(courseId) ?? this.fallbackConversationId : this.fallbackConversationId;

    const payload: any = {
      message: message,
      course_id: courseId,
      conversation_id: convId
    };

    if (courseContext) {
      payload.course_context = courseContext;
    }

    return this.http.post<ChatResponse>(`${this.apiUrl}/chat`, payload);
  }

  addMessage(role: 'user' | 'assistant', content: string, sources?: any[], courseId?: number): void {
    const message: ChatMessage = {
      role,
      content,
      timestamp: new Date(),
      sources: sources || []
    };

    if (typeof courseId === 'number') {
      const msgs = this.messagesByCourse.get(courseId) || [];
      msgs.push(message);
      this.messagesByCourse.set(courseId, msgs);
      if (this.activeCourseId === courseId) {
        this.messagesSubject.next([...msgs]);
      }
    } else {
      this.fallbackMessages.push(message);
      if (this.activeCourseId === null) {
        this.messagesSubject.next([...this.fallbackMessages]);
      }
    }
  }

  getMessages(courseId?: number): ChatMessage[] {
    if (typeof courseId === 'number') {
      return this.messagesByCourse.get(courseId) || [];
    }
    return this.fallbackMessages;
  }

  /**
   * Associate a conversation id with a specific course, or set fallback for non-course chats.
   * If courseId is provided it will store the mapping for that course.
   */
  setConversationId(id: string, courseId?: number): void {
    if (typeof courseId === 'number') {
      this.conversationIds.set(courseId, id);
    } else {
      this.fallbackConversationId = id;
    }
  }

  /**
   * Clear the conversation for a specific course (if courseId provided) or the fallback conversation.
   */
  clearConversation(courseId?: number): Observable<any> {
    if (typeof courseId === 'number' && this.conversationIds.has(courseId)) {
      const convId = this.conversationIds.get(courseId)!;
      const result = this.http.delete(`${this.apiUrl}/conversation/${convId}`);
      this.conversationIds.delete(courseId);
      this.messagesSubject.next([]);
      return result;
    }

    if (this.fallbackConversationId) {
      const result = this.http.delete(`${this.apiUrl}/conversation/${this.fallbackConversationId}`);
      this.fallbackConversationId = null;
      this.messagesSubject.next([]);
      return result;
    }

    this.messagesSubject.next([]);
    // emit a single null value and complete — matches Observable<any>
    return of(null);
  }

  semanticSearch(query: string, topK: number = 5, category?: string): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(`${this.apiUrl}/search`, {
      query,
      top_k: topK,
      category
    });
  }

  indexCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/index-course`, courseData);
  }
}
