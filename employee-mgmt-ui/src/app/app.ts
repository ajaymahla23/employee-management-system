import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('employee-mgmt-ui');
}
