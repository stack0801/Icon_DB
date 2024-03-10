import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Linkdiv from '../../../components/Linkdiv';
import { ThemeProvider, Button, TextField } from '@material-ui/core';
import { theme } from '../../../components/theme';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

import noimg from '@_assets/images/watercolor.webp';

export default function ImageSectionComponent() {
  let { url_id } = useParams();
  const [sign, setSign] = useState(null);
  const [data, setData] = useState({ filename: 'NoImage.png' });
  const [isMobile, setisMobile] = useState(); //Mobile버전 나타내기
  const [liked, setLiked] = useState(); //좋아요 여부 나타내기
  const [likes, setLikes] = useState(0); //좋아요의 갯수 확인
  const [tags, setTags] = useState([]); //HashTag 확인
  const [tagInsert, setTagInsert] = useState(''); //HashTag 입력

  useEffect(() => {
    axios.post('/get_auth').then((res) => {
      let data = res.data;
      setSign(data);
      if (data) {
        axios
          .post('/check_liked', {
            content_id: url_id,
          })
          .then((res) => {
            setLiked(res.data === 'liked');
          });
      }
    });

    resizingHandler();
    window.addEventListener('resize', resizingHandler);
    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, [url_id]);

  useEffect(() => {
    axios({
      method: 'post',
      url: '/get_content',
      data: {
        content_id: url_id,
      },
    }).then((res) => {
      setData(res.data[0]);
      setLikes(res.data[0].like);
    });
    getTags(url_id);
  }, [url_id]);

  const getTags = (url_id) => {
    axios({
      method: 'post',
      url: '/get_tags',
      data: {
        content_id: url_id,
      },
    }).then((res) => {
      setTags(res.data);
    });
  };

  //Mobile 버전
  const resizingHandler = () => {
    setisMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    resizingHandler();
    window.addEventListener('resize', resizingHandler);
    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, []);

  //좋아요 기능
  const onLikedHandler = () => {
    if (sign === null) {
      alert('로그인 후 사용 가능한 서비스 입니다.');
      window.location.href = '/sign_in';
    } else {
      axios({
        method: 'post',
        url: '/setLike',
        data: {
          content_id: url_id,
        },
      }).then((res) => {
        setLiked(res.data);
        axios({
          method: 'post',
          url: '/get_content',
          data: {
            content_id: url_id,
          },
        }).then((res) => {
          setLikes(res.data[0].like);
        });
      });
    }
  };

  return (
    <section className="detail__content col mg-none col--stretch pd-none ">
      <div className="detail__content__inner row row--horizontal-center mg-none">
        <div className="fullwidth detail__icon__holder">
          <div className="row row--vertical-center mg-none full-height detail__icon__inner">
            <div className="col mg-none">
              <div
                className="main-icon-without-slide pd-lv4 icon-png-container"
                datatype="img"
              >
                <img
                  // src={
                  //   "https://webservicegraduationproject.s3.amazonaws.com/img/" +
                  //   data.filename
                  // }
                  src={noimg}
                  alt="no_img"
                  width="256"
                  height="256"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ImageSection = styled.section`
  border-radius: 12px;
  background-color: #f7f7f7;
  text-align: center;
`;

const ImageContainer = styled.div`
  height: 100% !important;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  touch-action: auto !important;
`;

const ImageWrapper = styled.div`
  padding: 0 5px;
  position: relative;
  flex: 1;
`;

const ImageBox = styled.div`
  padding: 90px;

  img {
    height: auto;
  }
`;
