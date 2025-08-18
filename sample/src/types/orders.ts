export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  customizations?: string[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'cash' | 'online' | 'card';
  orderType: 'delivery' | 'pickup';
  estimatedTime?: number;
  actualTime?: number;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  readyAt?: string;
  deliveredAt?: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  accepted: number;
  preparing: number;
  ready: number;
  delivered: number;
  cancelled: number;
}

export interface OrderFilters {
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  paymentStatus?: string[];
  orderType?: string[];
}