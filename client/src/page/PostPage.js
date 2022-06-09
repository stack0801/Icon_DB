import styled from "styled-components";
import Header from "../component/Header/Header";
import ImageDetail from "../component/ImageDetail"
export default function App() {
    
    return (<>
        <Header/>
        <PostPage>
           <ImageDetail/>
        </PostPage>
    </>)
}

const PostPage = styled.div`
    margin: auto auto;
    width: 1024px;
    display: grid;
    padding: 8%;
    gap: 5px;
    border: solid 2px #9ed1d9;
    border-radius: 5px;
`;