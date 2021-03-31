import React from "react"
import Preloader from "../Components/common/Preloader/Preloader"

export default Component => {
    return props => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props} />
            </React.Suspense>
        )
    }
    
}