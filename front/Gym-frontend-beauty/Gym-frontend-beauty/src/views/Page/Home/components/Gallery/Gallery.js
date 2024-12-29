import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Lightbox from 'react-image-lightbox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';

const Gallery = () => {
  const theme = useTheme();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const photos = [
    {
      src: 'https://media.gettyimages.com/id/578701109/zh/%E5%90%91%E9%87%8F/stadium-lights.jpg?s=612x612&w=0&k=20&c=xOlLEcE5NgWOGgUAjdcHDsgyh_aPmelN4BiDu2JiXv0=',
      rows: 2,
      cols: 1,
    },
    {
      src: 'https://media.gettyimages.com/id/122155497/zh/%E7%85%A7%E7%89%87/grammar-school.jpg?s=612x612&w=0&k=20&c=Kr8DtgTUSOW6quSZjFFd_-0JoySxEhqcdG94ty0PmVA=',
      rows: 1,
      cols: 2,
    },
    {
      src: 'https://media.gettyimages.com/id/477252604/zh/%E7%85%A7%E7%89%87/japanese-high-school-an-empty-school-gymnasium-basketball-court-markings.jpg?s=612x612&w=0&k=20&c=dMjff-cujzpHYwi4sWkx5d7mlty8wAF70Ct0eRr687o=',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://media.gettyimages.com/id/1385900794/zh/%E7%85%A7%E7%89%87/athletics-track.jpg?s=612x612&w=0&k=20&c=D61r_Ewr-RUi7JBq6jynRFujpNqOdc6Ew2WTpQ8eDmE=',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://media.gettyimages.com/id/183252976/zh/%E7%85%A7%E7%89%87/stadium-ground-level.jpg?s=612x612&w=0&k=20&c=B57J8wyoin1JrVMtCjZ3FeNYn3F5j_VInCI-vB6qAT0=',
      rows: 1,
      cols: 2,
    },
  ];

  const photosToShow = isMd ? photos : photos.slice(0, photos.length - 1);

  return (
    <Box>
      <Box display={'flex'} justifyContent={'flex-end'} marginBottom={2}>
        <Button
          color="primary"
          size="large"
          endIcon={
            <svg
              width={16}
              height={16}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          }
          onClick={() => openLightbox(0)}
        >
          Open the gallery
        </Button>
      </Box>
      <Box>
        <ImageList
          variant="quilted"
          cols={4}
          rowHeight={isMd ? 300 : 220}
          gap={isMd ? 16 : 8}
        >
          {photosToShow.map((item, i) => (
            <ImageListItem
              key={i}
              cols={isMd ? item.cols || 1 : 2}
              rows={isMd ? item.rows || 1 : 1}
            >
              <LazyLoadImage
                height={'100%'}
                width={'100%'}
                src={item.src}
                alt="..."
                effect="blur"
                onClick={() => openLightbox(i)}
                style={{
                  objectFit: 'cover',
                  cursor: 'poiner',
                  borderRadius: 4,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      {viewerIsOpen && (
        <Lightbox
          mainSrc={photos[currentImage].src}
          nextSrc={photos[(currentImage + 1) % photos.length].src}
          prevSrc={
            photos[(currentImage + photos.length - 1) % photos.length].src
          }
          onCloseRequest={() => closeLightbox()}
          onMovePrevRequest={() =>
            setCurrentImage((currentImage + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % photos.length)
          }
          reactModalStyle={{ overlay: { zIndex: 1500 } }}
        />
      )}
    </Box>
  );
};

export default Gallery;
