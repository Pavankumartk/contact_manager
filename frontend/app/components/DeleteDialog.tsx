'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { AlertTriangle } from 'lucide-react'
import { Contact } from '@/types/contact'

interface DeleteDialogProps {
  contact: Contact | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteDialog({ contact, isOpen, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 neo-card p-6 w-full max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-danger" />
            <AlertDialog.Title className="text-lg font-semibold">
              Delete Contact
            </AlertDialog.Title>
          </div>
          
          <AlertDialog.Description className="text-foreground/70 mb-6">
            Are you sure you want to delete <strong>{contact?.full_name}</strong>? 
            This action cannot be undone.
          </AlertDialog.Description>

          <div className="flex gap-3 justify-end">
            <AlertDialog.Cancel asChild>
              <button
                onClick={onClose}
                className="neo-button px-4 py-2"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="neo-button-danger px-4 py-2"
              >
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
