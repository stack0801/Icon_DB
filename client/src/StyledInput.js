import React from "react";
import styled from "styled-components";
import "./Sign.css";

export default function App({ width, height, placeholder, type, fontSize, onChange}) {
    return (
        <StyledInput width={width} height={height} fontSize={fontSize} placeholder={placeholder} type={type} onChange={onChange}>
        </StyledInput>
    )
}



const StyledInput = styled.input`
border-radius: 5px;
border: solid 2px gray;
margin: 13px;
padding-left: 10px;
}
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
    font-size: ${(props) => props.fontSize || "20px"};
    type: ${(props)=>props.type || "text"}


`;
