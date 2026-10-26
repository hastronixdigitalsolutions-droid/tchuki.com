import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Business,
  BusinessService,
  Product,
  Project,
  Article,
  Testimonial,
  Inquiry,
  SiteSettings,
  MediaAsset,
} from '../types';
import {
  initialBusinesses,
  initialServices,
  initialProducts,
  initialProjects,
  initialArticles,
  initialTestimonials,
  initialInquiries,
  initialSiteSettings,
  initialMediaAssets,
} from '../data/initialData';
import { getAssetUrl } from '../utils/assets';

const STORAGE_KEY = 'tchuki_corporate_storage_v2';

const LEGACY_ASSET_URLS: Record<string, string> = {
  '/assets/tchuki_farms_logo.svg': '/assets/tchuki_farms_logo.jpg',
  '/assets/tchuki_digital_logo.svg': '/assets/tchuki_digital_logo.png',
  '/assets/biokash_50kg_bag_packshot_1792798452301.jpg': '/assets/biokash_50kg_bag.png',
  '/assets/biokash_fertilizer_pack_1792796708484.jpg': '/assets/biokash_50kg_bag.png',
};

const LEGACY_FARM_SUMMARY =
  'Modern smart agriculture, BioKash Organic Fertilizer, quality seedlings, and practical farmer advisory services.';
const LEGACY_FARM_DESCRIPTION =
  'Tchuki Farms is transforming agricultural productivity and sustainability in Malawi and the broader region. We produce high-grade organic inputs including our signature BioKash Organic Fertilizer, distribute resilient high-yield seedlings, operate modern demonstration nurseries, and train smallholder and commercial farmers in climate-smart agricultural techniques.';
const FARM_SUMMARY_BEFORE_DELIVERY =
  'BioKash Organic Fertilizer, farm inputs, quality seedlings, advisory support, and maize sheller hire.';
const FARM_DESCRIPTION_BEFORE_DELIVERY =
  'Tchuki Farms provides agricultural services and inputs in Malawi, including BioKash Organic Fertilizer, seeds, inoculants, pesticides, farmer advisory, and maize sheller hire. The team also supports farmers through practical training and is preparing a smart farming app with crop guidance, weather and market information.';
const FARM_INPUTS_DESCRIPTION_BEFORE_DELIVERY =
  'Tchuki Farms provides farming support, extension, land preparation, and inputs including BioKash Organic Fertilizer, maize and legume seeds, vegetable seeds, inoculants, and pesticides. The supplied banner also lists livestock, feed, and veterinary support. Contact us to confirm current stock and service availability.';
const ADDED_FARM_FEATURES = [
  'Quality Livestock Supply (Cattle, Goats, Sheep, Pigs & Poultry)',
  'Connecting Farmers with Livestock for Business Growth & Food Security',
  'Supporting Farmers & Livestock Businesses Across Malawi',
  'Agricultural Inputs: BioKash, Seeds, Inoculants & Pesticides',
  'Maize Sheller Hire',
  'Smart Farming App (Coming Soon)',
  'Livestock, Tree Seedling & Agricultural Product Supply and Delivery',
];
const LEGACY_BIOKASH_PROJECT_DESCRIPTION =
  'Controlled comparative trials showing root depth, crop thickness, and output differences between chemical inputs and BioKash Organic Fertilizer.';

export const normalizeAssetUrl = (url: string) => {
  if (!url) return '';
  const mapped = LEGACY_ASSET_URLS[url] || url;
  return getAssetUrl(mapped);
};
export const normalizeAssetUrls = (urls: string[]) => [...new Set(urls.map(normalizeAssetUrl))];

function appendMissingBySlug<T extends { slug: string }>(savedItems: T[], defaultItems: T[]) {
  const savedSlugs = new Set(savedItems.map((item) => item.slug));
  return [...savedItems, ...defaultItems.filter((item) => !savedSlugs.has(item.slug))];
}

interface DataContextType {
  businesses: Business[];
  services: BusinessService[];
  products: Product[];
  projects: Project[];
  articles: Article[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  settings: SiteSettings;
  media: MediaAsset[];
  
  // Businesses
  addBusiness: (business: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => void;
  updateBusiness: (id: string, updates: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;

  // Services
  addService: (service: Omit<BusinessService, 'id' | 'created_at' | 'updated_at'>) => void;
  updateService: (id: string, updates: Partial<BusinessService>) => void;
  deleteService: (id: string) => void;

  // Products
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Projects
  addProject: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Articles
  addArticle: (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Testimonials
  addTestimonial: (item: Omit<Testimonial, 'id' | 'created_at'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Inquiries
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at' | 'updated_at'>) => boolean;
  updateInquiryStatus: (id: string, status: Inquiry['status'], internal_notes?: string) => void;
  deleteInquiry: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Reset
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_businesses`);
    return saved
      ? (JSON.parse(saved) as Business[]).map((business) => {
          const isFarms = business.id === 'tchuki-farms';
          const farmDefaults = initialBusinesses.find((item) => item.id === business.id);

          return {
            ...business,
            slogan: isFarms ? farmDefaults?.slogan || business.slogan : business.slogan,
            logo_url: normalizeAssetUrl(business.logo_url),
            cover_image_url: isFarms ? farmDefaults?.cover_image_url || business.cover_image_url : normalizeAssetUrl(business.cover_image_url),
            short_description: isFarms ? farmDefaults?.short_description || business.short_description : business.short_description,
            full_description: isFarms ? farmDefaults?.full_description || business.full_description : business.full_description,
            features: isFarms
              ? [...new Set([...business.features, ...ADDED_FARM_FEATURES])]
              : business.features,
          };
        })
      : initialBusinesses;
  });

  const [services, setServices] = useState<BusinessService[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    if (!saved) return initialServices;

    const savedServices = (JSON.parse(saved) as BusinessService[]).map((service) => ({
      ...service,
      image_url: service.image_url ? normalizeAssetUrl(service.image_url) : service.image_url,
      description:
        service.slug === 'agricultural-services-input-supply' &&
        service.description === FARM_INPUTS_DESCRIPTION_BEFORE_DELIVERY
          ? initialServices.find((item) => item.slug === service.slug)?.description || service.description
          : service.description,
    }));
    return appendMissingBySlug(savedServices, initialServices);
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
    if (!saved) return initialProducts;
    const savedProducts = (JSON.parse(saved) as Product[]).map((product) => ({
      ...product,
      image_urls: normalizeAssetUrls(product.image_urls),
    }));
    return appendMissingBySlug(savedProducts, initialProducts);
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    if (!saved) return initialProjects;

    const savedProjects = (JSON.parse(saved) as Project[]).map((project) => {
      const isBioKashGarden = project.slug === 'community-biokash-demonstration-plots';
      const hasLegacyBioKashMetrics = project.metrics?.some(
        (metric) => metric.label === 'Yield Increase vs Control' && metric.value === '+32%'
      );

      return {
        ...project,
        title:
          isBioKashGarden && project.title === 'Community BioKash Demonstration Plots'
            ? 'BioKash Maize Garden'
            : project.title,
        category:
          isBioKashGarden && project.category === 'Agronomy Research'
            ? 'BioKash & Crop Production'
            : project.category,
        description:
          isBioKashGarden && project.description === LEGACY_BIOKASH_PROJECT_DESCRIPTION
            ? 'A maize garden photo supplied for Tchuki Farms’ BioKash work. It shows healthy, established maize plants in the field. Contact Tchuki Farms for BioKash product information and crop-use guidance.'
            : project.description,
        cover_image_url: isBioKashGarden
          ? '/assets/biokash-maize-garden.jpg'
          : normalizeAssetUrl(project.cover_image_url),
        before_image_url: project.before_image_url
          ? normalizeAssetUrl(project.before_image_url)
          : project.before_image_url,
        after_image_url: project.after_image_url
          ? normalizeAssetUrl(project.after_image_url)
          : project.after_image_url,
        gallery_urls: isBioKashGarden
          ? ['/assets/biokash-maize-garden.jpg', '/assets/biokash_50kg_bag.png']
          : normalizeAssetUrls(project.gallery_urls),
        metrics: isBioKashGarden && hasLegacyBioKashMetrics ? undefined : project.metrics,
      };
    });
    return appendMissingBySlug(savedProjects, initialProjects);
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_articles`);
    if (!saved) return initialArticles;
    const savedArticles = JSON.parse(saved) as Article[];
    return appendMissingBySlug(savedArticles, initialArticles);
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [media] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_media`);
    if (!saved) return initialMediaAssets;

    const savedMedia = (JSON.parse(saved) as MediaAsset[]).map((asset) => ({
      ...asset,
      url: normalizeAssetUrl(asset.url),
    }));
    const savedUrls = new Set(savedMedia.map((asset) => asset.url));
    return [...savedMedia, ...initialMediaAssets.filter((asset) => !savedUrls.has(asset.url))];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_businesses`, JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_articles`, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
  }, [settings]);

  // Businesses actions
  const addBusiness = (data: Omit<Business, 'id' | 'created_at' | 'updated_at'>) => {
    const newBiz: Business = {
      ...data,
      id: `biz-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setBusinesses(prev => [...prev, newBiz]);
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updates, updated_at: new Date().toISOString() } : b))
    );
  };

  const deleteBusiness = (id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
  };

  // Services actions
  const addService = (data: Omit<BusinessService, 'id' | 'created_at' | 'updated_at'>) => {
    const newService: BusinessService = {
      ...data,
      id: `srv-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updates: Partial<BusinessService>) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Products actions
  const addProduct = (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const newProd: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProd]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Projects actions
  const addProject = (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const newProj: Project = {
      ...data,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Articles actions
  const addArticle = (data: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    const newArt: Article = {
      ...data,
      id: `art-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setArticles(prev => [newArt, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updates, updated_at: new Date().toISOString() } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  // Testimonials
  const addTestimonial = (data: Omit<Testimonial, 'id' | 'created_at'>) => {
    const newTest: Testimonial = {
      ...data,
      id: `test-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setTestimonials(prev => [...prev, newTest]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Inquiries
  const submitInquiry = (data: Omit<Inquiry, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    const newInq: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setInquiries(prev => [newInq, ...prev]);
    return true;
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status'], internal_notes?: string) => {
    setInquiries(prev =>
      prev.map(i =>
        i.id === id
          ? {
              ...i,
              status,
              ...(internal_notes !== undefined ? { internal_notes } : {}),
              updated_at: new Date().toISOString(),
            }
          : i
      )
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setBusinesses(initialBusinesses);
    setServices(initialServices);
    setProducts(initialProducts);
    setProjects(initialProjects);
    setArticles(initialArticles);
    setTestimonials(initialTestimonials);
    setInquiries(initialInquiries);
    setSettings(initialSiteSettings);
    localStorage.removeItem(`${STORAGE_KEY}_businesses`);
    localStorage.removeItem(`${STORAGE_KEY}_services`);
    localStorage.removeItem(`${STORAGE_KEY}_products`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_articles`);
    localStorage.removeItem(`${STORAGE_KEY}_testimonials`);
    localStorage.removeItem(`${STORAGE_KEY}_inquiries`);
    localStorage.removeItem(`${STORAGE_KEY}_settings`);
  };

  return (
    <DataContext.Provider
      value={{
        businesses,
        services,
        products,
        projects,
        articles,
        testimonials,
        inquiries,
        settings,
        media,
        addBusiness,
        updateBusiness,
        deleteBusiness,
        addService,
        updateService,
        deleteService,
        addProduct,
        updateProduct,
        deleteProduct,
        addProject,
        updateProject,
        deleteProject,
        addArticle,
        updateArticle,
        deleteArticle,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
