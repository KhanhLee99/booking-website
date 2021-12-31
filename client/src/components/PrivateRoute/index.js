import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export function PrivateRoute({ component: Component, ...rest }) {
	const loggedInUser = useSelector((state) => state.userSlice.current);
	const isLoggedIn = !!loggedInUser.id;
	console.log(isLoggedIn);
	return (
		<div>
			<Route
				{...rest}
				render={(props) => {
					return isLoggedIn ? (
						<Component {...props} />
					) : (
						<Redirect to='/login' />
					);
				}}
			/>
		</div>
	);
}

export function PrivateRouteAdmin({ component: Component, layout: Layout, ...rest }) {
	const loggedInUser = useSelector((state) => state.userSlice.current);
	const isLoggedIn = !!loggedInUser.id;

	return (
		<Route
			{...rest}
			render={(props) => {
				return isLoggedIn ? loggedInUser.role_id == 1 ? (
					<Layout {...props}>
						<Component {...props} />
					</Layout>
				) : (
					<Redirect to='/admin/login' />
				) : (
					<Redirect to='/admin/login' />
				);
			}}
		/>
	)
}