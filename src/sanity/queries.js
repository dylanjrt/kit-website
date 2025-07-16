import { groq } from "next-sanity";
import { client } from "./lib/client";

// Items queries
export const allItemsQuery = groq`
  *[_type == "item"] {
    _id,
    title,
    slug,
    description,
    price,
    currency,
    availability,
    featured,
    publishedAt,
    images[] {
      asset->,
      alt,
      caption
    },
    category-> {
      title,
      slug
    },
    tags,
    dimensions,
    materials,
    technique,
    firing
  } | order(publishedAt desc)
`;

export const featuredItemsQuery = groq`
  *[_type == "item" && featured == true] {
    _id,
    title,
    slug,
    description,
    price,
    currency,
    availability,
    images[] {
      asset->,
      alt,
      caption
    },
    category-> {
      title,
      slug
    }
  } | order(publishedAt desc)
`;

export const itemsByCategoryQuery = groq`
  *[_type == "item" && category->slug.current == $categorySlug] {
    _id,
    title,
    slug,
    description,
    price,
    currency,
    availability,
    featured,
    publishedAt,
    images[] {
      asset->,
      alt,
      caption
    },
    category-> {
      title,
      slug
    },
    tags,
    dimensions,
    materials,
    technique,
    firing
  } | order(publishedAt desc)
`;

export const singleItemQuery = groq`
  *[_type == "item" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    detailedDescription,
    price,
    currency,
    availability,
    quantity,
    featured,
    publishedAt,
    images[] {
      asset->,
      alt,
      caption
    },
    category-> {
      title,
      slug
    },
    tags,
    dimensions,
    materials,
    technique,
    firing,
    seo
  }
`;

// Categories queries
export const allCategoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    slug,
    description,
    image {
      asset->,
      alt
    },
    featured,
    sortOrder
  } | order(sortOrder asc, title asc)
`;

export const featuredCategoriesQuery = groq`
  *[_type == "category" && featured == true] {
    _id,
    title,
    slug,
    description,
    image {
      asset->,
      alt
    },
    sortOrder
  } | order(sortOrder asc, title asc)
`;

// Artist queries
export const artistQuery = groq`
  *[_type == "artist"][0] {
    _id,
    name,
    slug,
    bio,
    shortBio,
    profileImage {
      asset->,
      alt
    },
    studioImages[] {
      asset->,
      alt,
      caption
    },
    location,
    email,
    phone,
    socialMedia,
    specialties,
    experience,
    education,
    awards
  }
`;

// Pages queries
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    featuredImage {
      asset->,
      alt
    },
    pageType,
    publishedAt,
    seo
  }
`;

export const navigationPagesQuery = groq`
  *[_type == "page" && published == true && navigation.showInMenu == true] {
    _id,
    title,
    slug,
    pageType,
    navigation
  } | order(navigation.menuOrder asc)
`;

// Settings queries
export const settingsQuery = groq`
  *[_type == "settings"][0] {
    _id,
    siteTitle,
    siteDescription,
    logo {
      asset->,
      alt
    },
    favicon {
      asset->
    },
    contact,
    socialMedia,
    business,
    shipping,
    seo,
    appearance
  }
`;

// Helper functions
export async function getAllItems() {
  return await client.fetch(allItemsQuery);
}

export async function getFeaturedItems() {
  return await client.fetch(featuredItemsQuery);
}

export async function getItemsByCategory(categorySlug) {
  return await client.fetch(itemsByCategoryQuery, { categorySlug });
}

export async function getSingleItem(slug) {
  return await client.fetch(singleItemQuery, { slug });
}

export async function getAllCategories() {
  return await client.fetch(allCategoriesQuery);
}

export async function getFeaturedCategories() {
  return await client.fetch(featuredCategoriesQuery);
}

export async function getArtist() {
  return await client.fetch(artistQuery);
}

export async function getPageBySlug(slug) {
  return await client.fetch(pageBySlugQuery, { slug });
}

export async function getNavigationPages() {
  return await client.fetch(navigationPagesQuery);
}

export async function getSettings() {
  return await client.fetch(settingsQuery);
}
