import { deleteTrack, getTracks } from "@/utils/tracksFunctions";
import { getRedirectError } from "next/dist/client/components/redirect";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const MainPage = () => {

    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTracks = async () => {
        try {
            const response = await getTracks();
            setData(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleEditRecord = (id) => {
        router.push(`/edit?id=${id}`);
      }

    const handleDeleteTrack = async (id) => {
        try {
            const response = await deleteTrack(id);
            if (response?.acknowledged) {
                const newData = data.filter(el => el._id !== id);
                setData(newData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateNewTrack = () => {
        router.push("/create/");
    }

    useEffect(() => {
        fetchTracks();
    }, []);

    if (isLoading) return <Spinner />;

    return (
        <div className="p-4 flex flex-wrap gap-4 "style={{ backgroundColor: '#F3F4F6' }}>
            {data?.map((track) => (

                    <div key={track._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    style={{
                        background: 'linear-gradient(to bottom right, #48BB78, #81E6D9)'}}>

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {track.name}
                        </h5>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {track.description}
                        </p>
                        <button type="button" 
                        onClick={() => handleEditRecord(track._id)}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Update</button>
                        <button type="button"
                            onClick={() => handleDeleteTrack(track._id)}
                            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Delete</button>
                            <div>
         
                     </div>
                     
                    </div>
                    
                
            ))}
               <button type="button"
                onClick={handleCreateNewTrack}
                className="small-button text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Create
            </button>
        </div>

    );
};

export default MainPage;
