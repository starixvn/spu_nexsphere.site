import axios from 'axios';
import { User } from './definitions';

export async function fetchCustomers() {
  try {
    const response = await axios.get('http://localhost:3000/customers');
    const customers = response.data;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


export async function getUser(email: string): Promise<User | undefined> {
  try {
    const url = `http://localhost:3000/api/users/${email}`;
    const response = await axios.get(url);
    const data = response.data;

    const user: User = {
      id: data.id,
      name: data.name,
      role: data.role,
      email: data.email,
      password: data.password,
      permission: data.permission
    };
    return user;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}