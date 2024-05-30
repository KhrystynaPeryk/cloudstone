import React from 'react'
import Form from 'react-bootstrap/Form'

const SearchInput = ({searchQuery, onSetSearchQuery}) => {
    return (
        <div className='d-inline-flex'>
            <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSetSearchQuery(e.target.value)}
                className="mb-3"
            />
        </div>
    )
}

export default SearchInput