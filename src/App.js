import './App.css';
import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const initialColumns = [
  {
    id: 'col1',
    header: 'Column 1',
    accessorKey: 'col1',
  },
  {
    id: 'col2',
    header: 'Column 2',
    accessorKey: 'col2',
  }
];

const rowsData = [
  { col1: 'Hello', col2: 'World' },
  { col1: 'react-table', col2: 'rocks' },
  { col1: 'whatever', col2: 'you want' }
];

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

function App() {
  const [columns, setColumns] = useState(initialColumns);

  const data = useMemo(() => rowsData, []);
  const columnsMemo = useMemo(() => columns, [columns]);

  const table = useReactTable({
    data,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((prevColumns) => {
        const oldIndex = prevColumns.findIndex((col) => col.id === active.id);
        const newIndex = prevColumns.findIndex((col) => col.id === over.id);

        return arrayMove(prevColumns, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns.map((col) => col.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="table">
          <div className="header-container">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="tr">
                {headerGroup.headers.map((header) => (
                  <SortableItem key={header.id} id={header.id}>
                    <div className="th"
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          transform: header.column.getIsResizing()
                            ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                            : '',
                        }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </SortableItem>
                ))}
              </div>
            ))}
          </div>
          <div>
            {table.getRowModel().rows.map((row) => (
              <div key={row.id} className="row-container tr">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default App;