import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/mock-data';
import { SITE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const companySlugs = getAllSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/salaries`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/compare`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/reviews`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE_URL}/interviews`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE_URL}/jobs`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE_URL}/community`, changeFrequency: 'daily', priority: 0.5 },
    { url: `${SITE_URL}/offers`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/tools`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${SITE_URL}/workplace-index`, changeFrequency: 'weekly', priority: 0.6 },
  ];

  const companyRoutes: MetadataRoute.Sitemap = companySlugs.map((slug) => ({
    url: `${SITE_URL}/companies/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...companyRoutes];
}
