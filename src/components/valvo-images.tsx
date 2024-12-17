'use client';

import { ValvoImage } from '@/lib/api/valvo';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ValvoImagesProps {
  images: ValvoImage[];
  isLoading: boolean;
}

export function ValvoImages({ images, isLoading }: ValvoImagesProps) {
  console.log(images);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!images.length) {
    return <div className="text-center py-8 text-muted-foreground">Aucune image disponible</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto mb-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map(image => (
          <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-video">
              <Image src={image.url || ''} alt={image.description} fill className="object-cover" />
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600 text-center">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
