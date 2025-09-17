import * as React from "react"

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full border-collapse border border-gray-200 rounded-lg">
      {children}
    </table>
  )
}
export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>
}
export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}
export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>
}
export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-3 text-left font-semibold text-gray-600">{children}</th>
  )
}
export function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-3">{children}</td>
}
