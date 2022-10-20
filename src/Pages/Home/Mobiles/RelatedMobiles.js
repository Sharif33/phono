import React from 'react';
import { MdOutlineCompareArrows, MdAddShoppingCart, MdOutlineFavoriteBorder } from "react-icons/md";
// import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/slices/cartSlice";
import { addToFvrt } from "../../../Redux/slices/fvrtSlice";
import { addToCompare } from '../../../Redux/slices/compareSlice';
import { numberFormat } from "../../../Shared/numberFormat";

const RelatedMobiles = ({relatedPd}) => {
    const dispatch = useDispatch();
    return (
        <div>
            {relatedPd?.length ? (
        <div className="container pb-5">
          <h2 className="text-center fw-bold">
            
            <span style={{ color: "#eb5525" }} className="border-bottom">
              Related Mobiles
            </span>
          </h2>
          <div className="row row-cols-1 row-cols-md-4 m-2 g-4">
            {relatedPd?.map((related) => (
              <div key={related?._id}>
                <div className="col rounded text-center">
                <div className="card border-0 shadow-sm h-100">
                   
                   <div className='card-hover rounded py-3'>
                          <div>  
                           <Link style={{textDecoration:"none"}} to={`/mobile/${related?._id}`}>
                             <img style={{ height: "10rem" }} src={related?.image} className="img-fluid rounded-start" alt="" />
                           <h6 className="text-dark pt-1">{related?.name}</h6>
                           <div style={{ textAlign: "center" }} className="px-2">
                               <p className="text-secondary">{related?.ram} {related?.storage} | {related?.chipset}</p>
                               <p style={{color:"#eb5525",fontWeight:"bolder"}}>{numberFormat(related?.price).slice(3,-3) }Tk</p>
                           </div> 
                           </Link>
                          </div>  
                       </div>
                       <div>
                           <div className="d-flex justify-content-evenly">
                           <button onClick={() => dispatch(addToCart(related))} className='btn btn-cart border-0 my-2 rounded'> <MdAddShoppingCart title='Add to Cart' className="fs-3 p-1"/> </button>

                          <button onClick={() => dispatch(addToFvrt(related))} className='btn btn-cart border-0 my-2 rounded'> <MdOutlineFavoriteBorder title='Add to Favourite' className="fs-3 p-1"/> </button>

                          <button onClick={() => dispatch(addToCompare(related))} className='btn btn-cart border-0 my-2 rounded'><MdOutlineCompareArrows title="Add to Compare" className='fs-3 p-1'/></button>
                           </div>
                       </div>
               </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        " "
      )}
        </div>
    );
};

export default RelatedMobiles;