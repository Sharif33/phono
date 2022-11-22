import axios from 'axios';
import { useEffect, useState } from 'react';

const useCoupons = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
      axios.get(`https://phono-server.vercel.app/coupons`).then((response) => {
        setCoupons(response.data);
      });
    }, []);

   /*  useEffect(() => {
        let isMounted = true;  
          try {
            async function callApi() {
                let data = await fetch(`https://phono-server.vercel.app/coupons`);
                data = await data.json();
                if(isMounted ){ 
                setCoupons(data);
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
    return [coupons, setCoupons];
};

export default useCoupons;