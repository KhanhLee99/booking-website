import React from 'react';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export function PrivateRoute({ component: Component, ...rest }) {
	const loggedInUser = useSelector((state) => state.abc.current);
	const isLoggedIn = !!loggedInUser.id;
	console.log(isLoggedIn);
	return (
		<div>
			<Route
				{...rest}
				render={(props) => {
					return	isLoggedIn ? (
						// <Redirect to='/recruiter' />
						<Component {...props} />
					) : (
						<Redirect to='/login' />
					);
				}}
			/>
		</div>
	);
}