import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';

// Pages
import CheckoutPage from './pages/CheckoutPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/checkout/:orderId" element={<CheckoutPage />} />
            <Route path="/payment/success" element={<PaymentConfirmationPage success={true} />} />
            <Route path="/payment/cancel" element={<PaymentConfirmationPage success={false} />} />
            <Route path="/payment/history" element={<PaymentHistoryPage />} />
            <Route path="/" element={<CheckoutPage />} /> {/* For testing */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;