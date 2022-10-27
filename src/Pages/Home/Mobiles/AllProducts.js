import React from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import usePhones from '../../../Hooks/usePhones/usePhones';
import { numberFormat } from '../../../Shared/numberFormat';

const AllProducts = () => {
    const [mobiles] = usePhones();
    return (
        <div>
            <section className="container pb-4 pb-md-5">
            <div className="row">
                <div className="col-md-4 col-sm-6 mb-2 py-3">
                    <div>
                        <h4 className='text-navi'>Bestsellers</h4>
                    </div>
                    {
                        mobiles?.slice(0,5).map(mobile=>
                        <div key={mobile?._id}>
                        <NavHashLink to={`/mobile/${mobile?._id}#details`}>
                         <div className="d-flex align-items-center border-bottom py-2">
                            <img className='pb-2 my-auto' style={{width:"2.3rem"}} src={mobile?.image} alt="" />
                        <div className="saleFont ps-5 pt-2">
                            <p className="saleH fw-bold">{mobile?.name}</p>
                            <p className="text-accent"><span style={{fontFamily: 'Noto Sans Bengali'}}>&#x9F3;</span>{numberFormat(mobile?.price).slice(3,-3) }.<small>00</small></p>
                        </div>
                    </div>   
                   </NavHashLink>
                    </div>
                            )
                    }
                     <div>
                     <Link to={`/mobiles`}>
                        <button className="btn btn-outline-danger btn-sm mt-2">View more...</button>
                     </Link>
                    </div>  
                </div>
                <div className="col-md-4 col-sm-6 mb-2 py-3">
                    <div>
                        <h4 className='text-navi'>Top Prices</h4>
                    </div>
                    {
                        mobiles?.sort((a,b)=>a.price<b.price ? 1 : -1).slice(0,5).map(mobile=>
                            
                            <div key={mobile?._id}>
                                 <NavHashLink to={`/mobile/${mobile?._id}#details`}>
                         <div className="d-flex align-items-center border-bottom py-2">
                            <img className='pb-2 my-auto' style={{width:"2.3rem"}} src={mobile?.image} alt="" />
                        <div className="saleFont ps-5 pt-2">
                            <p className="saleH fw-bold">{mobile?.name}</p>
                            <p className="text-accent"><span style={{fontFamily: 'Noto Sans Bengali'}}>&#x9F3;</span>{numberFormat(mobile?.price).slice(3,-3) }.<small>00</small></p>
                        </div>
                    </div>   
                   </NavHashLink>
                    </div>
                            )
                    }
                     <div>
                     <Link to={`/mobiles`}>
                        <button className="btn btn-outline-danger btn-sm mt-2">View more...</button>
                     </Link>
                    </div>  
                </div>
                <div className="col-md-4 col-sm-6 mb-2 py-3">
                    <div>
                        <h4 className='text-navi'>Top Rated</h4>
                    </div>
                    {
                        mobiles?.slice(-5).map(mobile=>
                            
                            <div key={mobile?._id}>
                                 <NavHashLink to={`/mobile/${mobile?._id}#details`}>
                         <div className="d-flex align-items-center border-bottom py-2">
                            <img className='pb-2 my-auto' style={{width:"2.3rem"}} src={mobile?.image} alt="" />
                        <div className="saleFont ps-5 pt-2">
                            <p className="saleH fw-bold">{mobile?.name}</p>
                            <p className="text-accent"><span style={{fontFamily: 'Noto Sans Bengali'}}>&#x9F3;</span>{numberFormat(mobile?.price).slice(3,-3) }.<small>00</small></p>
                        </div>
                    </div>   
                   </NavHashLink>
                    </div>
                            )
                    }
                     <div>
                     <Link to={`/mobiles`}>
                        <button className="btn btn-outline-danger btn-sm mt-2">View more...</button>
                     </Link>
                    </div>  
                </div>
                
            </div>
        </section>
        </div>
    );
};

export default AllProducts;