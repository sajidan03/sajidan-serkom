import { usePage } from "@inertiajs/react";

export default function AppLogo() {
   const { profil } = usePage<{ profil: { nama_sekolah: string; logo?: string } }>().props
    return (
        <>
            <div className=" flex items-center">
                                 <div className="mr-5 flex h-12 w-12 items-center justify-center rounded-full">
                                <img src={`/storage/assets/${profil.logo}`} alt="Logo SMK YPC" className="h-full w-full object-contain" />
                                </div>
                                <h1 className="text-3md font-bold text-[#30328b] dark:text-teal-400 -ml-2">SMK YPC Tasikmalaya</h1>
            </div>
        </>
    );
}
