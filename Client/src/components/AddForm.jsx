
export const AddForm = () => {
  return (
    <>
    <form className="flex flex-col gap-5">
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client ID"
        />
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client Name"
        />
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client Address"
        />
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client Phone Number"
        />
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client Contact Number"
        />
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client Gurantee-1 Name"
        />
        <input
            type="text"
            className="w-52 h-6 bg-slate-500 text-blue-700 rounded-full my-2 px-5"
            placeholder="Enter Client Gurantee-2 Name"
        />
        <button className="rounded-lg bg-green-600 flex flex-row justify-center p-2">
            Add User
        </button>
    </form>
    </>
  )
}
