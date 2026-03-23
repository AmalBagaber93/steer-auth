'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const LandingScreen = () => {
    const router = useRouter()
    const projects = [
        { name: "Steer", path: "/steer/login" },
        { name: "Skyna", path: "/skyna/login" },
        { name: "Zatca", path: "/" },
        { name: "PM.AI", path: "/" }
    ]

    return (
        <div className='flex max-w-6xl gap-6 p-6 flex-wrap'>
            {projects.map((project, index) => (
                <div
                    key={index}
                    className='flex-1 min-w-50 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer border border-gray-100'
                >
                    <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                        {project.name}
                    </h3>
                    <p className='text-gray-600 text-sm mb-4'>
                        Project details and description
                    </p>
                    <button onClick={() => router.push(project.path)} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200'>
                        View Project
                    </button>
                </div>
            ))}
        </div>
    )
}

export default LandingScreen