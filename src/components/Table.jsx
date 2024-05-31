import { flexRender, useReactTable, getCoreRowModel, ColumnResizeMode, ColumnDef } from "@tanstack/react-table";
import { DUMMY_DATA } from "../data";
import { useState, useMemo } from "react";
import './Table.css'; 
import Table from 'react-bootstrap/Table'
import SearchInput from "./SearchInput";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const recursiveSearch = (obj, query) => {
    if (typeof obj === 'string') {
        return obj.toLowerCase().includes(query.toLowerCase());
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some(value => recursiveSearch(value, query));
    }
    return false;
};

const TableComponent = () => {

    const [data, setData] = useState(DUMMY_DATA);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTLA, setSelectedTLA] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState([]);

    const uniqueTLA = [...new Set(data.map(item => item.TLA))];
    const uniqueOwners = [...new Set(data.map(item => item.Owner))];

    const handleSelectTLA = (value) => {
        setSelectedTLA(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleSelectOwner = (value) => {
        setSelectedOwner(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const filteredData = useMemo(() => {
        return data.filter(row => {
            const matchesTLA = selectedTLA.length === 0 || selectedTLA.includes(row.TLA);
            const matchesOwner = selectedOwner.length === 0 || selectedOwner.includes(row.Owner);
            const matchesSearchQuery = !searchQuery || recursiveSearch(row, searchQuery);
            return matchesTLA && matchesOwner && matchesSearchQuery;
        });
    }, [data, selectedTLA, selectedOwner, searchQuery]);

    const columnsData = [
        {
            header: () => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>TLA</span>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title=""
                        drop="down"
                        variant="outline-secondary"
                        style={{ marginLeft: '5px' }}
                    >
                        {uniqueTLA.map(tla => (
                            <Dropdown.Item
                                key={tla}
                                active={selectedTLA.includes(tla)}
                                onClick={() => handleSelectTLA(tla)}
                            >
                                {tla}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            ),
            accessorKey: "TLA",
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {   
            header: () => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Owner</span>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title=""
                        drop="down"
                        variant="outline-secondary"
                        style={{ marginLeft: '5px' }}
                    >
                        {uniqueOwners.map(owner => (
                            <Dropdown.Item
                                key={owner}
                                active={selectedOwner.includes(owner)}
                                onClick={() => handleSelectOwner(owner)}
                            >
                                {owner}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            ),
            accessorKey: "Owner",
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
    ];
    
    const table = useReactTable({
        data: filteredData,
        columns: columnsData,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
    });
    
    console.log(table.getHeaderGroups());
    return (
        <div className="table-container">
            <SearchInput searchQuery={searchQuery} onSetSearchQuery={setSearchQuery}/>
            <Table striped bordered hover responsive size="sm" className="mt-3"
                //style={{width: table.getCenterTotalSize()}}
            >
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} style={{ position: 'relative', width: header.getSize()}}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
            </Table>
        </div>
        )
};

export default TableComponent;