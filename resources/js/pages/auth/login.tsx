import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head, usePage } from '@inertiajs/react';
import { LoaderCircle, LogIn } from 'lucide-react';
import { useEffect } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    errors?: {
        email?: string;
        password?: string;
        [key: string]: string | undefined;
    };
}

export default function Login({ status }: LoginProps) {
    const { errors, flash } = usePage().props;

    useEffect(() => {
        if (errors && (errors.email || errors.password)) {
            alert('Login gagal! Username atau password salah.');
        }

        if (flash && flash.error) {
            alert(flash.error);
        }
    }, [errors, flash]);

    return (
        <AuthLayout
            title="Masuk akun anda"
            description="Masukan username dan password anda untuk login."
        >
            <Head title="Log in" />

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors: formErrors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="username"
                                    placeholder="Username"
                                />
                                <InputError message={formErrors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={formErrors.password} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-[#30328b] hover:bg-[#26276f] text-white"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing ? (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                ) : (
                                    <LogIn className="mr-2 h-4 w-4" />
                                )}
                                Log in
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
