import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const WhaleReport = ({ data }) => {
  const columns = [
    {
      header: 'Rank',
      accessorKey: 'rank',
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Wallet',
      accessorKey: 'Wallet',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.Wallet}</span>
      ),
    },
    {
      header: 'SOL Spent',
      accessorKey: 'SOL',
      cell: ({ row }) => (
        <span className="font-medium">
          {Number(row.original.SOL).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Whale Wallet Analysis
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Wallets ranked by SOL spent before market cap threshold
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WhaleReport; 