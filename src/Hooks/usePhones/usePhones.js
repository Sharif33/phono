import { useEffect, useState } from 'react';

const usePhones = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        let isMounted = true;
       
          try {
            async function callApi() {
                let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/mobiles`);
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
       
        
    }, []);
    return [mobiles, setMobiles];
};

export default usePhones;