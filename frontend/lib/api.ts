import axios from 'axios'
import { Contact, ContactFormData } from '@/types/contact'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
 (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error('API Error:', message)
    return Promise.reject(new Error(message))
  }
)

export const contactApi = {
  // Get all contacts
  getAll: (search?: string): Promise<Contact[]> => 
    api.get(`/contacts${search ? `?search=${search}` : ''}`),

  // Get single contact
  getOne: (id: number): Promise<Contact> => 
    api.get(`/contacts/${id}`),

  // Create contact
  create: (data: ContactFormData): Promise<Contact> => 
    api.post('/contacts', data),

  // Update contact
  update: (id: number, data: Partial<ContactFormData>): Promise<Contact> => 
    api.patch(`/contacts/${id}`, data),

  // Delete contact
  delete: (id: number): Promise<void> => 
    api.delete(`/contacts/${id}`),
}

export default api
