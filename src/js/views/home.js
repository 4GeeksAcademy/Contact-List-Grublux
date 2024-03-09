import React, { useEffect, useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Contacts } from "./Contact";
import { AppContext } from "../layout";

export const Home = () => {

	const { myContacts, setMyContacts } = useContext(AppContext);

	useEffect(() => {
		//Runs only on the first render
		fetch('https://playground.4geeks.com/apis/fake/contact/agenda/Grublux')
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
			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}, []);



	return (
		<div className="text-center mt-5">
			<Contacts />
		</div>
	);

}
