export interface Business {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  slogan: string;
  category: string;
  logo_url: string;
  cover_image_url: string;
  brand_color: string;
  email: string;
  phone: string;
  website_url?: string;
  display_order: number;
  status: 'published' | 'draft' | 'archived';
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface BusinessService {
  id: string;
  business_id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon_name: string;
  image_url?: string;
  status: 'published' | 'draft' | 'archived';
  display_order: number;
  featured_on_home: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image_urls: string[];
  price?: number;
  currency?: string;
  availability_status: 'in_stock' | 'preorder' | 'made_to_order' | 'inquire';
  publication_status: 'published' | 'draft' | 'archived';
  features: string[];
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  business_id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image_url: string;
  gallery_urls: string[];
  before_image_url?: string;
  after_image_url?: string;
  project_status: 'completed' | 'ongoing' | 'planned';
  external_url?: string;
  publication_status: 'published' | 'draft' | 'archived';
  metrics?: { label: string; value: string }[];
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  business_id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  author_name: string;
  read_time: string;
  publication_status: 'published' | 'draft' | 'archived';
  featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  role: string;
  organization: string;
  photo_url?: string;
  quote: string;
  business_id?: string;
  rating?: number;
  approved: boolean;
  display_order: number;
  created_at: string;
}

export interface Inquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  organization?: string;
  inquiry_type: 'general' | 'product' | 'software' | 'agricultural' | 'marketing' | 'partnership' | 'livestock' | 'other';
  business_id?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'archived';
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  parent_brand: string;
  official_domain: string;
  primary_market: string;
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
  footer_text: string;
  hero_headline: string;
  hero_supporting_text: string;
  hero_primary_cta: string;
  hero_secondary_cta: string;
  show_verified_stats: boolean;
  show_testimonials: boolean;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
  };
  stat_counters: {
    businesses: string;
    industries: string;
    projects: string;
    commitment: string;
  };
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  category: 'farming' | 'digital' | 'corporate' | 'products';
  size: string;
  uploaded_at: string;
}

