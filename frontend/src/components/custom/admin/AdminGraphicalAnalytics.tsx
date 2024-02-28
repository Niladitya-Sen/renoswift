"use client";

import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            backgroundColor: '#2e90fa',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            backgroundColor: '#12b76a',
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            backgroundColor: '#ffa800',
        },
    ],
};

export default function AdminGraphicalAnalytics() {
    return (
        <div className='grid gap-4 lg:grid-cols-2'>
            <div className='w-full'>
                <Bar options={options} data={data} />
            </div>
            <div className='w-full'>
                <Bar options={options} data={data} />
            </div>
            <div className='w-full'>
                <Bar options={options} data={data} />
            </div>
            <div className='w-full'>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}
