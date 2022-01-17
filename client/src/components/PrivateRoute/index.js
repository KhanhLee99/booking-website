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

export function PrivateRouteHost({ component: Component, ...rest }) {
	const loggedInUser = useSelector((state) => state.userSlice.current);
	const isLoggedIn = !!loggedInUser.id;

	return (
		<Route
			{...rest}
			render={(props) => {
				return (
					<Component {...props} />
				)
				// return isLoggedIn ? loggedInUser.role_id == 2 ? (
				// 	<Layout {...props}>
				// 		<Component {...props} />
				// 	</Layout>
				// ) : (
				// 	<Redirect to='/host/login' />
				// ) : (
				// 	<Redirect to='/host/login' />
				// );
			}}
		/>
	)
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

export function PrivateRouteAddListing({ component: Component, layout: Layout, ...rest }) {
	const loggedInUser = useSelector((state) => state.userSlice.current);
	const isLoggedIn = !!loggedInUser.id;

	return (
		<Route
			{...rest}
			render={(props) => {
				return isLoggedIn ? loggedInUser.role_id == 2 ? (
					<Layout {...props}>
						<Component {...props} />
					</Layout>
				) : (
					<Redirect to='/host/login' />
				) : (
					<Redirect to='/host/login' />
				);
			}}
		/>
	)
}

export function PrivateRouteMe({ component: Component, layout: Layout, ...rest }) {
	const loggedInUser = useSelector((state) => state.userSlice.current);
	const isLoggedIn = !!loggedInUser.id;

	return (
		<Route
			{...rest}
			render={(props) => {
				return isLoggedIn ?
					<Layout {...props}>
						<Component {...props} />
					</Layout>
					: (
						<Redirect to='/' />
					);
			}}
		/>
	)
}

