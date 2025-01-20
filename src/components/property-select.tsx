import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useCurrentProperty } from '@/hooks/use-current-property';
import supabaseClient from '@/lib/supabase-client';
import { Database } from '@/types/database';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

type Property = {
  id: string;
  name: string;
  address: string | null;
};

export function PropertySelect() {
  const currentUser = useCurrentUser();
  const { currentProperty, setCurrentProperty } = useCurrentProperty();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    const loadProperties = async () => {
      if (!currentUser?.data?.id) return;

      setIsLoading(true);
      const { data: memberships, error: membershipError } = await supabaseClient
        .from('Membership')
        .select('property_id, Property(*)')
        .eq('user_id', currentUser.data.id)
        .eq('status', 'active');

      if (membershipError) {
        console.error('Error loading properties:', membershipError);
        setIsLoading(false);
        return;
      }

      const userProperties = memberships
        .map(membership => {
          const property = membership.Property as Database['public']['Tables']['Property']['Row'];
          return property
            ? {
                id: property.id,
                name: property.name || t('common.untitledProperty'),
                // @ts-expect-error google_address_obj is not typed
                address: property.google_address_obj?.description || null,
              }
            : null;
        })
        .filter((p): p is Property => p !== null);

      setProperties(userProperties);

      // Set the first property as default if no property is selected
      if (userProperties.length > 0 && !currentProperty) {
        setCurrentProperty(userProperties[0]);
      }

      setIsLoading(false);
    };

    loadProperties();
  }, [currentUser?.data?.id, t]);

  const selectedProperty = properties.find(p => p.id === currentProperty?.id);

  return (
    <div className="px-4 mb-4">
      {isLoading ? (
        <Skeleton className="h-16 w-full mb-px" />
      ) : (
        <div className="border-b border-border/40">
          <Select
            value={currentProperty?.id}
            onValueChange={value => {
              const property = properties.find(p => p.id === value);
              setCurrentProperty(property ?? null);
            }}
            defaultValue={properties[0]?.id}
          >
            <SelectTrigger className="w-full h-16 border-0 bg-transparent hover:bg-accent/50 transition-colors shadow-none text-left">
              <SelectValue>
                {selectedProperty ? (
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{selectedProperty.name}</span>
                    {selectedProperty.address && (
                      <span className="text-sm text-muted-foreground truncate">
                        {selectedProperty.address}
                      </span>
                    )}
                  </div>
                ) : (
                  t('common.selectProperty')
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="min-w-[300px] shadow-none border-0">
              {properties.map(property => (
                <SelectItem key={property.id} value={property.id}>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{property.name}</span>
                    {property.address && (
                      <span className="text-sm text-muted-foreground truncate">
                        {property.address}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
