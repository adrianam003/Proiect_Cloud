import TrackForm from '@/components/TrackForm';
import { defaultTrackValues } from '@/utils/constants'
import { createTrack } from '@/utils/tracksFunctions';
import { useRouter } from 'next/router';
import React from 'react'

const Create = () => {

    const router = useRouter();
    const entry = defaultTrackValues;
    const onSubmit = async (data) => {
        try {
            const response = await createTrack(data);
            if(response){
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <TrackForm entry = {entry} onSubmit={onSubmit} />
  )
}

export default Create
