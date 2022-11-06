import { useEffect, useState } from 'react';

const useOffer = () => {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        let isMounted = true;
         try {
            async function callApi() {
                let data = await fetch(`https://phono-server-production.up.railway.app/phonesAp`);
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
    }, []);
    return [offers, setOffers];
};

export default useOffer;