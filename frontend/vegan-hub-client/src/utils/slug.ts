// src/utils/slug.ts
export async function generateUniqueSlug(title: string, api: any): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  
    let slug = baseSlug;
    let counter = 1;
  
    while (true) {
      try {
        // Check if slug exists
        const exists = await api.get(`/recipes/check-slug/${slug}`);
        if (!exists.data) {
          return slug;
        }
        // If exists, append counter
        slug = `${baseSlug}-${counter}`;
        counter++;
      } catch {
        return slug; // If error, assume slug is available
      }
    }
  }