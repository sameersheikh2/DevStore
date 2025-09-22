import React from 'react'
import { User, Shield, Edit, X } from 'lucide-react'

const ProfileHeader = ({ 
  user, 
  isEditing, 
  onEditToggle 
}) => {
  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {user.displayName || 'Welcome User'}
              </h1>
              <p className="opacity-90 mb-2">{user.email}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Customer Account</span>
                </div>
                <div className={`flex items-center space-x-1 ${user.emailVerified ? 'text-green-200' : 'text-yellow-200'}`}>
                  <span className={`w-2 h-2 rounded-full ${user.emailVerified ? 'bg-green-300' : 'bg-yellow-300'}`}></span>
                  <span>{user.emailVerified ? 'Verified' : 'Not Verified'}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onEditToggle}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader