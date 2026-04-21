"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, ArrowRight, Star, X, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

const SareeStore = () => {
  // --- STATE (The Website's Memory) ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
  const [favouriteItems, setFavouriteItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const scrollToFeatured = () => {
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- SAMPLE DATA ---
  const categories = [
    { name: "Paithani", image: "/images/Lotus Paithani.jpg" },
    { name: "Kanjivaram", image: "/images/kanjivaram.jpg" },
    { name: "Designer", image: "/images/designer.jpg" },
    { name: "Silk", image: "/images/silk.jpg" }
  ];

  const featuredProducts = [
    { id: 1, name: "Cotton Silk", price: 799, rating: 4.9, image: "/images/Cotton Silk.jpeg" },
    { id: 2, name: "Gadhwal cotton silk", price: 599, rating: 5.0, image: "/images/Gadhwal cotton silk.jpeg" },
    { id: 3, name: "Jasvand Paithani", price: 18200, rating: 4.8, image: "/images/saree3.jpg" },
    { id: 4, name: "Lotus Paithani", price: 9999, rating: 4.7, image: "/images/Lotus Paithani.jpeg" }
  ];

  const featuredProductsFiltered = featuredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- FUNCTIONS (The Website's Actions) ---
  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true); // Automatically open cart when adding an item
  };

  const removeFromCart = (indexToRemove: number) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  const toggleFavourite = (product: Product) => {
    const isAlreadyFavourite = favouriteItems.some(item => item.id === product.id);
    if (isAlreadyFavourite) {
      setFavouriteItems(favouriteItems.filter(item => item.id !== product.id));
    } else {
      setFavouriteItems([...favouriteItems, product]);
    }
  };

  const removeFromFavourites = (indexToRemove: number) => {
    setFavouriteItems(favouriteItems.filter((_, index) => index !== indexToRemove));
  };

  const isFavourite = (productId: number) => {
    return favouriteItems.some(item => item.id === productId);
  };

  // Calculate the total price of everything in the cart
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900">
      
      {/* Promotional Banner */}
      <div className="bg-[#5C1A1B] text-[#E8DCC4] text-center py-2 text-sm font-medium tracking-wide">
        LIMITED STOCK: Grab the best sarees in town!!
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-5 md:px-12 border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 md:hidden text-stone-700 cursor-pointer" />
          <div className="relative flex items-center">
            <button
              onClick={() => setIsSearchOpen(prev => !prev)}
              className="text-stone-500 hover:text-[#5C1A1B] transition"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
            {isSearchOpen && (
              <div className="ml-3 block">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sarees..."
                    className="w-64 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-900 shadow-sm focus:border-[#5C1A1B] focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-2 top-2 text-stone-400 hover:text-stone-600"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Brand Name */}
        <div className="text-3xl font-serif tracking-widest text-[#5C1A1B] font-bold cursor-pointer">
          SMITA'S COLLECTION
        </div>

        <div className="flex items-center gap-5 text-stone-600">
          {/* FAVOURITES BUTTON */}
          <div 
            className="relative cursor-pointer group" 
            onClick={() => setIsFavouritesOpen(true)}
          >
            <Heart className={`w-5 h-5 transition ${favouriteItems.length > 0 ? 'text-red-500 fill-current' : 'hover:text-[#5C1A1B]'}`} />
            {favouriteItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {favouriteItems.length}
              </span>
            )}
          </div>
          
          {/* CART BUTTON */}
          <div 
            className="relative cursor-pointer group" 
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-[#5C1A1B] transition" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* --- CART DRAWER (SLIDES IN FROM RIGHT) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right">
            
            {/* Cart Header */}
            <div className="flex justify-between items-center p-6 border-b border-stone-200">
              <h2 className="text-2xl font-serif text-[#5C1A1B]">Your Royal Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition">
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-stone-500 mt-10">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Your cart is currently empty.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center bg-stone-50 p-3 rounded-lg">
                      <div className="w-20 h-24 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-sm text-stone-800">{item.name}</h4>
                        <p className="font-medium text-[#5C1A1B] mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="p-2 text-stone-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-stone-200 p-6 bg-stone-50">
                <div className="flex justify-between items-center mb-4 text-lg font-medium">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-sm text-stone-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <button 
                  onClick={() => alert("This would securely take you to Razorpay/Stripe for payment!")}
                  className="w-full bg-[#5C1A1B] text-[#E8DCC4] py-4 rounded-sm font-medium hover:bg-[#4A1516] transition duration-300"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- FAVOURITES DRAWER (SLIDES IN FROM RIGHT) --- */}
      {isFavouritesOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right">

            {/* Favourites Header */}
            <div className="flex justify-between items-center p-6 border-b border-stone-200">
              <h2 className="text-2xl font-serif text-[#5C1A1B]">Your Favourites</h2>
              <button onClick={() => setIsFavouritesOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition">
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>

            {/* Favourites Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {favouriteItems.length === 0 ? (
                <div className="text-center text-stone-500 mt-10">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Your favourites list is empty.</p>
                  <p className="text-sm mt-2">Click the heart icon on products to add them here!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {favouriteItems.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center bg-stone-50 p-3 rounded-lg">
                      <div className="w-20 h-24 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-sm text-stone-800">{item.name}</h4>
                        <p className="font-medium text-[#5C1A1B] mt-1">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-[#D4AF37] mt-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs text-stone-600">{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 bg-[#5C1A1B] text-white text-xs rounded hover:bg-[#4A1516] transition"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromFavourites(index)}
                          className="p-2 text-stone-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src="/images/134077589_a1ce133045_b.jpg" 
          alt="Colorful saree boutique" 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-[#D4AF37] text-sm md:text-base font-semibold tracking-[0.2em] mb-4 uppercase">
            The Premium Collection
          </h2>
          <h1 className="text-4xl md:text-6xl text-white font-serif mb-6 max-w-3xl leading-tight">
            Elegance Woven in Every Thread
          </h1>
          <button
            onClick={scrollToFeatured}
            className="bg-[#5C1A1B] text-[#E8DCC4] px-8 py-3 rounded-sm font-medium hover:bg-[#4A1516] transition duration-300 flex items-center gap-2"
          >
            Explore Collection <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-serif text-[#5C1A1B] mb-2">New Arrivals</h3>
              <p className="text-stone-500">The latest additions to our royal wardrobe.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProductsFiltered.length > 0 ? (
              featuredProductsFiltered.map((product) => (
                <div key={product.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4 cursor-pointer">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                  
                  {/* FAVOURITE BUTTON */}
                  <button 
                    onClick={() => toggleFavourite(product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition duration-300"
                  >
                    <Heart className={`w-4 h-4 transition ${isFavourite(product.id) ? 'text-red-500 fill-current' : 'text-stone-600'}`} />
                  </button>
                  
                  {/* QUICK ADD BUTTON WIRING */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 w-full bg-[#5C1A1B]/95 text-white py-3 translate-y-full group-hover:translate-y-0 transition duration-300 font-medium hover:bg-[#D4AF37]"
                  >
                    Quick Add to Cart
                  </button>
                </div>
                <div className="space-y-1 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-stone-800 text-lg">{product.name}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-stone-600">{product.rating}</span>
                  </div>
                  <p className="font-medium text-stone-900">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-stone-500">
              No sarees match your search.
            </div>
          )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SareeStore;