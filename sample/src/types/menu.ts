export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  preparationTime: number; // in minutes
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  customizations?: MenuCustomization[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuCustomization {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuStats {
  totalItems: number;
  availableItems: number;
  categories: number;
  averagePrice: number;
  popularItems: MenuItem[];
}