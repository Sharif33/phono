// import { CircularProgress } from '@mui/material';
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import useOffer from '../../../Hooks/SpecialOffer/useOffer';
import usePhones from '../../../Hooks/usePhones/usePhones';
import { numberFormat } from '../../../Shared/numberFormat';
import { AiOutlineDown } from "react-icons/ai";
import Offer from './Offer';
import { BsChevronDoubleRight } from "react-icons/bs";

const Offers = () => {
    const [offers] = useOffer();
    const [mobiles] = usePhones();
    const lastUpdate = mobiles.slice(-1).pop();

    /* See more offer section */
    const offerPerPage = 6;
    const [next, setNext] = useState(offerPerPage);

    return (
        <div className="container-fluid">
            <div className="row pt-4 flex-sm-row-reverse m-auto"> 
            <h1 className='fw-bold text-center text-navi py-3'>Shop all latest offers and innovations</h1>
                  {/* offer */}
                <div className="col-md-9 col-sm-12">
                   
            <div className="row row-cols-1 row-cols-md-3 m-2 g-4">
                    {
                        offers?.slice(0, next)?.map(offer => <Offer
                            key={offer._id}
                            offer={offer}
                        />)
                    }
                </div>
                <div className="text-center">
                    {
                         next < offers?.length ? <button className='btn btn-lg btn-cart rounded-0' onClick={()=>setNext(next + offerPerPage)}>Load more <AiOutlineDown/> </button> : <p className='text-pink'>No more offer</p>
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
                    {
                        mobiles?.slice(-6,-1).reverse().sort((a,b)=>a.price<b.price ? 1 : -1).map(mobile=> <ul className="list-group"
                        key={mobile?._id}
                        >
                        <li className="list-group-item d-flex justify-content-between align-items-center rounded-0"> <span><Link title='See Details' to={`/mobile/${mobile?._id}`}> <img style={{width:"2.5rem"}} className='img-fluid' src={mobile?.image} alt="" /> </Link></span>
                        <small>{mobile?.name}</small>
                        <span className="text-navi"> <span style={{fontFamily: 'Noto Sans Bengali'}}>&#x9F3;</span>{numberFormat(mobile?.price).slice(3,-3)}</span>
                        </li>
                            
                        </ul>)
                    }
                   
                </div> 
                    <div className='text-center py-2'>
                        <Link to={`/mobiles`}>New Arrival <span><BsChevronDoubleRight/></span></Link>
                    </div>
                </div> 
            </div>  
        </div> 
    );
};

export default Offers;