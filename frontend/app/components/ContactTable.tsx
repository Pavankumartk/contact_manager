'use client';

import { useState } from 'react'
import { format } from 'date-fns'
import { Contact } from '@/types/contact'
import { Edit2, Trash2, Phone, Mail, Building, MapPin } from 'lucide-react'
import StatusBadge from './StatusBadge'
import DeleteDialog from './DeleteDialog'

interface ContactTableProps {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (id: number) => void
}

export default function ContactTable({ contacts, onEdit, onDelete }: ContactTableProps) {
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Contact Info</th>
              <th className="text-left py-3 px-4 font-semibold">Company</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Created</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <h3 className="font-semibold">{contact.full_name}</h3>
                    {contact.job_title && (
                      <p className="text-sm text-foreground/70">{contact.job_title}</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-foreground/50" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-foreground/50" />
                      <span className="text-sm">{contact.mobile}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {contact.company_name ? (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-foreground/50" />
                      <span>{contact.company_name}</span>
                    </div>
                  ) : (
                    <span className="text-foreground/50">-</span>
                  )}
                  {contact.city && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-foreground/70">
                      <MapPin className="w-4 h-4" />
                      <span>{contact.city}</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={contact.status} />
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground/70">
                    {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(contact)}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                      title="Edit contact"
                    >
                      <Edit2 className="w-4 h-4 text-primary" />
                    </button>
                    <button
                      onClick={() => setContactToDelete(contact)}
                      className="p-2 rounded-lg hover:bg-danger/10 transition-colors"
                      title="Delete contact"
                    >
                      <Trash2 className="w-4 h-4 text-danger" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteDialog
        contact={contactToDelete}
        isOpen={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        onConfirm={() => {
          if (contactToDelete) {
            onDelete(contactToDelete.id)
            setContactToDelete(null)
          }
        }}
      />
    </>
  )
}
