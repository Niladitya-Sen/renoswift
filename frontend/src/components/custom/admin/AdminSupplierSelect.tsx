"use client";

import { useCookies } from '@/hooks/useCookies';
import { useEffect, useState } from 'react';
import Select from 'react-select';

type SupplierType = {
    supplierId: string;
    name: string;
}

export default function AdminSupplierSelect({ defaultValue, readOnly }: { defaultValue?: string[], readOnly?: boolean }) {
    const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
    const cookies = useCookies();
    const [selectedSuppliers, setSelectedSuppliers] = useState<any[]>([]);

    useEffect(() => {
        async function getSuppliers() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/suppliers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies?.get('adminToken')}`
                }
            });
            const data = await response.json();
            setSuppliers(data);

        }
        getSuppliers();
    }, []);

    useEffect(() => {
        if (defaultValue) {
            setSelectedSuppliers(defaultValue.map(id => ({ value: id, label: suppliers.find(supplier => supplier.supplierId === id)?.name })));
        }
    }, [defaultValue]);

    const options = suppliers.map(supplier => ({
        value: supplier.supplierId,
        label: supplier.name
    }));

    return (
        <Select
            name="supplier"
            id="supplier"
            placeholder="Select Supplier"
            options={options}
            required
            isDisabled={readOnly}
            delimiter=','
            value={selectedSuppliers}
            onChange={(value: any) => setSelectedSuppliers(value)}
        />
    )
}
