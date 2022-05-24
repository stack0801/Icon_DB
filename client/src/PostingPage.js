import React, { useState } from 'react';
import ImageUploader from 'react-images-uploading';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlinePlusCircle } from "react-icons/ai";
import './LandingPage.css';
import './Posting.css';
import logo from './logo.svg';

export default function Main() {

    //이미지 업로드
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }

    const onError = (errors, files) => {
        if (errors.maxNumber) {
            alert("이미지는 1개까지만 첨부할 수 있습니다")
        }
    }

    // 반응형 헤더
    const [HambergerBar, setHambergerBar] = useState(false);
    const showBar = () => setHambergerBar(!HambergerBar);

    return (<>
        <Header>
            <Link to="#" className="toggle">
                {HambergerBar === false ?
                    <FaBars className='menubar-open animated' size="26" color="#9ed1d9" onClick={showBar} /> :
                    <FaTimes className='menubar-open animated' size="28" color="#9ed1d9" onClick={showBar} />
                }
            </Link>
            <Link to="/" className="logo" ><img src={logo} alt="logo" /></Link>
            <Link to="/" className='menu_list'>menu</Link>
            <Link to="/" className='signin-box'>Log out</Link>
        </Header>

        <div className='container'>
            <ImageUploader
                single
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                onError={onError}
            >
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, }) => (
                    <div className="upload-image-wrapper">
                        <button className='upload-btn' style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                            <AiOutlinePlusCircle />Add
                        </button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="300" />
                                <ul>
                                    <li><button className='upload-btn' onClick={() => onImageUpdate(index)}>수정</button></li>
                                    <li><button className='upload-btn' onClick={() => onImageRemove(index)}>삭제</button></li>
                                </ul>
                            </div>
                        ))}
                        <button className='upload-btn'>올리기</button>
                    </div>
                )}
            </ImageUploader>
        </div>
        <nav className={HambergerBar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="menu-list-items">
            </ul>
        </nav>
    </>)
}
const Header = styled.div`
    background:white;
    position: fixed;
    width:100%;
    height:60px;
    font-size: 30px;
    display: grid;   
    place-items:center;
    grid-template-columns: 29% 50% 21%;
    
    .toggle{
        display:none;
    }
    .menu_list{
        display:flex;
        flex-direction:column;
        width:100%;
        color: #9ed1d9;
    }
    @media screen and (max-width:840px){
    .toggle{
        display:block;
    }
    .menu_list{
        display:none;
    }
    #search_box{
        display:none;
    }
}`;