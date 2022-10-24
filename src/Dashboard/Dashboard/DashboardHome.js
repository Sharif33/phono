import React,{useState, useEffect} from 'react';
import { AiOutlineFundProjectionScreen,AiOutlineStar,AiFillProject } from "react-icons/ai";
import Rating from '@mui/material/Rating';
import useReviews from '../../Hooks/useReviews/useReviews';
import usePhones from '../../Hooks/usePhones/usePhones';
import useAuth from '../../Hooks/useAuth/useAuth';
import UserDashboard from './UserDashboard';
import { FiCheck, FiRefreshCcw, FiShoppingCart, FiTruck } from "react-icons/fi";
// import useOrders from '../../Hooks/useOrders/useOrders';
// import useAuth from '../../Hooks/useAuth/useAuth';
// import about from "../../images/about.jpg";

const DashboardHome = () => {
    const {admin}= useAuth();
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        setInterval(() => {
              setTime(new Date());  
}, 1000);
        
      }, []);

    const date = new Date().toDateString();

// Phone Collection Section
    const [mobiles] = usePhones();
    // const [orders] = useOrders();

    const [orders, setOrders] = useState([]);
    // console.log(orders);

    useEffect(() => {
        let isMounted = true;
        fetch(`https://peaceful-shore-84874.herokuapp.com/orders`)
            .then((res) => res.json())
            .then((data) => {
                if(isMounted ){
                   setOrders(data);
                    }
            }
            );
            return () => {
                isMounted = false;
                };
    }, [orders]);

    // ✅ Get Max date
const pendingOrder = orders?.filter(element => 
       (element?.status === "Pending...")
      );
const processingOrder = orders?.filter(element => 
       (element?.status === "Processing" || element?.status === "Packed" || element?.status === "Shipped")
      );
const deliveredOrder = orders?.filter(element => 
       (element?.status === "Delivered")
      );  
/* const CancelOrder = orders?.filter(element => 
       (element?.status === "Cancel")
      );   */

  // ✅ Get Min date
 /*  const minDate = new Date(
    Math.min(
      ...mobiles.map(element => {
        return new Date(element?.updated_date);
      }),
    ),
  );
  
  console.log(minDate); */

    const lastUpdate = mobiles.slice(-1).pop();
    // const firstUpload = mobiles.slice(1);


// User review Section
  const [reviews] = useReviews();

        const total=(reviews.reduce((total,currentItem) =>  total = parseFloat(total + currentItem.rating) , 0 ));

    const avg =(total/(reviews?.length)).toFixed(1);
    return (
        <div>
            {
                admin ? <div>
            <div className='text-center'>
                <h1 style={{fontSize:"10vw"}} className='text-navi'>{time.toLocaleTimeString()}</h1>
                 <h1 className='text-lightest-slate'>{date}</h1>
            </div>
            
            <div className='row row-cols-1 row-cols-md-3 m-2 g-4'>
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center bg-skill-back p-2 rounded">
                        <div className='m-auto'>
                            <AiOutlineFundProjectionScreen  style={{fontSize:"15vw"}}  className='p-2 text-sky w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className='text-light-slate font-custom'>Total Projects: <br /> <span className="fs-1 text-danger"> {mobiles?.length}</span></h5> 
                              <h5 className='text-light-slate'> <span className="font-custom">Last Update:</span> <br /> <small className='text-warning'>{lastUpdate?.date} , {lastUpdate?.time}</small> </h5>
                            {/*   {
                                  mobiles?.map(mob=>
                                    <div key={mob._id}>
                                        <h5>{mob?.updated_date}</h5>
                                    </div>)
                              } */}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-md-flex justify-content-between align-items-center bg-skill-back p-2 rounded">
                        <div className='m-auto'>
                            <AiFillProject  style={{fontSize:"15vw"}}  className='p-2 text-sky w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className='text-light-slate font-custom'>Last Project: <br /><span className="fs-3 text-danger">{lastUpdate?.name}</span></h5>
                              <h5 className='text-light-slate'> <span className="font-custom"> Upload:</span> <br /> <small className='text-warning'>{lastUpdate?.date} , {lastUpdate?.time}</small> </h5>
                        </div>
                    </div>
                </div>
                <div className="col">
                <div className="d-md-flex justify-content-between align-items-center bg-skill-back p-2 rounded">
                        <div className='m-auto'>
                            <AiOutlineStar  style={{fontSize:"15vw"}}  className='p-2 text-sky w-100'/>
                        </div>
                        <div className='text-center w-100'>
                              <h5 className='text-light-slate font-custom'>Total Reviews: <br /><span className="fs-3 text-danger"> {reviews?.length}</span></h5>
                              <h5 className='text-light-slate font-custom'>Average Ratings: <br /> <Rating name="half-rating-read" value={Number(avg)} precision={0.1} readOnly /> <span className="fs-3 text-danger"> {avg}</span></h5>
                              
                        </div>
                    </div>
                </div>
            </div>
            
                <div className="row row-cols-2 row-cols-md-4 m-2 g-2">
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                    <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiShoppingCart className='fs-2 '/>
                        </div>
                        <div className='text-start'>
                              <small className='text-light-slate'>Total Order</small> <br /> <span className="text-navi fs-3 fw-bold"> {orders?.length}</span>
                        </div>
                    </div>
                </div>
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                    <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiRefreshCcw className='fs-2 '/>
                        </div>
                        <div className='text-start'>
                              <small className='text-light-slate'>Order Pending </small> <br /> <span className="text-navi fs-3 fw-bold"> {pendingOrder?.length}</span>
                        </div>
                    </div>
                </div>
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                        <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiTruck className='fs-2 '/>
                        </div>
                        
                        <div className='text-start'>
                              <small className='text-light-slate'>Order Processing </small> <br /> <span className="text-navi fs-3 fw-bold"> {processingOrder?.length}</span>
                        </div>
                    </div>
                </div>
                    <div className="col">
                    <div className="d-flex justify-content-start align-items-center border m-auto py-2 rounded">
                    <div className="mx-2 p-3 rounded-circle bg-cart">
                            <FiCheck className='fs-2 '/>
                        </div>
                        <div className='text-start'>
                              <small className='text-light-slate'>Order Delivered </small> <br /> <span className="text-navi fs-3 fw-bold"> {deliveredOrder?.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <UserDashboard/>
            }
         
        </div>
    );
};

export default DashboardHome;