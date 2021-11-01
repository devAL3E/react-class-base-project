import React from 'react'

const withDivClassName = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    )
}

export default withDivClassName