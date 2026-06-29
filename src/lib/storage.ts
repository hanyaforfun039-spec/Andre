/* Helper URL Supabase Storage — project BERSAMA (Harto/Putri/Andre).
   Aset PER-SALES (foto SPK serah terima + foto konsultan) diambil dari bucket
   masing-masing lewat `site.storage`. Foto katalog mobil TIDAK di sini. */
import type { SiteConfig } from './types';

const BASE = (import.meta.env.PUBLIC_SUPABASE_URL ?? 'https://fxjspvdkeybabxotniov.supabase.co').replace(/\/+$/, '');

/* Default lama (kompatibel bila site belum punya blok storage). */
const DEFAULT_BUCKET = 'Harto';
const DEFAULT_CONSULTANT = 'Foto Harto.webp';
const DEFAULT_DELIVERY_COUNT = 8;

export function publicUrl(bucket: string, file: string): string {
  return `${BASE}/storage/v1/object/public/${bucket}/${encodeURIComponent(file)}`;
}

export function consultantPhotoUrl(site: SiteConfig): string {
  const bucket = site.storage?.bucket ?? DEFAULT_BUCKET;
  return publicUrl(bucket, site.storage?.consultantPhoto ?? DEFAULT_CONSULTANT);
}

export function deliveryPhotos(site: SiteConfig): string[] {
  const bucket = site.storage?.bucket ?? DEFAULT_BUCKET;
  const files =
    site.storage?.deliveryFiles ??
    Array.from({ length: site.storage?.deliveryCount ?? DEFAULT_DELIVERY_COUNT }, (_, i) => `SPK${i + 1}.webp`);
  return files.map((f) => publicUrl(bucket, f));
}
