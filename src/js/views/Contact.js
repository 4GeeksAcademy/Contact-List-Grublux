import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { AppContext } from "../layout.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		id: 0
	});

	const { myContacts, setMyContacts } = useContext(AppContext);

	return (
		<div className="container bg-white p-1">
			<div>
				<div className="row d-flex justify-content-end p-0">
					<div className="col-2"><p className="text-right my-3 justify-content-end">
						<Link className="btn btn-success" to="/add">
							Add new contact
						</Link>
					</p></div>
				</div>

				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{myContacts.map((elm, ind) =>
							<ContactCard name={elm.full_name}
								email={elm.email}
								address={elm.address}
								phone={elm.phone}
								key={elm.id}
								id={elm.id}
								onDelete={() => setState(
									{ showModal: true, id: elm.id }
								)} />
						)}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} id={state.id} />
		</div>
	);
};