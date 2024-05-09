export const getTracks = async () => {
    try {
        const response = await fetch('/api/tracks', {
            method: 'GET',
        })
        const data = await response.json();
        if(!data){
            return [];
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getTrack = async (id) => {
    try {
      const response = await fetch(`/api/tracks?id=${id}`, {
        method: "GET",
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createTrack = async (entry) => {
    try {
      const response = await fetch("/api/tracks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateTrack = async (entry) => {
      try {
          const response = await fetch('/api/tracks', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(entry)
          });
  
          const data = await response.json();
  
          return data;
      } catch (error) {
          console.log(error)
      }
  }
  
  export const deleteTrack = async (id) => {
    try {
      const response = await fetch(`/api/tracks?id=${id}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };