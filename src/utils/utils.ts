import { type ClassValue, clsx } from 'clsx';

import { useCountriesQuery } from '../api/common/hooks/queries/use-countries.query';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  // return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];

  return (
    Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(bytes / Math.pow(1024, i)) +
    '' +
    sizes[i]
  );
}

export function parseAllowedTypes(allowedTypes: string) {
  if (!allowedTypes) return '';

  // Map of common MIME types to readable names
  const mimeTypeMap: Record<string, string> = {
    'image/png': 'PNG',
    'image/jpeg': 'JPEG',
    'image/jpg': 'JPEG',
    'image/gif': 'GIF',
    'image/webp': 'WebP',
    'image/svg+xml': 'SVG',
    'image/bmp': 'BMP',
    'image/tiff': 'TIFF',
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'PPTX',
    'text/plain': 'TXT',
    'text/csv': 'CSV',
    'text/html': 'HTML',
    'application/json': 'JSON',
    'application/xml': 'XML',
    'application/zip': 'ZIP',
    'application/x-zip-compressed': 'ZIP',
    'application/x-rar-compressed': 'RAR',
    'application/x-7z-compressed': '7Z',
    'video/mp4': 'MP4',
    'video/mpeg': 'MPEG',
    'video/quicktime': 'MOV',
    'audio/mpeg': 'MP3',
    'audio/wav': 'WAV',
    'audio/ogg': 'OGG',
  };

  // Map of category wildcards to readable names
  const categoryMap: Record<string, string> = {
    'image/*': 'Images',
    'application/*': 'Documents',
    'video/*': 'Videos',
    'audio/*': 'Audio',
    'text/*': 'Text Files',
  };

  return (
    allowedTypes
      .split(',')
      .map(type => {
        const trimmed = type.trim();
        if (!trimmed) return '';

        // Handle wildcards (e.g., "image/*")
        if (trimmed.includes('/*')) {
          return (
            categoryMap[trimmed] || trimmed.replace('/*', '').toUpperCase()
          );
        }

        // Handle MIME types (e.g., "image/png")
        if (trimmed.includes('/')) {
          // Check exact match first
          if (mimeTypeMap[trimmed]) {
            return mimeTypeMap[trimmed];
          }
          // Extract subtype (e.g., "png" from "image/png")
          const subtype = trimmed.split('/')[1];
          if (subtype) {
            // Convert to uppercase and handle common cases
            return subtype.toUpperCase().replace(/\+XML$/, '');
          }
        }

        // Handle extensions (e.g., ".pdf", "pdf")
        if (trimmed.startsWith('.')) {
          return trimmed.slice(1).toUpperCase();
        }

        // Handle plain type names (e.g., "pdf", "png")
        return trimmed.toUpperCase();
      })
      .filter(Boolean) // Remove empty strings
      .join(', ') || ''
  );
}

export function twMerge(...classNames: string[]) {
  return classNames.join(' ');
}

export function useCountryDefaultValue(code?: string) {
  const { data } = useCountriesQuery();
  const countryCode = code || 'SA';
  return data?.data.find(c => c.code === countryCode);
}
