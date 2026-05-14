import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  getEmployees(page: number, size: number, dept: string, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (dept) {
      params = params.set('department', dept);
    }

    return this.http.get(this.apiUrl, { params });
  }

  updateSalary(id: number, salary: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/salary`, { salary });
  }
}
