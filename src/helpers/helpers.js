import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// function that will be looking for a query parameter (which is a string) deep into the obj
export const recursiveSearch = (obj, query) => {
    if (typeof obj === 'string') {
        return obj.toLowerCase().includes(query.toLowerCase());
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some(value => recursiveSearch(value, query));
    }
    return false;
};

// columns model - how the column headers will be displayed in the table
export const columnsData = (uniqueTLA, selectedTLA, handleSelectTLA, uniqueOwners, selectedOwner, handleSelectOwner) => [
    {
        header: () => (
            <div className='d-flex align-items-center justify-content-center'>
                <span>TLA</span>
                <DropdownButton
                    id="dropdown-basic-button"
                    title=""
                    drop="down"
                    variant="outline-secondary"
                    style={{ marginLeft: '5px' }}
                    size="sm"
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
        cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
    },
    {   
        header: () => (
            <div className='d-flex align-items-center justify-content-center'>
                <span>Owner</span>
                <DropdownButton
                    id="dropdown-basic-button"
                    title=""
                    drop="down"
                    variant="outline-secondary"
                    style={{ marginLeft: '5px' }}
                    size="sm"
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
        cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
    },
    {
        header: 'IAAS enabled',
        accessorKey: "IAAS enabled",
        cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
    },
    {
        header: "subs",
        columns: [
            {
                accessorKey: "subs.np",
                header: "np",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            },
            {
                accessorKey: "subs.prod",
                header: "prod",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "VAULT",
        columns: [
            {
                accessorKey: "VAULT.np",
                header: "np",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            },
            {
                accessorKey: "VAULT.prod",
                header: "prod",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "storage acc",
        columns: [
            {
                accessorKey: "storage acc.np",
                header: "np",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            },
            {
                accessorKey: "storage acc.prod",
                header: "prod",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            }
        ]
    },
    {
        header: "ADO",
        columns: [
            {
                accessorKey: "ADO.np",
                header: "np",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            },
            {
                accessorKey: "ADO.prod",
                header: "prod",
                cell: (props) => <p className='mb-0'>{props.getValue()}</p>,
            }
        ]
    },
];