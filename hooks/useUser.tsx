import { createContext, useContext, useEffect, useState } from "react";
import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const { session, isLoading: isLoadingUser, supabaseClient } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabaseClient.from('users').select('*').single();
    const getSubscriptions = () => supabaseClient.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single()

    useEffect(() => {
      if(user && !isLoadingUser && !userDetails && !subscription) {
        setIsLoading(true);

        Promise.allSettled([getUserDetails(), getSubscriptions()]).then(
          results => {
              const userDetailsPromise = results[0];
              const subscriptionsPromise = results[1];
  
              if(userDetailsPromise.status === 'fulfilled') {
                  setUserDetails(userDetailsPromise.value.data as UserDetails);
              }
  
              if(subscriptionsPromise.status === 'fulfilled') {
                  setSubscription(subscriptionsPromise.value.data as Subscription);
              }
  
              setIsLoading(false);
          }
        );
      }
      else if(!user && !isLoadingUser && !isLoading) {
        setUserDetails(null);
        setSubscription(null);
      }
    }, [user, isLoadingUser]);
    
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoading,
        subscription,
    }

    return (
        <UserContext.Provider value={value} {...props} />
    );
}

export const useUser = () => {
    const context = useContext(UserContext);

    if(!context) {
        throw new Error('useUser is not defined!');
    }

    return context;
};
