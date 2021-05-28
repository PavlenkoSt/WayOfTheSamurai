import React, { ComponentType } from "react"
import Preloader from "../Components/common/Preloader/Preloader"

export default function<WCP>(Component: ComponentType){
    return (props: WCP) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props} />
            </React.Suspense>
        )
    }
}