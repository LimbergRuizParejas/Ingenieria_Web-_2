import React from 'react';
import Home from '../components/Home/Home';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

function PublicPage() {
  return (
    <div>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default PublicPage;
