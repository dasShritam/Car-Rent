import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { Nav } from './Components/Nav/Nav';
import {
  AddCar,
  AddLocation,
  Auth,
  AuthContextProvider,
  CarDetails,
  CarList,
  EditCar,
  EditLocation,
  Home,
  LocationDetails,
  Locations,
  Contact,
  NotFound,
  TermsAndConditions,
  PrivacyNotice,
  UserProfile,
} from './Features';
import { Footer } from './Features/Footer';

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/add" element={<AddLocation />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/locations/edit/:id" element={<EditLocation />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/cars/edit/:id" element={<EditCar />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacynotice" element={<PrivacyNotice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
