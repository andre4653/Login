import React, {Fragment, useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import {toast} from "react-toastify";

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const {email, password} = inputs;

    const onChange = e => 
        setInputs({ ...inputs, [e.target.name]: e.target.value});
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {email, password};
            const response = await fetch(
                "http://localhost:5000/authentication/login",
                {
                    method: "Post",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            if(parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken) 
                setAuth(true);
                toast.success("logged in successfully");
            } else{
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        checkAuthenticated();
    }, []); 

    const[isAuthenticated, setIsAuthenticated] = useState(false);       // is he auth? default: false
    const setAuth = boolean=> {
        setIsAuthenticated(boolean);
    }
    return (
        <Fragment>
            <Router>
                <div className= "container">
                    <Switch>
                        <Route 
                        exact
                        path = "/login"
                        render={props => 
                            !isAuthenticated ? (        //if not: continue with login route, else dashboard
                                <Login{...props} setAuth={setAuth} />
                            ):(
                                <Redirect to = "/dashboard" />
                            )

                        }
                        />
                        <Route 
                        exact
                        path = "/register"
                        render={props => 
                            !isAuthenticated ? (        //if not: continue with login route, else dashboard
                                <Register{...props} setAuth={setAuth} />
                            ):(
                                <Redirect to = "/dashboard" />
                            )

                        }
                        />
                        <Route 
                        exact
                        path = "/dashboard"
                        render={props => 
                            isAuthenticated ? (        //if not: continue with login route, else dashboard
                                <Dashboard{...props} setAuth={setAuth} />
                            ):(
                                <Redirect to = "/login" />
                            )

                        }
                        />
                    </Switch>
                </div>
            </Router>
        </Fragment>
    )
}

//how we can store jwt and take it 