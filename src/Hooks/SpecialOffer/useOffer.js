import axios from 'axios';
import { useEffect, useState } from 'react';

const useOffer = () => {
    const [offers, setOffers] = useState([]);

    /* https://phono-server-production.up.railway.app/ */

    useEffect(() => {
        axios.get(`http://localhost:5000/phonesAp`).then((response) => {
          setOffers(response.data);
        });
      }, []);

   /*  useEffect(() => {
        let isMounted = true;
         try {
            async function callApi() {
                let data = await fetch(`http://localhost:5000/phonesAp`);
                data = await data.json();
                if(isMounted ){
                setOffers(data);
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
    return [offers, setOffers];
};

export default useOffer;