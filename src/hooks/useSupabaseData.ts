
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Define valid table names as a type to satisfy TypeScript
export type TableName = 'farmers' | 'customers' | 'sale_orders' | 'invoices' | 
                'expenses' | 'input_demands' | 'payments' | 'stock_movements' | 'purchase_orders';

interface UseSupabaseDataOptions<T> {
  tableName: TableName;
  select?: string;
  initialData?: T[];
  orderBy?: { column: string; ascending?: boolean };
  filter?: { column: string; value: any };
}

export function useSupabaseData<T>({ 
  tableName, 
  select = '*', 
  initialData = [], 
  orderBy,
  filter
}: UseSupabaseDataOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from(tableName)
          .select(select);

        if (filter) {
          query = query.eq(filter.column, filter.value);
        }

        if (orderBy) {
          query = query.order(orderBy.column, { 
            ascending: orderBy.ascending !== false 
          });
        }

        const { data: responseData, error } = await query;

        if (error) {
          throw new Error(error.message);
        }

        setData(responseData as T[]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(err as Error);
        toast({
          title: `Error fetching ${tableName}`,
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, select, filter, orderBy, toast]);

  // Fixed refetch function with proper type annotations to avoid infinite type instantiation
  const refetch = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Explicitly type the query to avoid deep type instantiation
      type QueryType = ReturnType<typeof supabase.from>;
      
      // Create the base query with explicit type
      const baseQuery = supabase.from(tableName).select(select);
      
      // Use explicit typing for intermediate queries
      let finalQuery: QueryType = baseQuery;
      
      // Apply filter if provided
      if (filter) {
        finalQuery = baseQuery.eq(filter.column, filter.value);
      }
      
      // Apply ordering if provided
      if (orderBy) {
        finalQuery = (filter ? finalQuery : baseQuery).order(orderBy.column, { 
          ascending: orderBy.ascending !== false 
        });
      }
      
      // Execute the final query
      const { data: responseData, error } = await finalQuery;

      if (error) {
        throw new Error(error.message);
      }

      setData(responseData as T[]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(err as Error);
      toast({
        title: `Error fetching ${tableName}`,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
