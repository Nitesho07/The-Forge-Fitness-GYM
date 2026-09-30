import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X,
  CreditCard,
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  Phone,
  User,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Clock,
  Dumbbell,
  AlertCircle,
} from 'lucide-react';
import {
  PAYMENT_CONFIG,
  CheckoutPlanSelection,
  buildUpiUri,
  saveLocalOrder,
  StoredOrder,
} from '../utils/payment';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: CheckoutPlanSelection | null;
  onPaymentSuccess?: (order: StoredOrder) => void;
}

type Stage = 'details' | 'payment' | 'confirmed';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selection,
  onPaymentSuccess,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [activeUpiId, setActiveUpiId] = useState(PAYMENT_CONFIG.primaryUpiId);

  // Flow & UI states
  const [stage, setStage] = useState<Stage>('details');
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<StoredOrder | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Field validation touched states
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Reset state when opening with new selection & handle Escape key / body scroll lock
  useEffect(() => {
    if (isOpen) {
      setStage('details');
      setErrorMsg(null);
      setUtrNumber('');
      setNameTouched(false);
      setPhoneTouched(false);
      setActiveUpiId(PAYMENT_CONFIG.primaryUpiId);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, selection, onClose]);

  // Validation rules
  const cleanPhone = phone.replace(/\D/g, '');
  const isNameValid = fullName.trim().length >= 2;
  const isPhoneValid = cleanPhone.length === 10;
  const isFormValid = isNameValid && isPhoneValid;

  // Active UPI Intent URI
  const upiUri = selection
    ? buildUpiUri(
        selection.category,
        selection.duration,
        selection.priceNum,
        fullName || 'Athlete',
        activeUpiId
      )
    : '';

  // Generate QR Code dynamically
  useEffect(() => {
    if (stage === 'payment' && upiUri) {
      QRCode.toDataURL(upiUri, {
        width: 320,
        margin: 2,
        color: {
          dark: '#101417',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation failed:', err));
    }
  }, [stage, upiUri, activeUpiId]);

  if (!isOpen || !selection) return null;

  const isTrainerPlan = selection.category === '1-on-1 Trainer Coaching';
  const accentColor = isTrainerPlan ? '#D6A83A' : '#D7FF00';
  const accentBgLight = isTrainerPlan ? 'rgba(214, 168, 58, 0.12)' : 'rgba(215, 255, 0, 0.12)';
  const accentBorder = isTrainerPlan ? 'rgba(214, 168, 58, 0.3)' : 'rgba(215, 255, 0, 0.3)';

  // Handle proceeding from Details to Payment Stage
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setPhoneTouched(true);

    if (!isNameValid) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!isPhoneValid) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      // Call backend API /api/checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: fullName.trim(),
          userPhone: cleanPhone,
          planCategory: selection.category,
          planDuration: selection.duration,
          amount: selection.priceNum,
          targetReceiver: PAYMENT_CONFIG.receiverPhone,
          payeeUpi: activeUpiId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentOrder(data.order);
        saveLocalOrder(data.order);
      } else {
        // Fallback local order if API not reachable
        const fallbackOrder: StoredOrder = {
          orderId: `FORGE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
          userName: fullName.trim(),
          userPhone: cleanPhone,
          planCategory: selection.category,
          planDuration: selection.duration,
          amount: selection.priceNum,
          targetReceiver: PAYMENT_CONFIG.receiverPhone,
          payeeUpi: activeUpiId,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        setCurrentOrder(fallbackOrder);
        saveLocalOrder(fallbackOrder);
      }

      setStage('payment');
    } catch (err) {
      console.warn('Backend unavailable, proceeding with client-side order creation:', err);
      const fallbackOrder: StoredOrder = {
        orderId: `FORGE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        userName: fullName.trim(),
        userPhone: cleanPhone,
        planCategory: selection.category,
        planDuration: selection.duration,
        amount: selection.priceNum,
        targetReceiver: PAYMENT_CONFIG.receiverPhone,
        payeeUpi: activeUpiId,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setCurrentOrder(fallbackOrder);
      saveLocalOrder(fallbackOrder);
      setStage('payment');
    } finally {
      setLoading(false);
    }
  };

  // Handle Confirming Payment (with optional UTR)
  const handleConfirmPayment = async () => {
    if (!currentOrder) return;
    setLoading(true);

    try {
      const response = await fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: currentOrder.orderId,
          utrNumber: utrNumber.trim() || undefined,
        }),
      });

      let updatedOrder: StoredOrder = {
        ...currentOrder,
        status: 'confirmed',
        utrNumber: utrNumber.trim() || 'CONFIRMED_BY_ATHLETE',
        confirmedAt: new Date().toISOString(),
      };

      if (response.ok) {
        const data = await response.json();
        if (data.order) updatedOrder = data.order;
      }

      setCurrentOrder(updatedOrder);
      saveLocalOrder(updatedOrder);
      if (onPaymentSuccess) {
        onPaymentSuccess(updatedOrder);
      }
      setStage('confirmed');
    } catch (err) {
      console.error('Error confirming payment:', err);
      // Fallback update
      const updatedOrder: StoredOrder = {
        ...currentOrder,
        status: 'confirmed',
        utrNumber: utrNumber.trim() || 'CONFIRMED_BY_ATHLETE',
        confirmedAt: new Date().toISOString(),
      };
      setCurrentOrder(updatedOrder);
      saveLocalOrder(updatedOrder);
      setStage('confirmed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(activeUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PAYMENT_CONFIG.receiverPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg bg-[#14191D] border border-[#263138] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        {/* Top Accent Line */}
        <div
          className="h-1.5 w-full"
          style={{
            background: isTrainerPlan
              ? 'linear-gradient(90deg, #D6A83A 0%, #F5F7F8 50%, #D6A83A 100%)'
              : 'linear-gradient(90deg, #D7FF00 0%, #F5F7F8 50%, #D7FF00 100%)',
          }}
        />

        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#222B30] flex items-center justify-between bg-[#101417]/80">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{
                backgroundColor: accentBgLight,
                borderColor: accentBorder,
                color: accentColor,
              }}
            >
              {stage === 'confirmed' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <CreditCard className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9BA3A8] block">
                THE FORGE MEMBERSHIP CHECKOUT
              </span>
              <h2
                id="checkout-modal-title"
                className="font-heading font-black text-xl sm:text-2xl uppercase tracking-wide text-[#F5F7F8]"
              >
                {stage === 'details' && 'Athlete Registration'}
                {stage === 'payment' && 'Complete UPI Payment'}
                {stage === 'confirmed' && 'Membership Confirmed'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2 text-[#9BA3A8] hover:text-[#F5F7F8] hover:bg-[#1E262B] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Tier Banner Summary */}
        <div className="bg-[#101417] px-5 sm:px-6 py-3.5 border-b border-[#222B30] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#F5F7F8]">
                  {selection.category}
                </span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold"
                  style={{
                    backgroundColor: accentBgLight,
                    color: accentColor,
                    border: `1px solid ${accentBorder}`,
                  }}
                >
                  {selection.duration}
                </span>
              </div>
              <p className="text-[11px] text-[#9BA3A8] font-mono">
                Direct facility access & coaching
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#9BA3A8] block">
              Payable Amount
            </span>
            <span
              className="font-heading font-black text-xl sm:text-2xl tracking-tight"
              style={{ color: accentColor }}
            >
              {selection.price}
            </span>
          </div>
        </div>

        {/* STAGE 1: Athlete Details Form */}
        {stage === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-5 sm:p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="checkout-name"
                className="block text-xs font-mono uppercase tracking-wider text-[#9BA3A8] mb-1.5"
              >
                Full Name <span className="text-[#D7FF00]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9BA3A8]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  placeholder="e.g. Nitesh Kumar"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  onBlur={() => setNameTouched(true)}
                  className={`w-full bg-[#101417] border rounded-lg pl-10 pr-3.5 py-3 text-sm text-[#F5F7F8] placeholder-[#9BA3A8]/50 focus:outline-none transition-colors ${
                    nameTouched && !isNameValid
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-[#263138] focus:border-[#D7FF00]'
                  }`}
                />
              </div>
              {nameTouched && !isNameValid && (
                <p className="mt-1 text-[11px] text-red-400 font-mono">
                  Full name must be at least 2 characters.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="block text-xs font-mono uppercase tracking-wider text-[#9BA3A8] mb-1.5"
              >
                10-Digit Mobile Number <span className="text-[#D7FF00]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9BA3A8]">
                  <span className="text-xs font-mono text-[#9BA3A8] mr-1.5 border-r border-[#263138] pr-2">
                    +91
                  </span>
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(onlyNums);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  onBlur={() => setPhoneTouched(true)}
                  className={`w-full bg-[#101417] border rounded-lg pl-22 pr-3.5 py-3 text-sm font-mono text-[#F5F7F8] placeholder-[#9BA3A8]/50 focus:outline-none transition-colors ${
                    phoneTouched && !isPhoneValid
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-[#263138] focus:border-[#D7FF00]'
                  }`}
                />
              </div>
              {phoneTouched && !isPhoneValid && (
                <p className="mt-1 text-[11px] text-red-400 font-mono">
                  Enter a valid 10-digit phone number.
                </p>
              )}
            </div>

            {/* Official Receiver Routing Trust Note */}
            <div className="p-3 bg-[#101417] border border-[#222B30] rounded-xl flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
              <div className="text-xs text-[#9BA3A8] leading-relaxed">
                <p>
                  Official receiver number:{' '}
                  <span className="font-mono text-[#F5F7F8] font-bold">
                    {PAYMENT_CONFIG.receiverPhoneDisplay}
                  </span>
                  .
                </p>
                <p className="text-[11px] text-[#9BA3A8]/80 mt-0.5">
                  UPI ID:{' '}
                  <span className="font-mono text-[#D7FF00]">{PAYMENT_CONFIG.primaryUpiId}</span>{' '}
                  (Payee: {PAYMENT_CONFIG.payeeName})
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 px-4 rounded-xl text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-lg active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: accentColor,
                color: '#101417',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>PREPARING PAYMENT GATEWAY...</span>
                </>
              ) : (
                <>
                  <span>PROCEED TO PAYMENT ({selection.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STAGE 2: UPI Intent & Dynamic QR Code */}
        {stage === 'payment' && currentOrder && (
          <div className="p-5 sm:p-6 space-y-5">
            {/* Order Reference Pill */}
            <div className="flex items-center justify-between text-xs bg-[#101417] px-3.5 py-2 rounded-lg border border-[#222B30]">
              <span className="font-mono text-[#9BA3A8]">Order Ref:</span>
              <span className="font-mono font-bold text-[#D7FF00]">{currentOrder.orderId}</span>
            </div>

            {/* Mobile Direct UPI Intent Button */}
            <div className="space-y-2">
              <a
                href={upiUri}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-95 border"
                style={{
                  backgroundColor: accentColor,
                  color: '#101417',
                  borderColor: accentColor,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>PAY VIA UPI APP (GPAY / PHONEPE / PAYTM)</span>
              </a>
              <p className="text-[11px] text-center text-[#9BA3A8] font-mono">
                Tap above on mobile to open your installed UPI app with auto-filled details.
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#263138] w-full" />
              <span className="bg-[#14191D] px-3 text-[11px] font-mono text-[#9BA3A8] uppercase tracking-wider">
                OR SCAN QR CODE
              </span>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-3 bg-white rounded-2xl shadow-xl border border-white/20 relative group">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="UPI Payment QR Code"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-gray-100 text-gray-500">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                )}
              </div>
              <p className="text-xs text-[#9BA3A8] mt-2 font-mono text-center">
                Scan with any UPI App: Google Pay, PhonePe, Paytm, Cred, BHIM
              </p>
            </div>

            {/* UPI ID Copy Box */}
            <div className="bg-[#101417] p-3.5 rounded-xl border border-[#263138] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-[#9BA3A8]">Primary UPI ID:</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="inline-flex items-center gap-1.5 text-xs text-[#D7FF00] hover:text-white font-mono cursor-pointer transition-colors"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-2.5 bg-[#171E23] rounded-lg border border-[#2a363d] flex items-center justify-between">
                <code className="text-sm font-mono font-bold text-[#F5F7F8]">{activeUpiId}</code>
                <span className="text-[10px] font-mono text-[#9BA3A8]">Payee: {PAYMENT_CONFIG.payeeName}</span>
              </div>

              {/* Alternate UPI IDs toggle */}
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-[#9BA3A8]">Fallbacks:</span>
                {PAYMENT_CONFIG.fallbackUpiIds.map((altUpi) => (
                  <button
                    key={altUpi}
                    type="button"
                    onClick={() => setActiveUpiId(altUpi)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      activeUpiId === altUpi
                        ? 'border-[#D7FF00] text-[#D7FF00] bg-[#D7FF00]/10'
                        : 'border-[#263138] text-[#9BA3A8] hover:text-[#F5F7F8]'
                    }`}
                  >
                    {altUpi}
                  </button>
                ))}
              </div>
            </div>

            {/* Receiver Phone Direct Number */}
            <div className="bg-[#101417] p-3 rounded-xl border border-[#222B30] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D7FF00]" />
                <div>
                  <span className="text-[10px] font-mono text-[#9BA3A8] block">Receiver Phone:</span>
                  <span className="text-xs font-mono font-bold text-[#F5F7F8]">
                    {PAYMENT_CONFIG.receiverPhoneDisplay}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="text-xs text-[#9BA3A8] hover:text-white font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* UTR / Transaction ID Input & Confirm Button */}
            <div className="border-t border-[#263138] pt-4 space-y-3">
              <div>
                <label
                  htmlFor="checkout-utr"
                  className="block text-xs font-mono uppercase tracking-wider text-[#9BA3A8] mb-1"
                >
                  Enter 12-Digit UTR / Transaction ID (Optional)
                </label>
                <input
                  id="checkout-utr"
                  type="text"
                  maxLength={16}
                  placeholder="e.g. 4253XXXXXXXX / Ref ID"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full bg-[#101417] border border-[#263138] focus:border-[#D7FF00] rounded-lg px-3.5 py-2.5 text-xs font-mono text-[#F5F7F8] placeholder-[#9BA3A8]/50 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStage('details')}
                  className="w-1/3 py-3 px-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-[#101417] border border-[#263138] text-[#9BA3A8] hover:text-white transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={loading}
                  className="w-2/3 py-3 px-4 rounded-xl text-xs font-heading font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-lg active:scale-95 text-[#101417]"
                  style={{
                    backgroundColor: accentColor,
                  }}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>VERIFYING...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>I HAVE COMPLETED PAYMENT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: Confirmed / Welcome Screen */}
        {stage === 'confirmed' && currentOrder && (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(52,211,153,0.3)]">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7FF00] block mb-1">
                MEMBERSHIP RECORDED
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-wide text-[#F5F7F8]">
                WELCOME TO THE FORGE, {fullName.split(' ')[0] || 'ATHLETE'}!
              </h3>
              <p className="text-xs sm:text-sm text-[#9BA3A8] mt-2 max-w-sm mx-auto">
                Your payment registration for{' '}
                <span className="text-[#F5F7F8] font-bold">
                  {currentOrder.planCategory} ({currentOrder.planDuration})
                </span>{' '}
                has been logged.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#101417] p-4 rounded-xl border border-[#263138] text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#222B30]">
                <span className="text-[#9BA3A8]">Order ID:</span>
                <span className="text-[#F5F7F8] font-bold">{currentOrder.orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#222B30]">
                <span className="text-[#9BA3A8]">Amount Paid:</span>
                <span className="text-[#D7FF00] font-bold">₹{currentOrder.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#222B30]">
                <span className="text-[#9BA3A8]">Member Phone:</span>
                <span className="text-[#F5F7F8]">{currentOrder.userPhone}</span>
              </div>
              {currentOrder.utrNumber && (
                <div className="flex justify-between py-1 border-b border-[#222B30]">
                  <span className="text-[#9BA3A8]">UTR / Ref:</span>
                  <span className="text-[#F5F7F8]">{currentOrder.utrNumber}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-[#9BA3A8]">Facility Address:</span>
                <span className="text-[#F5F7F8] text-right">Budh Vihar Phase I</span>
              </div>
            </div>

            <div className="p-3 bg-[#171E23] rounded-xl border border-[#2a363d] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-left">
                <Phone className="w-4 h-4 text-[#D7FF00]" />
                <div>
                  <span className="text-[10px] font-mono text-[#9BA3A8] block">Facility Helpline:</span>
                  <a
                    href="tel:8130987020"
                    className="font-mono font-bold text-[#F5F7F8] hover:text-[#D7FF00]"
                  >
                    +91 81309 87020
                  </a>
                </div>
              </div>
              <a
                href="https://wa.me/918130987020?text=Hi%20The%20Forge%20Fitness,%20I%20have%20completed%20membership%20payment%20for%20order%20"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] rounded-lg text-xs font-mono font-bold hover:bg-[#25D366]/30 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-heading font-black uppercase tracking-wider bg-[#D7FF00] hover:bg-[#c6ec00] text-[#101417] cursor-pointer transition-colors shadow-lg"
            >
              DONE & RETURN TO SITE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
