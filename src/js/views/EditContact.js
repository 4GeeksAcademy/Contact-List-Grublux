import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";

export const EditContact = () => {

    const { myContacts, setMyContacts, tempID, setTempID } = useContext(AppContext);

    const [fullName, setFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");

    useEffect(() => {
        //Runs only on the first render
        fetch(`https://playground.4geeks.com/apis/fake/contact/${tempID}`)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                // Read the response as JSON
                return response.json();
            })
            .then(responseAsJson => {
                // Do stuff with the JSONified response
                setFullName(responseAsJson.full_name)
                setUserEmail(responseAsJson.email)
                setUserPhone(responseAsJson.phone)
                setUserAddress(responseAsJson.address)
                console.log(responseAsJson);
            })
            .catch(error => {
                console.log('Looks like there was a problem: \n', error);
            });
    }, []);



    const addUser = () => {
        fetch(`https://playground.4geeks.com/apis/fake/contact/${tempID}`, {
            method: 'PUT',
            body: JSON.stringify(
                {
                    "full_name": `${fullName}`,
                    "email": `${userEmail}`,
                    "agenda_slug": "Grublux",
                    "address": `${userAddress}`,
                    "phone": `${userPhone}`,
                    "id": `${tempID}`
                }
            ), // data can be a 'string' or an {object} which comes from somewhere further above in our application


            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => console.log('Success:', response))
            .then(fetch('https://playground.4geeks.com/apis/fake/contact/agenda/Grublux')
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    // Read the response as JSON
                    return response.json();
                })
                .then(responseAsJson => {
                    // Do stuff with the JSONified response
                    setMyContacts(responseAsJson);
                    console.log(responseAsJson);
                }))
            .catch(error => console.error(error));

    }

    return (
        <div className="container bg-white pb-5">
            <div>
                <h1 className="text-center mt-5">Edit Your Info</h1>
                <form className="p-5">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" placeholder="Full Name"
                            onChange={e => setFullName(e.target.value)} value={fullName} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e => setUserEmail(e.target.value)} value={userEmail} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="phone" className="form-control" placeholder="Enter phone"
                            onChange={e => setUserPhone(e.target.value)} value={userPhone} required />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control mb-3" placeholder="Enter address"
                            onChange={e => setUserAddress(e.target.value)} value={userAddress} required />
                    </div>
                    <Link type="button" className="btn btn-primary form-control" to="/"
                        onClick={() => {
                            addUser();

                        }
                        }
                    >
                        Update My Info
                    </Link>
                    <Link className="mt-3 w-100 text-center" to="/">
                        or get back to contacts
                    </Link>
                </form>
            </div>
        </div>
    );
};