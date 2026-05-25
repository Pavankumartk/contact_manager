'use client';

import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactTable from './components/ContactTable'
import SearchBar from './components/SearchBar'
import { Contact } from '@/types/contact'
import { contactApi } from '@/lib/api'
import { useToast } from './components/ToastProvider'
import { Plus, Users } from 'lucide-react'

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const { toast } = useToast()

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await contactApi.getAll(searchTerm)
      setContacts(data)
    } catch (error) {
      toast('Failed to fetch contacts', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [searchTerm])

  const handleCreate = async (data: any) => {
    try {
      await contactApi.create(data)
      toast('Contact created successfully!', 'success')
      setIsFormOpen(false)
      fetchContacts()
    } catch (error: any) {
      toast('Failed to create contact', 'error', error.message)
    }
  }

  const handleUpdate = async (id: number, data: any) => {
    try {
      await contactApi.update(id, data)
      toast('Contact updated successfully!', 'success')
      setEditingContact(null)
      fetchContacts()
    } catch (error: any) {
      toast('Failed to update contact', 'error', error.message)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await contactApi.delete(id)
      toast('Contact deleted successfully!', 'success')
      fetchContacts()
    } catch (error: any) {
      toast('Failed to delete contact', 'error', error.message)
    }
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-12">
      {/* Stats Card */}
      <div className="neo-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{contacts.length}</h3>
              <p className="text-foreground/70">Total Contacts</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingContact(null)
              setIsFormOpen(true)
            }}
            className="neo-button px-6 py-3 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Contact</span>
          </button>
           </div>
           </div>

      {/* Search and Filters */}
      <div className="neo-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm}/>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="neo-card p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-foreground/60 mb-6">
              {searchTerm ? 'Try a different search term' : 'Get started by adding your first contact'}
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="neo-button-primary px-6 py-2"
            >
              Add First Contact
            </button>
          </div>
        ) : (
          <ContactTable
            contacts={contacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <ContactForm
          contact={editingContact}
          onSubmit={editingContact ? 
            (data) => handleUpdate(editingContact.id, data) : 
            handleCreate
          }
          onClose={() => {
            setIsFormOpen(false)
            setEditingContact(null)
          }}
        />
      )}
    </div>
  )
}
