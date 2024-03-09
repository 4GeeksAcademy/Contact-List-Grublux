import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";

export const AddContact = () => {




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

	const { myContacts, setMyContacts } = useContext(AppContext);

	return (
		<div className="container bg-white pb-5">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
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
						save
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};