import React from 'react'
import { withRouter } from "react-router-dom";
function Layout({children, history}
) {
    return (
        <div>
            {children}
        </div>
    )
}

export default withRouter(Layout);
