"use client";

import React, { useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import Input from './Input';

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
        title: debouncedValue,
    }

    const url = qs.stringifyUrl({
        url: 'search',
        query: query,
    })

    router.push(url);
  }, [router, debouncedValue])
  

  return (
    <Input 
        placeholder='What do you want to listen to?'
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
    />
  )
}

export default SearchInput