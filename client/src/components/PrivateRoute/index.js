import React from 'react';
// import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export function PrivateRoute({ component: Component, ...rest }) {

	return (
		<div>
			<Route
				{...rest}
				render={(props) => {
					return	<Component {...props} />
				}}
			/>
		</div>
	);
}