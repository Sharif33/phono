import { useEffect, useState } from 'react';

const useOffer = () => {
    const [offers, setOffers] = useState([]);
    useEffect(() => {
        let isMounted = true;
        if(isMounted ){
         try {
            async function callApi() {
                let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/phones`);
                data = await data.json();
                setOffers(data)
            }
            callApi();
        }
        catch (error) {
            console.log ('error',error)
          }   
        };
        return () => {
            isMounted = false;
            };  
    }, []);
    return [offers, setOffers];
};

export default useOffer;