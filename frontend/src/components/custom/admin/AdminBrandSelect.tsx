"use client";

import { useCookies } from '@/hooks/useCookies';
import { useEffect, useState } from 'react';
import Select from 'react-select';

type BrandType = {
    id: number;
    name: string;
}

type PropType = {
    defaultValue?: number[],
    readOnly?: boolean,
    name?: string,
    id?: string,
    placeholder?: string,
    required?: boolean,
    readonly?: boolean,
    isMulti?: boolean,
}

export default function AdminBrandSelect({ defaultValue, readOnly, name, id, isMulti, placeholder }: Readonly<PropType>) {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const cookies = useCookies();
    const [selectedBrands, setSelectedBrands] = useState<any[]>([]);

    useEffect(() => {
        async function getBrands() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/brands`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`
                }
            });
            const data = await response.json();
            setBrands(data);

        }
        getBrands();
    }, []);

    useEffect(() => {
        if (defaultValue) {
            setSelectedBrands(defaultValue.map(id => ({ value: id, label: brands.find(brand => brand.id === id)?.name })));
        }
    }, [defaultValue]);

    const options = brands.map(brand => ({
        value: brand.id,
        label: brand.name
    }));

    return (
        <Select
            name={name}
            id={id}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            required
            isDisabled={readOnly}
            delimiter=','
            value={selectedBrands}
            onChange={(value: any) => setSelectedBrands(value)}
        />
    )
}
