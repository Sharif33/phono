import { useEffect, useState } from 'react';

const useCoupons = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        let isMounted = true;  
          try {
            async function callApi() {
                let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/coupons`);
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
       
        
    }, []);
    return [coupons, setCoupons];
};

export default useCoupons;