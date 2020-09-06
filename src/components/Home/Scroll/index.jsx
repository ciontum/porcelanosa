import React from "react"
import "./style.scss"

const Scroll=({children,title,subTitle,className,scrollRef})=>{

    return <div className={`scroll ${className ? className : ''}`} ref={scrollRef}>
        <div className="scroll_header">
            <h2>{title}</h2>
            <p>{subTitle}</p>
        </div>
            {children}
    </div>
}

export default Scroll