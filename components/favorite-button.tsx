"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  itemType: 'book' | 'sequence';
  itemId: string;
  variant?: 'default' | 'ghost' | 'outline';
}

export function FavoriteButton({ itemType, itemId, variant = 'ghost' }: FavoriteButtonProps) {
  const { data: session } = useSession() || {};
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      checkFavorite();
    }
  }, [session, itemId, itemType]);

  const checkFavorite = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const favorites = await response.json();
        const exists = favorites?.some?.(
          (fav: any) => fav?.itemType === itemType && fav?.itemId === itemId
        ) ?? false;
        setIsFavorite(exists);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!session?.user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        // Remove favorite
        const response = await fetch(
          `/api/favorites?itemType=${itemType}&itemId=${itemId}`,
          { method: 'DELETE' }
        );
        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        // Add favorite
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemType, itemId }),
        });
        if (response.ok) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleFavorite}
      disabled={loading}
      className="relative"
    >
      <Heart
        className={`h-5 w-5 transition-all ${
          isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
        }`}
      />
    </Button>
  );
}
