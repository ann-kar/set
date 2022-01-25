import React from "react";

import "./Defs.scss";

type DefsProps = {
    color: string;
}

function Defs({color} : DefsProps): JSX.Element {

    return ( 
                <defs>
                    <pattern id="pattern-red"
                             width="40" height="40"
                             patternUnits="userSpaceOnUse"
                         >
                        <rect width="15" height="40" x="0" y="0" fill="white" stroke-width="0"></rect>
                        <rect width="10" height="40" x="15" y="0" fill="red" stroke-width="0"></rect>
                        <rect width="15" height="40" x="25" y="0" fill="white" stroke-width="0"></rect>
                    </pattern>
                    <pattern id="pattern-green"
                             width="40" height="40"
                             patternUnits="userSpaceOnUse"
                         >
                        <rect width="15" height="40" x="0" y="0" fill="white" stroke-width="0"></rect>
                        <rect width="10" height="40" x="15" y="0" fill="green" stroke-width="0"></rect>
                        <rect width="15" height="40" x="25" y="0" fill="white" stroke-width="0"></rect>
                    </pattern>
                    <pattern id="pattern-violet"
                             width="40" height="40"
                             patternUnits="userSpaceOnUse"
                         >
                        <rect width="15" height="40" x="0" y="0" fill="white" stroke-width="0"></rect>
                        <rect width="10" height="40" x="15" y="0" fill="violet" stroke-width="0"></rect>
                        <rect width="15" height="40" x="25" y="0" fill="white" stroke-width="0"></rect>
                    </pattern>
                </defs> 
    )
}

export default Defs;