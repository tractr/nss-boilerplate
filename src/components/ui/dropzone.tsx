'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  onFileDrop?: (files: FileList) => void;
  accept?: string;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, disabled = false, onFileDrop, accept, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragOver = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragging(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const { files } = e.dataTransfer;
        if (files && files.length > 0) {
          if (accept) {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const isAccepted = Array.from(files).every(file =>
              acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                  return file.name.toLowerCase().endsWith(type.toLowerCase());
                }
                return file.type.match(new RegExp(type.replace('*', '.*')));
              })
            );
            if (!isAccepted) return;
          }
          onFileDrop?.(files);
        }
      },
      [disabled, onFileDrop, accept]
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const { files } = e.target;
        if (files && files.length > 0) {
          onFileDrop?.(files);
        }
      },
      [disabled, onFileDrop]
    );

    return (
      <div
        ref={ref}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-4 text-center transition-colors hover:bg-accent/50',
          isDragging && 'border-muted-foreground/50 bg-accent',
          disabled && 'cursor-not-allowed opacity-60',
          className
        )}
        {...props}
      >
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          onChange={handleChange}
          accept={accept}
          disabled={disabled}
        />
        <UploadIcon className="mb-2 h-10 w-10 text-muted-foreground" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-xs text-muted-foreground">or click to select a file</p>
        </div>
      </div>
    );
  }
);

Dropzone.displayName = 'Dropzone';

export { Dropzone };
