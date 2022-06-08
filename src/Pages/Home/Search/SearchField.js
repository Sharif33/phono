import React, {useState} from 'react';
import Header from '../../../Shared/Header/Header';
import Mobile from '../Mobiles/Mobile';
import {Helmet} from "react-helmet";
import usePhones from '../../../Hooks/usePhones/usePhones';

const SearchField = () => {
    const [categories, setCategories] = useState([]);
    const[mobiles]=usePhones();

   const handleSearch = e =>{
    const searchText = e.target.value;
    const matchedMobiles = mobiles && mobiles?.length > 0 ? mobiles?.filter(mobile=>mobile?.name.toLowerCase().includes(searchText.toLowerCase())) : undefined;
    setCategories(matchedMobiles);
    if (searchText === "") {
        setCategories([]);
    }else{
        setCategories(matchedMobiles)
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
                       <p className="fw-bold text-primary p-2">Search your favourite phone here</p>
                       <input placeholder='Enter a mobile name' className='custom-input' type="search" onChange={handleSearch} />
                   </div>
                   <div className="text-center p-3">
                   {
                  categories?.length > 0 && <div className="text-center text-primary">{categories?.length} result found</div>
                    }
                   </div>
                   <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
                                                {
                                                categories?.length !== 0 && categories?.map(mobile => <Mobile
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