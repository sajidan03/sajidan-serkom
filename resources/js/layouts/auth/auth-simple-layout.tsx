import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';


interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={home()} className="flex flex-col items-center gap-2 font-medium">
                          <div className=" flex items-center">
                                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                                <h1 className="text-2xl font-bold">K</h1>
                                </div>
                                <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400 -ml-2">aswarga</h1>
                            </div>
                        </Link>

                    </div>
                    <div className="space-y-1 text-start">
                            <h1 className="text-l font-medium">{title}</h1>
                            <p className="text-start text-sm text-muted-foreground">{description}</p>
                        </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
