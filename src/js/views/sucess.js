import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";

export const Sucess = () => {




    const addUser = () => {
        fetch('https://playground.4geeks.com/apis/fake/contact/', {
            method: 'POST',
            body: JSON.stringify(
                {
                    "full_name": `${fullName}`,
                    "email": `${userEmail}`,
                    "agenda_slug": "Grublux",
                    "address": `${userAddress}`,
                    "phone": `${userPhone}`
                }
            ), // data can be a 'string' or an {object} which comes from somewhere further above in our application


            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                setStoreUserName(fullName)
            )

            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => console.log('Success:', response))
            .catch(error => console.error(error));

    }

    const [fullName, setFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");

    const { myContacts, setMyContacts, storedUserName, setStoreUserName } = useContext(AppContext);

    return (
        <div className="container bg-white pb-5">
            <div>
                <h5 className="text-center mt-5">{storedUserName} has been successfully added/updated</h5>
                <img src="https://cdn.pixabay.com/photo/2017/01/04/21/00/fireworks-1953253_1280.jpg" alt="contact picture" className="mx-auto d-block img-fluid sucess" />
                <Link type="button" className="btn btn-primary form-control" to="/">Back to Contacts</Link>
            </div>
        </div >
    );
};