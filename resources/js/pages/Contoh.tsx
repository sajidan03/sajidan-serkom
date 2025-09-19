import React from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import { Head } from '@inertiajs/react';

export default function Dashboard({ users }) {
  return (
    <>
      <Head title="Dashboard Admin" />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-4">
          <h1>Selamat datang Admin</h1>
          {/* Konten lain */}
        </div>
      </div>
    </>
  );
}
