import Spinner from '@/components/Spinner';
import TrackForm from '@/components/TrackForm';
import { defaultTrackValues } from '@/utils/constants';
import { getTrack, updateTrack } from '@/utils/tracksFunctions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Edit = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [entry, setEntry] = useState(defaultTrackValues);
  
    const handleGetTrack = async (id) => {
      try {
          const response = await getTrack(id);
  
          if (response) {
              setEntry(response);
              setIsLoading(false);
          }
      } catch (error) {
          console.log(error);
          setIsLoading(false);
      }
    }
  
    const onSubmit = async (data) => {
      try {
          const response = await updateTrack(data);
  
          if (response) {
              router.push("/");
          }
      } catch (error) {
          console.log(error)
      }
    }
  
    useEffect(() => {
      const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
      const id = searchParams.get("id");
  
      if (!id) {
          router.push("/");
      }
  
      handleGetTrack(id);
    }, []);
  
    if (isLoading) return <Spinner />;
  
    return <TrackForm entry={entry} onSubmit={onSubmit} />;
}

export default Edit;
