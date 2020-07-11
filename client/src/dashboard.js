import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard", {
                method: "Post",
                headers: {jwt_token: localStorage.token}
            });

            const parseData = await res.json();
            setName(parseData.user_name);
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = async e => {             // e ist ein react event
        e.preventdefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("logout succesfully");    //toast in eine benachrichtigung wie bei tindernachrichten
        } catch (err) {
            console.error(message.err)
        }
    };

    useEffect(()=> {
        getProfile();
    }, []);



}