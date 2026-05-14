import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ToastService } from '../../services/toast';


export interface ToastData {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}