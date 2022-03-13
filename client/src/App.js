import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginDashboard from "./views/LoginDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainProfileDashboard from "./views/MainProfileDashboard";
import ProviderDashboard from "./views/ProviderDashboard";
import ProfileInfoDashboard from "./views/ProfileInfoDashboard";
import RegisterLoginDashboard from "./views/RegisterLoginDashboard";
import RegistrationFormDashboard from "./views/RegistrationFormDashboard";
import ProviderRegistrationDashboard from "./views/ProviderRegistrationDashboard";
import ManageSpaceDashboard from "./views/ManageSpaceDashboard";
import HomePageDashboard from "./views/HomePageDashboard";
import FindParkingSpaceDashboard from "./views/FindParkingSpaceDashboard";
import AddParkingLotDashboard from "./views/AddParkingLotDashboard";
import AccountVerificationDashboard from "./views/AccountVerificationDashboard";
import LoginProtectedRoutes from "./ProtectedRoutes/LoginProtectedRoutes";
import MainProtectedRoutes from "./ProtectedRoutes/MainProtectedRoutes";
import { AuthContext } from "./GlobalContext/AuthContext";
import Layout from "./components/layout/Layout";

function App() {
	const Auth = useContext(AuthContext);
	console.log("auth", Auth);
	return (
		<React.Fragment>
			{!Auth.state.isLoading && (
				<Router>
					<Switch>
						<LoginProtectedRoutes
							Auth={Auth}
							path="/"
							component={RegisterLoginDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/mainprofile"
							layout={Layout}
							component={MainProfileDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/profileinfo"
							layout={Layout}
							component={ProfileInfoDashboard}
							exact
						/>

						<MainProtectedRoutes
							Auth={Auth}
							path="/homepage"
							layout={Layout}
							component={HomePageDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/addparkinglot"
							layout={Layout}
							component={AddParkingLotDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/findparkingspace"
							layout={Layout}
							component={FindParkingSpaceDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/verifyaccount"
							layout={Layout}
							component={AccountVerificationDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/admin/homepage"
							layout={Layout}
							isAdmin={true}
							component={() => <h1>ADMIN SIDE</h1>}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/provider"
							layout={Layout}
							component={ProviderDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/registerprovider"
							layout={Layout}
							component={ProviderRegistrationDashboard}
							exact
						/>
						<MainProtectedRoutes
							Auth={Auth}
							path="/manageparkingspace"
							layout={Layout}
							component={ManageSpaceDashboard}
							exact
						/>

						<LoginProtectedRoutes
							Auth={Auth}
							path="/register"
							component={RegisterLoginDashboard}
							exact
						/>
						<LoginProtectedRoutes
							Auth={Auth}
							path="/registration"
							component={RegistrationFormDashboard}
							exact
						/>
						<LoginProtectedRoutes
							Auth={Auth}
							path="/login"
							component={LoginDashboard}
							exact
						/>
						<Route component={() => <h1>URL NOT FOUND</h1>} />
					</Switch>
				</Router>
			)}
		</React.Fragment>
	);
}

export default App;
