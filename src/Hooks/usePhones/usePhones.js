import { useEffect, useState } from 'react';

const usePhones = () => {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        try {
            async function callApi() {
                let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/mobiles`);
                data = await data.json();
                setMobiles(data)
            }
            callApi();
        }
        catch (error) {
            console.log ('error',error)
          }
    }, []);
    return [mobiles, setMobiles];
};

export default usePhones;