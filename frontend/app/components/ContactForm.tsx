'use client';

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Contact, ContactFormData } from '@/types/contact'

interface ContactFormProps {
  contact?: Contact | null
  onSubmit: (data: ContactFormData) => void
  onClose: () => void
}

export default function ContactForm({ contact, onSubmit, onClose }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    defaultValues: contact ? {
      full_name: contact.full_name,
      email: contact.email,
      mobile: contact.mobile,
      company_name: contact.company_name || '',
      job_title: contact.job_title || '',
      city: contact.city || '',
      status: contact.status
    } : {
      status: 'active'
    }
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="neo-card p-6 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {contact ? 'Edit Contact' : 'Add New Contact'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                {...register('full_name', { required: 'Full name is required' })}
                className="neo-input w-full px-4 py-2"
                placeholder="Enter full name"
              />
              {errors.full_name && <p className="text-danger text-sm mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                })}
                className="neo-input w-full px-4 py-2"
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mobile *</label>
              <input
                {...register('mobile', { 
                  required: 'Mobile number is required',
                  pattern: { value: /^[0-9+\-\s()]+$/, message: 'Invalid mobile number format' }
                })}
                className="neo-input w-full px-4 py-2"
                placeholder="Enter mobile number"
              />
              {errors.mobile && <p className="text-danger text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input {...register('company_name')} className="neo-input w-full px-4 py-2" placeholder="Enter company name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <input {...register('job_title')} className="neo-input w-full px-4 py-2" placeholder="Enter job title" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input {...register('city')} className="neo-input w-full px-4 py-2" placeholder="Enter city" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select {...register('status')} className="neo-input w-full px-4 py-2">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 neo-button-primary py-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : contact ? 'Update Contact' : 'Add Contact'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 neo-button py-3 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}