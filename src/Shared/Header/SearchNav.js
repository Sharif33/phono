import React,{useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
// import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@mui/icons-material/Close';
import usePhones from '../../Hooks/usePhones/usePhones';
import { Link } from 'react-router-dom';

const SearchNav = () => {
    const [mobiles] = usePhones();

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = mobiles.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };
    return (
        <div>
            <nav  className="nav">
                {/*    <li className="nav-item">
                                            <NavLink style={{textDecoration:"none"}} aria-current="page" to="/search"><button style={{width:"20rem"}} className="btn-light btn pe-5 text-secondary text-start mx-1"><span><SearchIcon/></span> Search...</button></NavLink>
                                        </li> */}
                                        <li className="nav-item">
                                        
                                        <div className="searchInputs d-flex justify-content-between align-items-center bg-light border-0 rounded mx-1 p-2">
                                            <input style={{width:"40vw"}}
                                            className='border-0'
                                            type="text"
                                            placeholder="Search"
                                            value={wordEntered}
                                            onChange={handleFilter}
                                            />
                                            <span className="searchIcon">
                                            {filteredData.length === 0 ? (
                                                <SearchIcon />
                                            ) : (
                                                <CloseIcon id="clearBtn" onClick={clearInput} />
                                            )}
                                            </span>
                                        </div>
                                        <div>
                                        {
                                         filteredData.length !== 0 && (
                                            <div className="dataResult rounded">
                                                <p className='m-auto p-2'>Search result for <span className='text-pink'>{wordEntered}</span></p>
                                            {filteredData.slice(0, 15).map((value) => <div key={value?._id}>
                                            <ul className="list-group ">  
                                                <Link title='See Details' to={`/mobile/${value?._id}`}>
                                                    <li className="serchResult list-group-item d-flex justify-content-between align-items-center">
                                                        <small>{value?.name}</small>
                                                    <span><img style={{width:"1.5rem"}} src={value?.image} alt="" className="img-fluid" /></span>
                                                    </li>         
                                                    </Link>
                                                </ul>
                                            </div>)}
                                            </div>)
                                        }
                                        </div>
                                       
                                                </li>
            </nav>
        </div>
    );
};

export default SearchNav;