"use client";

import { useCookies } from '@/hooks/useCookies';
import { useEffect, useState } from 'react';
import Select from 'react-select';

type CategoryType = {
    id: string;
    type: string;
}

export default function AdminProductCategorySelect({ defaultValue, readOnly }: { defaultValue?: string[], readOnly?: boolean }) {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const cookies = useCookies();
    const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

    useEffect(() => {
        async function getCategories() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`
                }
            });
            const data = await response.json();
            setCategories(data);

        }
        getCategories();
    }, []);

    useEffect(() => {
        if (defaultValue) {
            setSelectedCategories(defaultValue.map(id => ({ value: id, label: categories.find(category => category.id === id)?.type })));
        }
    }, [defaultValue]);

    const options = categories.map(category => ({
        value: category.id,
        label: category.type.charAt(0).toUpperCase() + category.type.slice(1)    
    }));

    return (
        <Select
            name="category"
            id="category"
            placeholder="Select category"
            options={options}
            required
            isDisabled={readOnly}
            delimiter=','
            value={selectedCategories}
            onChange={(value: any) => setSelectedCategories(value)}
        />
    )
}
