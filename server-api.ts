import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export interface MembershipOrder {
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
  paymentMethod?: string;
  createdAt: string;
  confirmedAt?: string;
}

const ORDERS_FILE = path.resolve(process.cwd(), 'data-orders.json');

// Helper to read orders safely
function getOrders(): MembershipOrder[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

// Helper to write orders safely
function saveOrders(orders: MembershipOrder[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving orders file:', err);
  }
}

export function registerApiRoutes(app: express.Express) {
  app.use(express.json());

  // GET /api/orders - Fetch recent orders or single order by id/phone
  app.get('/api/orders', (req: Request, res: Response) => {
    const { orderId, phone } = req.query;
    const orders = getOrders();

    if (orderId) {
      const order = orders.find((o) => o.orderId === orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      return res.json({ order });
    }

    if (phone) {
      const filtered = orders.filter((o) => o.userPhone.includes(String(phone)));
      return res.json({ orders: filtered });
    }

    // Return latest 20 orders
    return res.json({ orders: orders.slice(-20).reverse() });
  });

  // POST /api/checkout - Create a new pending membership order
  app.post('/api/checkout', (req: Request, res: Response) => {
    try {
      const {
        userName,
        userPhone,
        planCategory,
        planDuration,
        amount,
        targetReceiver = '8130987020',
        payeeUpi = '8130987020@upi',
      } = req.body;

      if (!userName || typeof userName !== 'string' || userName.trim().length < 2) {
        return res.status(400).json({ error: 'Full name is required (min 2 characters).' });
      }

      const cleanPhone = (userPhone || '').toString().replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        return res.status(400).json({ error: 'Phone number must be exactly 10 digits.' });
      }

      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid payable amount.' });
      }

      const orderId = `FORGE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder: MembershipOrder = {
        orderId,
        userName: userName.trim(),
        userPhone: cleanPhone,
        planCategory: planCategory || 'Standard Pass',
        planDuration: planDuration || '1 Month',
        amount,
        targetReceiver: '8130987020',
        payeeUpi,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const orders = getOrders();
      orders.push(newOrder);
      saveOrders(orders);

      return res.status(201).json({
        success: true,
        message: 'Order created successfully. Please complete UPI payment.',
        order: newOrder,
      });
    } catch (err: any) {
      console.error('Checkout error:', err);
      return res.status(500).json({ error: 'Internal server error processing checkout' });
    }
  });

  // POST /api/orders/confirm - Update order with UTR / Transaction ID
  app.post('/api/orders/confirm', (req: Request, res: Response) => {
    try {
      const { orderId, utrNumber } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      const orders = getOrders();
      const orderIndex = orders.findIndex((o) => o.orderId === orderId);

      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const cleanUtr = utrNumber ? String(utrNumber).trim() : undefined;

      orders[orderIndex] = {
        ...orders[orderIndex],
        status: 'confirmed',
        utrNumber: cleanUtr || orders[orderIndex].utrNumber || 'CONFIRMED_BY_USER',
        confirmedAt: new Date().toISOString(),
      };

      saveOrders(orders);

      return res.json({
        success: true,
        message: 'Payment verification recorded. Welcome to The Forge Fitness!',
        order: orders[orderIndex],
      });
    } catch (err: any) {
      console.error('Confirmation error:', err);
      return res.status(500).json({ error: 'Internal server error verifying payment' });
    }
  });
}
