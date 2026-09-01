/**
 * Constants for NewsHub
 * Central place for all configuration values
 */

// ============================================
// APP INFO
// ============================================

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'The World News';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'Fast, trustworthy news — discover what matters.';

// ============================================
// CATEGORIES (for navigation)
// ============================================

export const CATEGORIES = [
  { name: 'India', slug: 'india' },
  { name: 'World', slug: 'world' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Business', slug: 'business' },
  { name: 'Technology', slug: 'technology' },
  { name: 'Sports', slug: 'sports' },
] as const;

// ============================================
// LANGUAGES
// ============================================

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'hinglish', name: 'Hinglish', nativeName: 'Hinglish' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
] as const;

// ============================================
// SOURCE TYPES
// ============================================

export const SOURCE_TYPES = [
  { value: 'GOVERNMENT_RELEASE', label: 'Government Release' },
  { value: 'OFFICIAL_STATEMENT', label: 'Official Statement' },
  { value: 'COURT_DOCUMENT', label: 'Court Document' },
  { value: 'PRESS_CONFERENCE', label: 'Press Conference' },
  { value: 'NEWS_AGENCY', label: 'News Agency' },
  { value: 'ORIGINAL_REPORTING', label: 'Original Reporting' },
  { value: 'OTHER', label: 'Other' },
] as const;

// ============================================
// ARTICLE STATUSES
// ============================================

export const ARTICLE_STATUSES = {
  DRAFT: { label: 'Draft', color: '#f59e0b' },
  PUBLISHED: { label: 'Published', color: '#10b981' },
  UNPUBLISHED: { label: 'Unpublished', color: '#ef4444' },
} as const;

// ============================================
// PAGINATION
// ============================================

export const DEFAULT_PAGE_SIZE = 20;
export const HOMEPAGE_LATEST_COUNT = 12;
export const HOMEPAGE_CATEGORY_COUNT = 4;
export const BREAKING_NEWS_LIMIT = 5;
export const RELATED_ARTICLES_COUNT = 4;
export const SEARCH_PAGE_SIZE = 20;

// ============================================
// IMAGE CONFIG
// ============================================

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const IMAGE_QUALITY = 80;
