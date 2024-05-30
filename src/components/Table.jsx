import { flexRender, useReactTable, getCoreRowModel, ColumnResizeMode, ColumnDef } from "@tanstack/react-table";
import { DUMMY_DATA } from "../data";
import { useState, useMemo } from "react";
import './Table.css'; 
import { Table as BTable, Form } from 'react-bootstrap'

const columnsData = [
    {
        header: "TLA",
        accessorKey: "TLA",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        header: "IAAS enabled",
        accessorKey: "IAAS enabled",
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        header: "subs",
        columns: [
            {
                accessorKey: "subs.np",
                header: "np",
                cell: (props) => <p>{props.getValue()}</p>,
            },
            {
                accessorKey: "subs.prod",
                header: "prod",
                cell: (props) => <p>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "VAULT",
        columns: [
            {
                accessorKey: "VAULT.np",
                header: "np",
                cell: (props) => <p>{props.getValue()}</p>,
            },
            {
                accessorKey: "VAULT.prod",
                header: "prod",
                cell: (props) => <p>{props.getValue()}</p>,
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

const recursiveSearch = (obj, query) => {
    if (typeof obj === 'string') {
        return obj.toLowerCase().includes(query.toLowerCase());
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some(value => recursiveSearch(value, query));
    }
    return false;
};

const Table = () => {

    const [data, setData] = useState(DUMMY_DATA);
    const [columns] = useState(() => [...columnsData])
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        return data.filter(row => recursiveSearch(row, searchQuery));
    }, [data, searchQuery]);
    
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
    });
    
    console.log(table.getHeaderGroups());
    return (
        <div className="p-2">
            <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3"
            />
            <BTable striped bordered hover responsive size="sm" 
                // style={{width: table.getTotalSize()}}
            >
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} style={{ position: 'relative', width: header.getSize() }}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                    {header.column.getCanResize() && (
                                        <div
                                            onDoubleClick={() => header.column.resetSize()}
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                height: '100%',
                                                width: '5px',
                                                cursor: 'col-resize',
                                                userSelect: 'none',
                                                touchAction: 'none',
                                            }}
                                        />
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
