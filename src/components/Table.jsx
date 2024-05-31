import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DUMMY_DATA } from "../data";
import { useState, useMemo } from "react";
import './Table.css'; 
import Table from 'react-bootstrap/Table'
import SearchInput from "./SearchInput";
import Button from 'react-bootstrap/Button';
import { recursiveSearch, columnsData } from "../helpers/helpers";

const TableComponent = () => {

    const [data, setData] = useState(DUMMY_DATA);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTLA, setSelectedTLA] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState([]);

    // if Owner / TLA values are identical - the dropdown list will not show duplicates (new Set() - does not allow duplicates)
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

    // Reset Filters button logic
    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedTLA([]);
        setSelectedOwner([]);
    };

    // filter logic (search + tla and owner filters)
    // useMemo is used to memoize the result of a function so that it is only recalculated when one of its dependencies changes
    const filteredData = useMemo(() => {
        return data.filter(row => {
            const matchesTLA = selectedTLA.length === 0 || selectedTLA.includes(row.TLA);
            const matchesOwner = selectedOwner.length === 0 || selectedOwner.includes(row.Owner);
            const matchesSearchQuery = !searchQuery || recursiveSearch(row, searchQuery);
            return matchesTLA && matchesOwner && matchesSearchQuery;
        });
    }, [data, selectedTLA, selectedOwner, searchQuery]);
    
    // initiating a TanStack table instance
    const table = useReactTable({
        data: filteredData,
        columns: columnsData(uniqueTLA, selectedTLA, handleSelectTLA, uniqueOwners, selectedOwner, handleSelectOwner),
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
    });
    
    return (
        <div className="table-container">
            <SearchInput searchQuery={searchQuery} onSetSearchQuery={setSearchQuery}/>
            <Table striped bordered hover responsive size="sm" className="mt-3 table-style"
                //style={{width: table.getCenterTotalSize()}}
            >
                <thead className="thead">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="tr">
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} style={{ position: 'relative', width: header.getSize()}} className="th">
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
                <tbody className="tbody">
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="tr">
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="td">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="outline-secondary" onClick={handleResetFilters} className="mb-3 mt-3">Reset Filters</Button>
        </div>
        )
};

export default TableComponent;