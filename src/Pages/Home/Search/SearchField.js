import React, {useState, useEffect} from 'react';
import Header from '../../../Shared/Header/Header';
import Mobile from '../Mobiles/Mobile';
import {Helmet} from "react-helmet";

const SearchField = () => {
    const [categories, setCategories] = useState([]);
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        try {
       async function callApi() {
           let data = await fetch(`https://peaceful-shore-84874.herokuapp.com/mobiles`);
           data = await data.json();
           setMobiles(data);
        //    setCategories(data);
       }
       callApi();
   }
   catch (error) {
       console.log ('error',error);
     }
      
   }, [mobiles]);

   const handleSearch = e =>{
    const searchText = e.target.value;
    const matchedMobiles = mobiles && mobiles?.length > 0 ? mobiles?.filter(mobile=>mobile?.name.toLowerCase().includes(searchText.toLowerCase())) : undefined;
    setCategories(matchedMobiles);
    if (searchText === "") {
        setCategories("");
    }
}
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Phono | Search</title>
                <link rel="canonical" href="/search" />
            </Helmet>
            <Header/>
             <div className="container">
                   
                   <div className="text-center pt-2"> 
                       <h2 className="fw-bold text-primary p-2">Search your favourite phone here</h2>
                       <input placeholder='Enter a mobile name' className='custom-input w-50' type="search" onChange={handleSearch} />
                   </div>
                   <div className="text-center p-3">
                   {
                   categories && categories?.length === 0 ?  <div className="text-center text-danger">{categories?.length} matched</div> : <p className="text-center text-success">{categories?.length} mobile found</p>
                    }
                   </div>
                   <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
                                                {
                                                categories && categories?.length > 0 && categories?.map(mobile => <Mobile
                                                    key={mobile._id}
                                                    mobile={mobile}
                                                />)
                                            }
                                            </div>
            </div>
        </div>
    );
};

export default SearchField;