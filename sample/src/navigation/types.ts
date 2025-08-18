import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Import the new navigator types
import { InventoryStackParamList } from './InventoryNavigator';
import { FeedbackStackParamList } from './FeedbackNavigator';

export type RootStackParamList = {
  Splash: undefined;
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
  Hub: NavigatorScreenParams<HubStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type OrdersStackParamList = {
  OrderDashboard: undefined;
  NewOrders: undefined;
  ActiveOrders: undefined;
  OrderDetails: {
    orderId: string;
  };
  OrderHistory: undefined;
};

// Navigation prop types for screens
export type OrderDashboardScreenNavigationProp = StackNavigationProp<
  OrdersStackParamList,
  'OrderDashboard'
>;

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
  Timings: undefined;
  ContactDetails: undefined;
  ViewPermissions: undefined;
  FSSAI: undefined;
  GSTIN: undefined;
  BankDetails: undefined;
  DisplayPicture: undefined;
  NameAddressLocation: undefined;
  UpdateOutletName: undefined;
  UpdateOutletAddressLocation: undefined;
  RatingsReviews: undefined;
  DeliveryAreaChanges: undefined;
  RestaurantOwnership: undefined;
  ContactAccountManager: undefined;
  OutletInfo: undefined;
};

export type HubStackParamList = {
  HubMain: undefined;
  ContactAccountManager: undefined;
  OrderHistory: undefined;
  Payouts: undefined;
  ShareFeedback: undefined;
  SmartLink: undefined;
  ExploreMore: undefined;
  OutletInfo: undefined;
  Timings: undefined;
  ContactDetails: undefined;
  ImportantContacts: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
  Troubleshoot: undefined;
  ManageCommunications: undefined;
  DeliverySettings: undefined;
  RushHour: undefined;
  ScheduleOff: undefined;
  Complaints: undefined;
  Reviews: undefined;
  HelpCentre: undefined;
  OutletStatus: undefined;
  PaymentBilling: undefined;
  CustomerSupport: undefined;
  GeneralInformation: undefined;
  Invoices: undefined;
  Taxes: undefined;
  ProfileData: undefined;
  Test: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}