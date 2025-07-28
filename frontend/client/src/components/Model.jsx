import React from 'react'
const Model = ({children}) => {
return (

    <>
        <div
            className="backdrop"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <dialog
                className="model"
                open
                style={{
                    border: "none",
                    borderRadius: "16px",
                    padding: "2rem",
                    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%, #a1c4fd 100%, #c2e9fb 100%)",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
                    minWidth: "320px",
                    maxWidth: "90vw",
                    color: "#333",
                    fontWeight: "bold",
                }}
                onClick={e => e.stopPropagation()}
            >
               {children}
            </dialog>
        </div>
    </>
)
}
export default Model

