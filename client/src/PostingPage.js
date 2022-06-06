import React, { useState } from 'react';
import ImageUploader from 'react-images-uploading';
import Header from './component/StyledHeader'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './LandingPage.css';
import './Posting.css';
import axios from 'axios';

export default function Main() {

    //이미지 업로드
    const [images, setImages] = useState([]);
    const maxNumber = 1;


    const onChange = (imageList) => {
        setImages(imageList);
    }

    const onError = (errors) => {
        if (errors) {
            alert("이미지는 1개까지만 첨부할 수 있습니다")
        }
    }
    
    const boardtest = () => {

        const formData = new FormData()
        formData.append("img", images[0].file)
        formData.append("message", "hi")

        //console.log(images[0].file)

        axios({
            method: 'post',
            url: '/boardtest',
            header: { 'content-type': 'multipart/form-data' },
            data: formData
        })
        .then((res) => {
            alert(res.data)/*
            if (res.data == 'success') 
                window.location.href = '/'*/
        })
    }   
    return (<>
        <Header/>
        <div className='container'>
            <ImageUploader
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                onError={onError}
            >
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, }) => (
                    <div className="upload-image-wrapper">
                       
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="300" />
                                <ul>
                                    <li><button className='upload-btn' onClick={() => onImageUpdate(index)}>수정</button></li>
                                    <li><button className='upload-btn' onClick={() => onImageRemove(index)}>삭제</button></li>
                                </ul>
                            </div>
                        ))} 
                        <button className='upload-btn' style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
                        <AiOutlinePlusCircle />Add
                        </button>
                        <button className='upload-btn' onClick = { boardtest}>올리기</button>
                    </div>
                )}
            </ImageUploader>
        </div>
       
    </>)
}