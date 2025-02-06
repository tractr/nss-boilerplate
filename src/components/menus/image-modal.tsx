'use client';

import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ImageModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  alt: string;
}

export function ImageModal({ isOpen, onOpenChange, imageUrl, alt }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={alt}
            className="object-contain"
            fill
            priority
            sizes="90vw"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
