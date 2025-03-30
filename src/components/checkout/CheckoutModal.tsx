'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '@/app/explore/[category]/page';
import { X, AlertCircle, CheckCircle, CreditCard, ArrowLeft, Lock, ChevronDown, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  ticketCount: number;
}

export default function CheckoutModal({ isOpen, onClose, event, ticketCount }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    billingZip: '',
  });

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setStep('confirmation');
  };

  const handleCopyLink = () => {
    // Generate event URL (adjust as needed based on your routing)
    const eventUrl = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const formatPrice = (amount: number, currency: string) => {
    return `${currency}${amount.toFixed(2)}`;
  };

  const formatDate = (date: string, time: string) => {
    return `${date} · ${time}`;
  };

  const totalAmount = event.price.amount * ticketCount;
  const serviceFee = totalAmount * 0.05; // 5% service fee
  const finalTotal = totalAmount + serviceFee;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex h-full"
      >
        {/* Top Navigation Bar - Visible on all screen sizes */}
        <div className="absolute top-0 left-0 right-0 bg-black/80 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white mr-4"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleCopyLink} 
                className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white py-1.5 px-3 rounded-md text-sm"
              >
                <Copy size={16} />
                <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
              </button>
              
              <Link 
                href={`/events/${event.id}`} 
                className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white py-1.5 px-3 rounded-md text-sm"
              >
                <span>Event Page</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Left Panel - Event Details */}
        <div className="hidden md:block w-[45%] bg-[#2a2b38] text-white overflow-auto pt-14">
          <div className="flex flex-col h-full p-12">
            {/* This back button is no longer needed due to the top nav
            <div className="mb-8">
              <button onClick={onClose} className="text-white/70 hover:text-white flex items-center gap-2">
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">EventWave</span>
              </button>
            </div>
            */}
            
            <div className="mb-4">
              <h3 className="text-sm font-normal text-white/60">Event ticket</h3>
              <h2 className="text-3xl font-bold text-white mt-1">{formatPrice(finalTotal, event.price.currency)}</h2>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-8 aspect-video">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white">{event.title}</h3>
              <p className="text-white/60 text-sm mt-1">{formatDate(event.date, event.time)}</p>
              <p className="text-white/60 text-sm">{event.location.name}</p>
              <p className="text-white/60 text-sm mt-1">
                {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
              </p>
            </div>
            
            <div className="space-y-3 mt-auto pt-6 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-white/70">Price ({ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'})</span>
                <span className="text-white">{formatPrice(totalAmount, event.price.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Service Fee</span>
                <span className="text-white">{formatPrice(serviceFee, event.price.currency)}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 border-t border-white/10">
                <span className="text-white">Total</span>
                <span className="text-white">{formatPrice(finalTotal, event.price.currency)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Checkout Form */}
        <div className="flex-1 bg-white overflow-auto pt-14">
          <div className="max-w-md mx-auto px-6 py-12">
            {/* Mobile Header - Only visible on mobile */}
            <div className="md:hidden">
              {/* Removed mobile back button as it's now in the top nav 
              <div className="flex items-center justify-between mb-6">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
                  <ArrowLeft size={16} />
                  <span className="text-sm font-medium">EventWave</span>
                </button>
                <div>
                  {step !== 'details' && step !== 'confirmation' && (
                    <button 
                      onClick={() => setStep('details')}
                      className="text-[#FF5400] hover:text-[#FF5400]/70"
                    >
                      Back
                    </button>
                  )}
                </div>
              </div>
              */}

              <div className="mb-8 flex items-start space-x-4">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{event.title}</h2>
                  <p className="text-gray-500 text-sm">{formatDate(event.date, event.time)}</p>
                  <p className="text-gray-900 font-semibold mt-1">{formatPrice(finalTotal, event.price.currency)}</p>
                </div>
              </div>
            </div>

            {/* Desktop Header - Only visible on desktop */}
            <div className="hidden md:block mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {step === 'details' && 'Your Information'}
                  {step === 'payment' && 'Payment Details'}
                  {step === 'confirmation' && 'Tickets Confirmed!'}
                </h2>
                {step !== 'details' && step !== 'confirmation' && (
                  <button 
                    onClick={() => setStep('details')}
                    className="text-[#FF5400] font-medium hover:text-[#FF5400]/70"
                  >
                    Back
                  </button>
                )}
              </div>
              <div className="mt-6 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' || step === 'payment' || step === 'confirmation' ? 'bg-[#FF5400]' : 'bg-gray-300'} text-white font-medium`}>1</div>
                <div className={`w-12 h-1 ${step === 'payment' || step === 'confirmation' ? 'bg-[#FF5400]' : 'bg-gray-300'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' || step === 'confirmation' ? 'bg-[#FF5400]' : 'bg-gray-300'} text-white font-medium`}>2</div>
                <div className={`w-12 h-1 ${step === 'confirmation' ? 'bg-[#FF5400]' : 'bg-gray-300'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-[#FF5400]' : 'bg-gray-300'} text-white font-medium`}>3</div>
              </div>
            </div>

            {/* Step: Details */}
            {step === 'details' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 md:hidden">Personal Information</h2>
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 text-gray-900 py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 text-gray-900 py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 text-gray-900 py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 text-gray-900 py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                    />
                  </div>

                  <div className="md:hidden pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price ({ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'})</span>
                      <span className="text-gray-900">{formatPrice(totalAmount, event.price.currency)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="text-gray-900">{formatPrice(serviceFee, event.price.currency)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold mt-4 pt-4 border-t border-gray-200">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatPrice(finalTotal, event.price.currency)}</span>
                    </div>
                  </div>

                  {/* Apple Pay Button */}
                  <button
                    type="button"
                    className="w-full mt-6 bg-black text-white font-medium py-3 px-4 rounded-md flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 17 20" className="h-5 w-5">
                      <path fill="currentColor" d="M13.998 6.208c-.023-2.048 1.695-3.087 1.773-3.133-.988-1.418-2.517-1.61-3.05-1.627-1.27-.133-2.514.77-3.162.77-.664 0-1.669-.757-2.75-.736-1.386.02-2.706.836-3.416 2.102-1.489 2.545-.377 6.278 1.05 8.337.716 1.015 1.552 2.145 2.643 2.104 1.068-.045 1.465-.677 2.755-.677 1.272 0 1.645.677 2.755.652 1.14-.02 1.859-1.012 2.542-2.04.823-1.162 1.153-2.302 1.169-2.36-.027-.007-2.218-.833-2.239-3.348-.019-2.077 1.72-3.098 1.798-3.14-.998-1.432-2.538-1.586-3.074-1.614"></path>
                      <path fill="currentColor" d="M12.514 2.822c.576-.723 .966-1.709 .86-2.712-.844.036-1.899.577-2.504 1.283-.536.642-.1025.1.497-.79-.95 2.722 .284-.042 1.644 1.428"></path>
                    </svg>
                    <span>Pay</span>
                  </button>
                  
                  <div className="text-center my-4">
                    <p className="text-sm text-gray-500">Or pay another way</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF5400] text-white font-medium rounded-md hover:bg-[#FF5400]/90 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}
            
            {/* Step: Payment */}
            {step === 'payment' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 md:hidden">Payment Details</h2>
                <form onSubmit={handleSubmitPayment} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full border border-gray-300 text-gray-900 py-2 px-3 rounded-t-md focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                      />
                    </div>
                    <div className="flex border-x border-gray-300">
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM / YY"
                        required
                        className="w-1/2 border-r border-gray-300 text-gray-900 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                      />
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="CVC"
                        required
                        className="w-1/2 text-gray-900 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                      />
                    </div>
                    <input
                      type="text"
                      id="billingZip"
                      name="billingZip"
                      value={formData.billingZip}
                      onChange={handleChange}
                      placeholder="ZIP / Postal code"
                      required
                      className="w-full border border-gray-300 text-gray-900 py-2 px-3 rounded-b-md focus:outline-none focus:ring-1 focus:ring-[#FF5400]"
                    />
                  </div>

                  <div className="md:hidden pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price ({ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'})</span>
                      <span className="text-gray-900">{formatPrice(totalAmount, event.price.currency)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="text-gray-900">{formatPrice(serviceFee, event.price.currency)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold mt-4 pt-4 border-t border-gray-200">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatPrice(finalTotal, event.price.currency)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
                    <Lock size={14} />
                    <span>Your payment info is secure and encrypted</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-[#FF5400] text-white font-medium rounded-md hover:bg-[#FF5400]/90 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : `Pay ${formatPrice(finalTotal, event.price.currency)}`}
                  </button>
                </form>
                
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Lock size={14} className="mr-1" />
                      <span>Powered by <span className="font-medium">Stripe</span></span>
                    </div>
                    <div className="flex space-x-3">
                      <Link href="#" className="hover:text-gray-700">Terms</Link>
                      <Link href="#" className="hover:text-gray-700">Privacy</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step: Confirmation */}
            {step === 'confirmation' && (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle size={50} className="text-green-500" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You, {formData.firstName}!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your payment was successful and your tickets have been confirmed. We've sent a confirmation email to {formData.email}.
                </p>
                
                <div className="bg-gray-50 rounded-lg border border-gray-200 mb-8 text-left">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Information</h3>
                    <p className="text-gray-500 text-sm">Order #{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event</span>
                      <span className="text-gray-900 text-right">{event.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time</span>
                      <span className="text-gray-900 text-right">{formatDate(event.date, event.time)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="text-gray-900 text-right">{event.location.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tickets</span>
                      <span className="text-gray-900 text-right">{ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200 font-bold">
                      <span className="text-gray-900">Total Paid</span>
                      <span className="text-gray-900">{formatPrice(finalTotal, event.price.currency)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#FF5400] text-white font-medium rounded-md hover:bg-[#FF5400]/90 transition-colors"
                >
                  Back to Event
                </button>
                
                <div className="mt-6">
                  <Link 
                    href="/dashboard" 
                    className="text-[#FF5400] hover:text-[#FF5400]/80 transition-colors"
                  >
                    Go to my tickets
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 