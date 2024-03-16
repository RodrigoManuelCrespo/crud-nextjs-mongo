'use client'

import { store } from '@/store/store'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </SessionProvider>
        </Provider>
    )
}