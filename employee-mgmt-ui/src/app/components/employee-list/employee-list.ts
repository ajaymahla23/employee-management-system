import { Component, OnInit, signal } from '@angular/core'; // 1. signal import karein
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, EmployeeService } from '../../services/employee';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeListComponent implements OnInit {
  employees = signal<any[]>([]);

  searchDept = '';
  page = 0;
  size = 7;
  sortBy = 'id';
  sortDir = 'asc';

  totalPages = 0;

  editingEmployeeId: number | null = null;
  updatedSalaryValue: number = 0;

  constructor(
    private service: EmployeeService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    const sortParam = `${this.sortBy},${this.sortDir}`;
    this.service
      .getEmployees(this.page, this.size, this.searchDept, sortParam)
      .subscribe((data) => {
        // 3. Signal update karne ke liye .set() function use karein
        this.employees.set(data.content || []);
        this.totalPages = data.totalPages;
        // console.log('Total Pages calculated by backend:', this.totalPages);
      });
  }

  startEdit(employee: any) {
    this.editingEmployeeId = employee.id;
    this.updatedSalaryValue = employee.salary;
  }

  cancelEdit() {
    this.editingEmployeeId = null;
  }

  saveSalary(id: number) {
    if (this.updatedSalaryValue <= 0) {
      // alert('Validation Error: Salary must be greater than 0');
      this.toast.show('Salary must be greater than 0', 'error');
      return;
    }
    this.service.updateSalary(id, this.updatedSalaryValue).subscribe(() => {
      this.editingEmployeeId = null;
      this.toast.show('Monthly compensation updated!', 'success');
      this.loadEmployees();
    });
  }

  sortData(column: string) {
    this.sortDir = this.sortBy === column && this.sortDir === 'asc' ? 'desc' : 'asc';
    this.sortBy = column;
    this.loadEmployees();
  }

  // Next/Previous bounds validation control
  changePage(val: number) {
    const targetPage = this.page + val;
    if (targetPage >= 0 && targetPage < this.totalPages) {
      this.page = targetPage;
      this.loadEmployees();
    }
  }
}
