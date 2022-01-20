import { Employee } from 'model/Employee';
import { Subject } from 'rxjs';

declare global {
  interface Window {
    fetchAll(): Subject<Employee[]>;
    generate(): Promise<Employee>;
  }
}
