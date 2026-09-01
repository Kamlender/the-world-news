// ============================================
// TypeScript Types for NewsHub
// ============================================

// ---- Article Types ----

export type ArticleStatus = 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';

export type SourceType =
  | 'GOVERNMENT_RELEASE'
  | 'OFFICIAL_STATEMENT'
  | 'COURT_DOCUMENT'
  | 'PRESS_CONFERENCE'
  | 'NEWS_AGENCY'
  | 'ORIGINAL_REPORTING'
  | 'OTHER';

export type UserRole = 'ADMIN' | 'EDITOR';

export type Language = 'en' | 'hi' | 'hinglish';

// ---- Source ----

export interface Source {
  id: string;
  articleId: string;
  name: string;
  url: string | null;
  sourceType: SourceType;
  createdAt: Date;
}

// ---- Author ----

export interface Author {
  id: string;
  name: string;
  slug: string;
  profileImage: string | null;
  bio: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Category ----

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  status: string;
}

// ---- Article ----

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  imageAlt: string | null;
  authorId: string;
  categoryId: string;
  language: string;
  status: ArticleStatus;
  isBreaking: boolean;
  isFeatured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ---- Article with relations (for display) ----

export interface ArticleWithRelations extends Article {
  author: Author;
  category: Category;
  sources: Source[];
}

// ---- Article Card (for lists / homepage) ----

export interface ArticleCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  imageAlt: string | null;
  isBreaking: boolean;
  isFeatured: boolean;
  publishedAt: Date | null;
  author: {
    name: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

// ---- SEO Metadata ----

export interface ArticleSeo {
  seoTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
}

// ---- User (Admin/Editor) ----

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: string;
}

// ---- API Response Types ----

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ---- Pagination ----

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ---- Homepage Data ----

export interface HomepageData {
  breakingNews: ArticleCard[];
  featuredStory: ArticleCard | null;
  latestNews: ArticleCard[];
  categoryWise: {
    category: Category;
    articles: ArticleCard[];
  }[];
}

// ---- Search ----

export interface SearchResult {
  articles: ArticleCard[];
  query: string;
  total: number;
  page: number;
  totalPages: number;
}

// ---- Dashboard Stats ----

export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  breakingNews: number;
  totalAuthors: number;
  totalCategories: number;
}

// ---- Article Form Data (for create/edit) ----

export interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  categoryId: string;
  authorId: string;
  language: string;
  isBreaking: boolean;
  isFeatured: boolean;
  sources: {
    name: string;
    url: string;
    sourceType: SourceType;
  }[];
  tags: string[];
  seoTitle: string;
  metaDescription: string;
}
