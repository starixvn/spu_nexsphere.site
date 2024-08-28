import axios from 'axios';

export async function fetchCustomers() {
  try {
    const response = await axios.get('http://localhost:8000/customers');
    const customers = response.data;
    
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
