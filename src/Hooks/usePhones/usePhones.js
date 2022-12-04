import axios from 'axios';
import { useEffect, useState } from 'react';

const usePhones = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:5000/mobiles`).then((response) => {
        setMobiles(response.data);
      });
    }, []);

    /* useEffect(() => {
        let isMounted = true;
       
          try {
            async function callApi() {
                let data = await fetch(`http://localhost:5000/mobiles`);
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