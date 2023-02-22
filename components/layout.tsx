import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export default function Layout ({children}: Props) {
    return <div className="max-w-xl px-0 py-1 mt-3 mx-auto mb-6">{children}</div>;
}