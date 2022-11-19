import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from '@mui/icons-material/Close';
import usePhones from "../../Hooks/usePhones/usePhones";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import useOffer from "../../Hooks/SpecialOffer/useOffer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.25, 1.25, 1.25, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    border: "1px solid #e9edf4",
    color: "black",
    //   border: "1px solid rgb(224, 227, 231)",
    borderRadius: "10px",
    backgroundColor: "rgb(243, 246, 249)",
    [theme.breakpoints.up("sm")]: {
      width: "35vw",
      "&:focus": {
        width: "40vw",
        //   border: "1px solid #05C3FB",
        //   backgroundColor:"#EEF1F4",
      },
    },
  },
}));

const SearchNav = () => {
  const [mobiles] = usePhones();
  const [offers] = useOffer();

  const mrgMbl = [...mobiles, ...offers];
  // console.log(mrgMbl);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = mrgMbl?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  /*    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    }; */
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon style={{ color: "#ced4da" }} />
        </SearchIconWrapper>
        <StyledInputBase
          value={wordEntered}
          onChange={handleFilter}
          placeholder="Search…"
          type="search"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      {/*  <div className="searchInputs d-flex justify-content-between align-items-center bg-light mx-1 p-2" style={{width:"40vw", border: "1px solid #e9edf4", borderRadius: "7px"}}>
                    <input style={{width:"40vw"}}
                    className='border-0'
                    type="text"
                    placeholder="Search"
                    value={wordEntered}
                    onChange={handleFilter}
                    />
                    <span className="searchIcon">
                    {filteredData.length === 0 ? (
                        <SearchIcon style={{color: "#ced4da"}}/>
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                    </span>
                    </div> 
                */}
      <div>
        {filteredData.length !== 0 && (
          <div className="dataResult rounded">
            <p className="m-auto p-2 text-dark">
              Search result for <span className="text-pink">{wordEntered}</span>
            </p>
            {filteredData.slice(0, 15).map((value) => (
              <div key={value?._id}>
                <ul className="list-group ">
                  <Link title="See Details" to={value?.os ? `/mobile/${value?._id}` : `/mobile2/${value?._id}`}>
                    <li className="serchResult list-group-item d-flex justify-content-between align-items-center">
                      <small>{value?.name}</small>
                      <span>
                        <img
                          style={{ width: "1.5rem" }}
                          src={value?.image}
                          alt=""
                          className="img-fluid"
                        />
                      </span>
                    </li>
                  </Link>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchNav;
