import axios from 'axios';
import { useEffect, useState } from 'react';

const usePhones = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
      axios.get(`https://phono-server.vercel.app/mobiles`).then((response) => {
        setMobiles(response.data);
      });
    }, []);

    /* useEffect(() => {
        let isMounted = true;
       
          try {
            async function callApi() {
                let data = await fetch(`https://phono-server.vercel.app/mobiles`);
                data = await data.json();
                if(isMounted ){ 
                setMobiles(data);
                 }
            }
            callApi(); 
            return () => {
            isMounted = false;
            };
        }
        catch (error) {
            console.log ('error',error)
          }  
       
        
    }, []); */
    return [mobiles, setMobiles];
};

export default usePhones;