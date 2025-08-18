import { NavigatorScreenParams } from '@react-navigation/native';

// Import the new navigator types
import { InventoryStackParamList } from './InventoryNavigator';
import { HyperpureStackParamList } from './HyperpureNavigator';
import { FeedbackStackParamList } from './FeedbackNavigator';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<TabParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: {
    phone: string;
  };
};

export type TabParamList = {
  Orders: NavigatorScreenParams<OrdersStackParamList>;
  Inventory: NavigatorScreenParams<InventoryStackParamList>;
  Feedback: NavigatorScreenParams<FeedbackStackParamList>;
  Hyperpure: NavigatorScreenParams<HyperpureStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type OrdersStackParamList = {
  NewOrders: undefined;
  ActiveOrders: undefined;
  OrderDetails: {
    orderId: string;
  };
  OrderHistory: undefined;
};

export type MenuStackParamList = {
  MenuOverview: undefined;
  AddProduct: undefined;
  EditProduct: {
    productId: string;
  };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  Support: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}