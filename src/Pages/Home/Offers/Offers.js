// import { CircularProgress } from '@mui/material';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import useOffer from '../../../Hooks/SpecialOffer/useOffer';
import usePhones from '../../../Hooks/usePhones/usePhones';
import { numberFormat } from '../../../Shared/numberFormat';
import { AiOutlineDown } from "react-icons/ai";
import Offer from './Offer';

const Offers = () => {
    const [offers] = useOffer();
    const [mobiles] = usePhones();
    const lastUpdate = mobiles.slice(-1).pop();

    /* See more offer section */
    const offerPerPage = 6;
    // let arrayForHoldingStories = [];
    const [seeMore, setSeeMore] = useState([]);
    const [next, setNext] = useState(6);
  
    const loopWithSlice = () => {    
    
      const toShow = offers.slice(
        seeMore.length,
        seeMore.length + offerPerPage
      );
      setSeeMore([...seeMore, ...toShow]);
    };
  
    useEffect(() => {
      if (offers) {
        setSeeMore(offers.slice(0, offerPerPage));
      }
    }, [offers]);
  
    const handleShowMorePosts = () => {
      let loadedMore = next + offerPerPage;
      loopWithSlice(next, loadedMore);
      setNext(next + offerPerPage);
    };
   /*  console.log("next", next);
    console.log("offerPerPage", offerPerPage);
    console.log("loopWithSlice", loopWithSlice);
    console.log("arrayForHoldingStories", arrayForHoldingStories);
    console.log("seeMore", seeMore); */

    return (
        <div className="container-fluid">
            <div className="row pt-4 flex-sm-row-reverse m-auto"> 
            <h1 className='fw-bold text-center py-3'>Limited Time <span className='text-primary'>Offer</span></h1>
                  {/* offer */}
                <div className="col-md-9 col-sm-12">
                   
            <div className="row row-cols-1 row-cols-md-3 m-2 g-4">
                    {
                        seeMore?.map(offer => <Offer
                            key={offer._id}
                            offer={offer}
                        />)
                    }
                </div>
                <div className="text-center">
                    {
                        seeMore?.length < next ? "No more offer" : <button className='btn  text-danger btn-hover' onClick={handleShowMorePosts}>See more <AiOutlineDown/> </button>
                    }
                </div>
                </div>
                <div className="col-md-3 mx-auto">
                   
                    <div style={{backgroundColor:"#EEF2FF"}} className=' text-center mx-3 mt-3 py-3 rounded-top'>
                        <Link style={{textDecoration:"none"}} to={`/mobile/${lastUpdate?._id}`}> 
                        <img style={{ height: "30vh" }} src={lastUpdate?.image} className="img-fluid" alt="" />
                        <h6 className='py-3'> {lastUpdate?.name} </h6>
                        </Link>
                       
                    </div>
                <div style={{backgroundColor:"#EEF2FF"}}className=' mx-3 pt-3 rounded-bottom'> 
                    {/* <h3 className='fw-bold text-center'>Latest <span className='text-primary'>Mobiles</span></h3> */}
                    {
                        mobiles?.slice(-5,-1).reverse().sort((a,b)=>a.price<b.price ? 1 : -1).map(mobile=> <ul className="list-group"
                        key={mobile?._id}
                        >
                        <li className="list-group-item d-flex justify-content-between align-items-center rounded-0"> <span><Link title='See Details' to={`/mobile/${mobile?._id}`}> <img style={{width:"2.5rem"}} className='img-fluid' src={mobile?.image} alt="" /> </Link></span>
                        <small>{mobile?.name}</small>
                        <span className="text-success">{numberFormat(mobile?.price).slice(3,-3)}Tk</span>
                        </li>
                            
                        </ul>)
                    }
                   
                </div> 
                    <div className='text-center py-2'>
                        <Link to={`/mobiles`}>New Arrival</Link>
                    </div>
                </div> 
            </div>  
        </div> 
    );
};

export default Offers;