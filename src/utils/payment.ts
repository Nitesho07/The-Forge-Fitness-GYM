/**
 * Payment and Checkout utilities for The Forge Fitness.
 * Target UPI routing: 8130987020
 */

export const PAYMENT_CONFIG = {
  receiverPhone: '8130987020',
  receiverPhoneDisplay: '+91 81309 87020',
  payeeName: 'Gym Membership',
  primaryUpiId: '8130987020@upi',
  fallbackUpiIds: ['8130987020@paytm', '8130987020@ybl'],
  currency: 'INR',
};

export interface CheckoutPlanSelection {
  category: 'Standard Pass' | '1-on-1 Trainer Coaching';
  duration: string;
  price: string;
  priceNum: number;
}

/**
 * Builds standard UPI Intent URI:
 * upi://pay?pa=8130987020@upi&pn=Gym%20Membership&am={amount}&cu=INR&tn={plan_category}%20{duration}%20Pass%20for%20{userName}
 */
export function buildUpiUri(
  planCategory: string,
  planDuration: string,
  amount: number,
  userName: string,
  upiId: string = PAYMENT_CONFIG.primaryUpiId
): string {
  const payeeNameEncoded = encodeURIComponent(PAYMENT_CONFIG.payeeName);
  const noteRaw = `${planCategory} ${planDuration} Pass for ${userName.trim()}`;
  const noteEncoded = encodeURIComponent(noteRaw);

  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${payeeNameEncoded}&am=${amount}&cu=${PAYMENT_CONFIG.currency}&tn=${noteEncoded}`;
}

export interface StoredOrder {
  orderId: string;
  userName: string;
  userPhone: string;
  planCategory: 'Standard Pass' | '1-on-1 Trainer Coaching';
  planDuration: string;
  amount: number;
  targetReceiver: string;
  payeeUpi: string;
  status: 'pending' | 'confirmed';
  utrNumber?: string;
  createdAt: string;
  confirmedAt?: string;
}

const LOCAL_STORAGE_KEY = 'forge_membership_orders';

export function getLocalOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalOrder(order: StoredOrder) {
  try {
    const orders = getLocalOrders();
    const existingIndex = orders.findIndex((o) => o.orderId === order.orderId);
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.unshift(order);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save order locally:', err);
  }
}
