import { ProductWithPrice } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('products').select('*, prices(*)').eq('prices.active', true).order('unit_amount', {
        foreignTable: 'prices'
    });

    if(error) {
        console.error(error);
    }

    return (data || []) as ProductWithPrice[];
};
