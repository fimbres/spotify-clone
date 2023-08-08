import AccountContent from '@/components/AccountContent';
import Header from '@/components/Header';
import React from 'react'

const Account = () => {
  return (
    <div 
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header bgColor="bg-gradient-to-b from-neutral-700 to-transparent">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  )
}

export default Account;