import { createContext, useState, useRef, useEffect, useContext } from "react";
import './Modal.css';
import ReactDOM from 'react-dom';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    const [value, setValue] = useState();
    const modalRef = useRef();

    useEffect(() =>{
        setValue(modalRef.current);
    },[])
    return(
        <>
            <ModalContext.Provider value={value}>
                {props.children}
            </ModalContext.Provider>

            <div ref={modalRef}/>
        </>
    )
}

export const Modal = ({onClose, children}) =>{
    const modalNode = useContext(ModalContext);

    if(!modalNode) return null;
    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background'onClick={onClose}/>
            <div id='modal-content'>
                {children}
            </div>

        </div>,
        modalNode
    )

}

export default ModalProvider;
