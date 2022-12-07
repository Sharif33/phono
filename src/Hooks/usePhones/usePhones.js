import axios from 'axios';
import { useEffect, useState } from 'react';

const usePhones = () => {
    const [mobiles, setMobiles] = useState([]);

    function shuffle(arra1) {
      let ctr = arra1.length;
      let temp;
      let index;
  
      // While there are elements in the array
      while (ctr > 0) {
  // Pick a random index
          index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
          ctr--;
  // And swap the last element with it
          temp = arra1[ctr];
          arra1[ctr] = arra1[index];
          arra1[index] = temp;
      }
      return arra1;
  }
 shuffle(mobiles);
//  console.log(shuffle(mobiles));
    useEffect(() => {
      axios.get(`https://phono-server-production.up.railway.app/mobiles`).then((response) => {
        setMobiles(response.data);
      });
    }, []);

    /* useEffect(() => {
        let isMounted = true;
       
          try {
            async function callApi() {
                let data = await fetch(`https://phono-server-production.up.railway.app/mobiles`);
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