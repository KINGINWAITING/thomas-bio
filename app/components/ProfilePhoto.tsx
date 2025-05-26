import Image from 'next/image';
import styles from './ProfilePhoto.module.css';
import { cn } from '@/lib/utils';

interface ProfilePhotoProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProfilePhoto({
  src,
  alt,
  size = 'md',
  className
}: ProfilePhotoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.orb} />
      <div className={cn(styles.wrapper, className)}>
        <Image
          src={src}
          alt={alt}
          className={cn(styles.photo, styles[size])}
          width={size === 'lg' ? 192 : size === 'md' ? 160 : 128}
          height={size === 'lg' ? 192 : size === 'md' ? 160 : 128}
          priority
        />
      </div>
    </div>
  );
}