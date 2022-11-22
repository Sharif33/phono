import axios from 'axios';
import { useEffect, useState } from 'react';

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    // console.log(reviews);

    useEffect(() => {
        axios.get(`https://phono-server.vercel.app/reviews`).then((response) => {
          setReviews(response.data);
        });
      }, []);

   /*  useEffect(() => {
        let isMounted = true;
        if(isMounted ){
         try {
            async function callApi() {
                let data = await fetch(`https://phono-server.vercel.app/reviews`);
                data = await data.json();
                setReviews(data)
            }
            callApi();
        }
        catch (error) {
            console.log ('error',error)
          }   
        }
        return () => {
            isMounted = false;
            };
        
    }, []); */
    return [reviews, setReviews];
};

export default useReviews;