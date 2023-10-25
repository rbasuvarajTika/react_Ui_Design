import React from 'react'
import Create_New_User from '../../components/admin_page/Create_New_User'

const Admin_Create_New_User = () => {
  return (
    <div className="w-ful pt- relative overflow-x-auto rounded-xl bg-white p-1  overflow-y-scroll max-h-[630px vsm:h-[calc(100%-4rem)] h-[calc(100%-6rem)] no-scrollbar">
        <Create_New_User />
    </div>
  )
}

export default Admin_Create_New_User