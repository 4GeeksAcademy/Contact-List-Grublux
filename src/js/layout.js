import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import { EditContact } from "./views/EditContact";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AddContact } from "./views/AddContact";
import { Contacts } from "./views/Contact";

export const AppContext = React.createContext(null);



//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	const [myContacts, setMyContacts] = useState([]);

	const [tempID, setTempID] = useState("");

	return (
		<div>
			<AppContext.Provider value={{ myContacts, setMyContacts, tempID, setTempID }}>
				<BrowserRouter basename={basename}>
					<ScrollToTop>
						{/* <Navbar /> */}
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/edit" element={<EditContact />} />
							<Route path="/contacts" element={<Contacts />} />
							<Route path="/add" element={<AddContact />} />
							<Route path="/demo" element={<Demo />} />
							<Route path="/single/:theid" element={<Single />} />
							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</AppContext.Provider>
		</div>
	);
};

export default injectContext(Layout);
