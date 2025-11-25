// This section will contain the info of all the user that login at the site

const UserManagement =()=>{
const users =[
    {   _id:12345,
        name:"John Doe",
        email:"John12@example.com",
        role:"admin"
    }
]

const handlrolechange =(userId,newRole)=>{
    console.log({id:userId,Role:newRole})

}

const handleDeleteUser =(userId)=>{
    if(window.confirm("Are you sure you want to delete this user")){
        console.log(`deleting user with ID: ${userId}`)
    }
}
    return (
        <>
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            {/* User List Management */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>(
                                <tr key={user._id} className="border-b hover:bg-gray-50
                                ">
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <select name="" id="" value={user.role} onChange={(e)=>handlrolechange(user._id,e.target.value)} className="p-2 border rounded">
                                            <option value="customer">Customer</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="p-4"><button onClick={()=>handleDeleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default UserManagement