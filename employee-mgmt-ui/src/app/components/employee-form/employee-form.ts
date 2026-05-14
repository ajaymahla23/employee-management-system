import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeFormComponent {
  emp: Employee = { name: '', email: '', department: '', salary: 0 };

  globalErrorMessage: string | null = null;
  fieldErrors: any = {};

  constructor(
    private service: EmployeeService,
    private router: Router,
    private toast: ToastService, 
    private cdr: ChangeDetectorRef,
  ) {}
  save() {
    this.globalErrorMessage = null;
    this.fieldErrors = {};
    this.cdr.detectChanges();

    let hasFrontendError = false;

    if (!this.emp.name || this.emp.name.trim() === '') {
      this.fieldErrors.name = 'Full Name cannot be blank.';
      hasFrontendError = true;
    }

    if (!this.emp.email || this.emp.email.trim() === '') {
      this.fieldErrors.email = 'Email Address cannot be blank.';
      hasFrontendError = true;
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(this.emp.email)) {
        this.fieldErrors.email = 'Please enter a valid email address structure.';
        hasFrontendError = true;
      }
    }

    if (this.emp.salary === undefined || this.emp.salary === null || this.emp.salary <= 0) {
      this.fieldErrors.salary = 'Salary must be greater than 0.';
      hasFrontendError = true;
    }


    if (hasFrontendError) {
      // this.globalErrorMessage = 'Validation Failed. Please correct the fields highlighted below.';
      // this.toast.show('Validation Failed', 'error'); // Toast popup message
      this.cdr.detectChanges();
      return; 
    }

    this.service.createEmployee(this.emp).subscribe({
      next: () => {
        // alert('Employee registered successfully!');
        this.toast.show('Employee registered successfully!', 'success');
        setTimeout(() => this.router.navigate(['/list']), 500);
        this.router.navigate(['/list']);
      },
      // error: (err) => alert(err.error?.message || 'Check fields (Email must be unique)'),
      error: (err) => {
        this.toast.show('Validation Failed. Please correct fields.', 'error'); // Error toast
        console.error('Error payload from backend: ', err);
        if (err.status === 400) {
          const backendError = err.error;

          if (backendError) {
            this.globalErrorMessage = backendError.message || 'Validation Failed';
            // Field-wise errors ({ name: '...', email: '...' }) ko map karein
            if (backendError.errors) {
              this.fieldErrors = backendError.errors;
            }
          }
        } else {
          this.globalErrorMessage = 'Something went wrong. Please try again later.';
        }
      },
    });
  }
}
