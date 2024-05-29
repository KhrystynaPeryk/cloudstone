import { flexRender, useReactTable, getCoreRowModel, ColumnResizeMode } from "@tanstack/react-table";
import { DUMMY_DATA } from "../data";
import { useState } from "react";
import './Table.css'; 
import { Table as BTable } from 'react-bootstrap'

const columns = [
    {
        header: "TLA",
        accessorKey: "TLA",
        // cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        header: "IAAS enabled",
        accessorKey: "IAAS enabled",
        // cell: (props) => <p>{props.getValue() ? 'true' : 'false'}</p>,
    },
    {
        header: "subs",
        columns: [
            {
                accessorKey: "subs.np",
                header: "np",
                // cell: (props) => <p>{props.getValue()}</p>,
            },
            {
                accessorKey: "subs.prod",
                header: "prod",
                // cell: (props) => <p>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "VAULT",
        columns: [
            {
                accessorKey: "VAULT.np",
                header: "np",
                // cell: (props) => <p>{props.getValue()}</p>,
            },
            {
                accessorKey: "VAULT.prod",
                header: "prod",
                // cell: (props) => <p>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "storage acc",
        columns: [
            {
                accessorKey: "storage acc.np",
                header: "np",
                cell: (props) => <p>{props.getValue()}</p>,
            },
            {
                accessorKey: "storage acc.prod",
                header: "prod",
                cell: (props) => <p>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "ADO",
        columns: [
            {
                accessorKey: "ADO.np",
                header: "np",
                cell: (props) => <p>{props.getValue()}</p>,
            },
            {
                accessorKey: "ADO.prod",
                header: "prod",
                cell: (props) => <p>{props.getValue()}</p>,
            }
        ]
    },
    {   header: "Owner",
        accessorKey: "Owner",
        cell: (props) => <p>{props.getValue()}</p>,
    },
];

const Table = () => {

    const [data, setData] = useState(DUMMY_DATA);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        
    });
    
    console.log(table.getHeaderGroups());
    return (
        <div className="p-2">
            <BTable striped bordered hover responsive size="sm">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </BTable>
            </div>
        )
};

export default Table;
