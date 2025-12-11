"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SequenceSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex justify-center my-4">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mt-4" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}

export function SequenceSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SequenceSkeleton key={index} />
      ))}
    </div>
  );
}
