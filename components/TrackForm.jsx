import React, { useState } from 'react';
import { useRouter } from "next/router";

const TrackForm = (props) => {
    const router = useRouter();
    const {entry, onSubmit} = props;
    const [data, setData] = useState(entry);
    const handleChange =(type, value) =>{
        setData({...data, [type]:value})
    }
    const handleCancel = () => {
        router.push("/");
      }

    console.log(data);
    return (
        <div className="p-4">
        <div className="bg-gradient-to-r from-blue-200 via-cyan-300 to-green-400 p-4 rounded-lg shadow-md">
        <div className="flex flex-col mx-auto max-w-80 border p-4 shadow-sm gap-4 w-full"
        style={{
            background: 'linear-gradient(to bottom right, #48BB78, #81E6D9)'}}>
        <div className="text-center font-bold text-xl">{entry._id ? 'Update' : 'Create new'} Track</div>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="name"
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name placeholder"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCancel}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(data)}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {entry?._id ? "Update" : "Create"}
          </button>
        </div>
      </div>
        </div>
        </div>
        
    )
}

export default TrackForm
