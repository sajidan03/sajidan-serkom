import AppLayout from '@/layouts/officer-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

interface PaymentItem {
  id: number;
  period: string;
  nominal: number;
  created_at: string;
}

interface PaymentPageProps {
  member: {
    id_user: number;
    user: User;
    category?: {
      nominal: number;
    };
  };
  jumlah_tagihan: number;
  nominal_tagihan: number;
  payment: PaymentItem[];
  error?: string;
  encrypted_id?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/officer',
  },
  {
    title: 'Pembayaran',
    href: '#',
  },
];

export default function PaymentDetail() {
  const { props } = usePage<PaymentPageProps>();
  const { member, jumlah_tagihan, nominal_tagihan, payment, error, encrypted_id } = props;
  const [nominal, setNominal] = useState('');
  const [validationError, setValidationError] = useState('');

  // Validasi apakah nominal adalah kelipatan 10
  const validateNominal = (value: string) => {
    const numericValue = parseInt(value);
    
    if (value === '') {
      setValidationError('');
      return true;
    }
    
    if (isNaN(numericValue)) {
      setValidationError('Harus berupa angka');
      return false;
    }
    
    if (numericValue % 10 !== 0) {
      setValidationError('Nominal harus kelipatan 10');
      return false;
    }
    
    if (numericValue <= 0) {
      setValidationError('Nominal harus lebih dari 0');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNominal(value);
    validateNominal(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateNominal(nominal)) {
      return;
    }

    const numericNominal = parseInt(nominal);
    
    if (numericNominal <= 0) {
      setValidationError('Nominal harus lebih dari 0');
      return;
    }

    if (numericNominal % 10 !== 0) {
      setValidationError('Nominal harus kelipatan 10');
      return;
    }

    router.post(`/petugas/payment/${encrypted_id}`, {
      nominal: numericNominal,
      bayar: true
    }, {
      onError: (errors) => {
        console.log('Error:', errors);
        if (errors.nominal) {
          setValidationError(errors.nominal);
        }
      },
      onSuccess: () => {
        setNominal('');
        setValidationError('');
      }
    });
  };

  const handleCancel = (id: number) => {
    if (confirm('Yakin mau cancel pembayaran ini?')) {
      router.delete(route('officer.payment.cancel', id), {
        onSuccess: () => {
          router.reload();
        }
      });
    }
  };

  // Suggestion values (kelipatan 10)
  const suggestionValues = [10000, 20000, 50000, 100000, 200000, 500000];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pembayaran" />
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Pembayaran</h1>
        </div>

        {/* Form Pembayaran */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Warga: {member.user.name}
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nominal">
                Nominal Pembayaran:
              </label>
              <input
                type="number"
                name="nominal"
                id="nominal"
                value={nominal}
                onChange={handleNominalChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  validationError ? 'border-red-500' : ''
                }`}
                required
                min="10"
                step="10"
                placeholder="Masukkan nominal kelipatan 10"
              />
              {validationError && (
                <p className="text-red-500 text-xs italic mt-1">{validationError}</p>
              )}
            </div>

            {/* Suggestion buttons */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pilihan Cepat:
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestionValues.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setNominal(value.toString());
                      setValidationError('');
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-1 px-3 rounded"
                  >
                    Rp {new Intl.NumberFormat('id-ID').format(value)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!validationError || nominal === ''}
              >
                Bayar
              </button>
            </div>
          </form>
        </div>

        {/* Error Message dari server */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Daftar Pembayaran */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-xl font-semibold mb-4">Daftar Pembayaran</h4>
          <hr className="mb-4" />

          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-semibold">Total Tagihan:</span> {jumlah_tagihan}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Nominal Tagihan:</span> Rp {new Intl.NumberFormat('id-ID').format(nominal_tagihan)}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Pembayaran ke-</th>
                  <th className="px-4 py-3 text-left">Periode Pembayaran</th>
                  <th className="px-4 py-3 text-left">Nominal Pembayaran</th>
                  <th className="px-4 py-3 text-left">Tanggal Bayar</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {payment.length > 0 ? (
                  payment.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.period}</td>
                      <td className="px-4 py-3">Rp {new Intl.NumberFormat('id-ID').format(item.nominal)}</td>
                      <td className="px-4 py-3">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleCancel(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                      Tidak ada data pembayaran
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}