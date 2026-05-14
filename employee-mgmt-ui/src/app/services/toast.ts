import { Injectable, signal } from '@angular/core';

export interface ToastData {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<ToastData>({ message: '', type: 'success', visible: false });

  show(message: string, type: 'success' | 'error' = 'success') {
    this.toast.set({ message, type, visible: true });

    // 3 seconds baad automatic hide karein
    setTimeout(() => {
      this.toast.set({ message: '', type: 'success', visible: false });
    }, 3000);
  }
}
