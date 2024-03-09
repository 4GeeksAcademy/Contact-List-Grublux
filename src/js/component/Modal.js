import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "../layout";

export const Modal = props => {
	const [state, setState] = useState({
		//initialize state here
	});

	const { myContacts, setMyContacts } = useContext(AppContext);

	const deleteData = async () => {
		const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${props.id}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			const data = await response.json();
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

		}
		else {
			console.log('error: ', response.status, response.statusText);
			/* Handle the error returned by the HTTP request */
			return { error: { status: response.status, statusText: response.statusText } };
		};
	};


	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="btn btn-primary"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">Oh no!</span>
							</button>
						) : (
							""
						)}
						{props.onClose ? (
							<button
								onClick={() => {
									props.onClose();
									deleteData(myContacts.id)

								}
								}
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">Do it!</span>
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};