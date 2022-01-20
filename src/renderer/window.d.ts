import { Employee } from 'model/Employee';

declare global {
  interface Window {
    fetchAll(): Promise<Employee[]>;
    generate(): Promise<Employee>;
  }
}
