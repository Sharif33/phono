import {
  Alert,
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth/useAuth";
import { deepPurple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [admins, setAdmins] = useState([]);

  const getAdmins = admins?.filter((admin) => admin?.role);
  // console.log(getAdmins);

  /* Make Admin */
  const { token, user } = useAuth();
  // console.log(user);

  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch(`https://phono-server-production.up.railway.app/users/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setEmail("");
          setSuccess(true);
        }
      });
    e.preventDefault();
  };

  setTimeout(() => {
    setSuccess(false);
  }, 30000);

  /* get Admins */
  useEffect(() => {
    const fetchData = async () => {
      axios.get(`https://phono-server-production.up.railway.app/users`).then((response) => {
        setAdmins(response.data);
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={12}>
            <Box className="p-4 rounded bg-light mx-auto">
              <Typography variant="h5" sx={{ mb: 2 }}>
                Make a new Admin
              </Typography>
              <form onSubmit={handleAdminSubmit}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  required
                />
                <br />
                <Button
                  sx={{ mt: 2 }}
                  type="submit"
                  variant="outlined"
                  size="small"
                >
                  Make Admin
                </Button>
              </form>
              {success && (
                <Alert severity="success">
                  "{email}" has been successfully admin!
                </Alert>
              )}
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sx={{ p: 4 }}>
            <Typography
              sx={{ my: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Admin Panel ({getAdmins.length})
            </Typography>
            <List>
              {getAdmins?.map((admin) => (
                <ListItem
                  key={admin._id}
                  secondaryAction={
                    <IconButton color="error" edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    {user?.email === admin?.email ? (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar
                          alt={user?.name || user?.displayName}
                          src={user?.photoURL}
                        />
                      </StyledBadge>
                    ) : (
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={admin.email}
                    secondary={admin?.name || admin?.displayName}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MakeAdmin;
