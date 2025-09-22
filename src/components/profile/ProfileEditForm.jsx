import React from 'react'
import { Lock, Save } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from '../ui/Button'

const ProfileEditForm = ({ 
  editData, 
  onChange, 
  onSubmit, 
  onCancel, 
  isUpdating 
}) => {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Edit Profile Information
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={editData.firstName}
              onChange={onChange}
              className="input"
              placeholder="Enter your first name"
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={editData.lastName}
              onChange={onChange}
              className="input"
              placeholder="Enter your last name"
              disabled={isUpdating}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="currentPassword"
              value={editData.currentPassword}
              onChange={onChange}
              className="input pl-10"
              placeholder="Enter your current password to confirm changes"
              disabled={isUpdating}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <PrimaryButton
            type="submit"
            disabled={isUpdating}
            className="flex items-center space-x-2"
          >
            {isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </PrimaryButton>

          <SecondaryButton
            type="button"
            onClick={onCancel}
            disabled={isUpdating}
          >
            Cancel
          </SecondaryButton>
        </div>
      </form>
    </div>
  )
}

export default ProfileEditForm