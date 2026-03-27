const Footer = () => {
  return (
    <footer className="bg-white border-t border-beige-200 mt-auto">
      <div className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold tracking-[0.3em] text-gray-900">ATELIER</span>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[300px]">
            Curated essentials for the modern wardrobe. Quality meets minimalism.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] uppercase tracking-widest text-gray-900 font-semibold mb-2">Links</h4>
          <a href="/" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">Home</a>
          <a href="/products" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">Shop</a>
          <a href="/cart" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">Cart</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] uppercase tracking-widest text-gray-900 font-semibold mb-2">Legal</h4>
          <a href="#" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">Terms</a>
          <a href="#" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">Privacy</a>
          <a href="#" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">Cookies</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] uppercase tracking-widest text-gray-900 font-semibold mb-2">Contact</h4>
          <a href="#" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">📧 info@atelier.com</a>
          <a href="#" className="text-gray-500 no-underline text-sm hover:text-gray-900 transition-colors">📞 +1 234 567 890</a>
        </div>
      </div>
      <div className="text-center py-6 border-t border-beige-200">
        <p className="text-gray-500 text-xs tracking-wide">© 2026 Atelier. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;