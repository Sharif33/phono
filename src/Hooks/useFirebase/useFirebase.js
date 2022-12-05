import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, getIdToken, sendEmailVerification } from "firebase/auth";
import initializeAuthentication from "../../Firebase/firebase.iinit";
import axios from 'axios';
// initialize firebase app
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [defaultAdrs, setAdrs] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, phoneNumber, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                saveUser(email, name, phoneNumber, 'PUT');
                verifyEmail();
                updateProfile(auth.currentUser, {
                    displayName: name,
                    phoneNumber: phoneNumber
                }).then(() => {
                }).catch((error) => {
                });
                navigate('/dashboard');
            })
            .catch((error) => {
                setAuthError(error.message);
                // console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/dashboard';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, user.phoneNumber, 'PUT');
                setAuthError('');
                const destination = location?.state?.from || '/';
                navigate(destination);
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // jwt
                getIdToken(user)
                .then(idToken =>{
                    setToken(idToken);
                })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    /* user data get from databse and check isAdmin */
    useEffect(() => {
        /* fetch(`https://phono-server-production.up.railway.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                localStorage.setItem("phonoUserDetails", JSON.stringify(data));
                setAdrs(data);
                setAdmin(data?.admin)}) */
                const fetchData = async () =>{
                axios
                .get(`https://phono-server-production.up.railway.app/users/${user?.email}`)
                .then((response) => {
                localStorage.setItem("phonoUserDetails", JSON.stringify(response.data));
                setAdrs(response.data);
                setAdmin(response.data?.admin);
                })
            }
            fetchData()
    }, [user.email]);

    /* Verify email */
        const verifyEmail = ()=>{
            sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
            });
        }


    /* Logout */
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }
    
    /* user data upload to databse */
    const saveUser = (email, displayName, phoneNumber, method) => {
        const user = { email, displayName, phoneNumber };
        fetch(`https://phono-server-production.up.railway.app/users`, {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        admin,
        defaultAdrs,
        token,
        isLoading,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut,
    }
}

export default useFirebase;