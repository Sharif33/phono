
import { Avatar } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareIcon from '@mui/icons-material/Compare';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import "./Header.css";
// import { Favourite } from '../../Contexts/AuthProvider/FavContext';
import { useSelector } from 'react-redux';

const Header = () => {

    // const {cart} = useContext(Favourite);
    const {addToFvrt} = useSelector((state) => state.fvrt);
    const {addToCart} = useSelector((state) => state.cart);
    const {addToCompare} = useSelector((state) => state.compare);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -5,
          top: 3,
        //   border: `2px solid ${theme.palette.background.paper}`,
        //   padding: '0 2px',
        },
      }));

    const { user, logOut } = useAuth();
 /*  const [orders, setOrders] = useState([]);
  const email = user?.email;
  useEffect(() => {
      fetch(`https://peaceful-shore-84874.herokuapp.com/myOrders/${email}`)
          .then((res) => res.json())
          .then((data) => setOrders(data));
  }, [email]); */

//   const handleSearch = e =>{
//     const searchText = e.target.value;
//     const matchedMobiles = mobiles.filter(mobile=>mobile.name.toLowerCase().includes(searchText.toLowerCase()));
//     setCategories(matchedMobiles);
// }

    return (
        <div style={{marginBottom:"60px"}}>
            <div className="header">
                <div className="header-inner">
                    <nav style={{ backgroundColor: "#303f9f" }} className="navbar fixed-top navbar-expand-lg navbar-dark ms-auto">
                        <div className="container">
                            <NavLink className="navbar-brand fw-bold fs-3 text-warning" to="/home">PH<span className="text-danger">|O|</span>NO</NavLink>
                            
                                        <NavLink className='me-1' to={`/fvrt`} >
                                        <IconButton aria-label="favorite">
                                        <StyledBadge badgeContent={addToFvrt?.length} color="error">
                                        <FavoriteBorderOutlinedIcon sx={{ color: 'white'}} />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink>
                                        
                                        <NavLink className='me-1' to={`/cart`} >
                                        <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={addToCart?.length} color="error">
                                        <ShoppingBagOutlinedIcon sx={{ color: 'white'}} />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink>

                                        <NavLink className='me-1' to={`/compare`} >
                                        <IconButton aria-label="compare">
                                        <StyledBadge badgeContent={addToCompare?.length} color="error">
                                        <CompareIcon sx={{ color: 'white'}} />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink>

                                        {/* <NavLink className='me-1' to={`/mobiles`} >
                                        <i className="fa-solid mx-3 fs-5 fa-magnifying-glass"></i>
                                        </NavLink> */}
                                        {/* <NavLink className='me-1' to={`/dashboard/myOrders`} >
                                        <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={orders?.length} color="secondary">
                                        <ShoppingBagOutlinedIcon sx={{ color: 'primary.main'}} />
                                        </StyledBadge>
                                        </IconButton>
                                        </NavLink> */}
                                        
                            <button className="navbar-toggler" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav text-center ms-auto">
                                        <li className="nav-item">
                                            <NavLink style={{textDecoration:"none"}} aria-current="page" to="/search"><button style={{width:"20rem"}} className="btn-light btn pe-5 text-secondary text-start"><span><SearchIcon/></span> Search...</button></NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })} className="nav-link active mx-1  " aria-current="page" to="/home">HOME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })} className="nav-link active mx-1  " to="/mobiles">SHOP</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })} className="nav-link active mx-1  " href="#contact" to="/contact">CONTACT US</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })} className="nav-link active mx-1  " to="/about">ABOUT US</NavLink>
                                        </li>

                                        <li className="nav-item">
                                        {
                                               user?.email ? <ul className="text-center">

                                               {/*    <li className="nav-item">
                                                          <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })} className="nav-link active mx-1  " to="/cart"><i className="far fa-heart"></i> {cart.length} </NavLink>
                                                      </li> */}
          
                                                  <li className="dropdown mx-2">
                                                  <Avatar id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" alt="" src={user?.photoURL} />
                                                  <ul className="dropdown-menu border-0 shadow" aria-labelledby="navbarDropdownMenuLink">
                                                  <li className=" dropdown-item border-bottom">
                                                      <small className='fw-bold'>{user?.displayName}</small><br />
                                                  <small className="text-center">{user?.email}</small>
                                                  </li>
          
                                                  <li className=" dropdown-item">
                                                  <small className="text-center">Profile</small>
                                                  </li>
          
                                                  <li className=" dropdown-item ">
                                                  <NavLink  className='text-dark' style={{textDecoration:'none',cursor:"pointer",color:"white"}} to="/dashboard"><small>Dashboard</small></NavLink>
                                                  </li>
          
                                                  <li className="dropdown-item">
                                                  <small style={{cursor:"pointer"}} onClick={logOut} >Logout</small>
                                                  </li>
                                                  
                                                  </ul>
                                                  </li>
                                              </ul>
                                              :
                                              <NavLink style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })} className="nav-link active mx-1" to="/login"><span> <i className="fas fa-user"> </i> SIGN IN </span> </NavLink>
                                        }
                                    </li>
                                     </ul>
                               
                                {/* <form class="d-flex">
        <input onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
                                */}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;