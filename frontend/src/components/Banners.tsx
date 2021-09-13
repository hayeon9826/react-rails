import React, { useEffect, useState } from 'react';
import { API_URL, getObjects } from '@api';
import { Banner, Objects } from '@constants';
import { Swiper, SwiperSlide, Link, SkeletonImage, SkeletonText } from 'framework7-react';
import { useQuery } from 'react-query';

const Banners: React.FC = () => {
  const { status, data: banners, isLoading, isFetching } = useQuery<Objects<Banner>, Error>(
    ['banners'],
    getObjects({ model_name: 'banner', q: { banner_type_eq: 'main', status_eq: 'active' }, per: '16' }),
  );

  return (
    <>
      {banners && banners.total_count > 0 && (
        <Swiper
          speed={100}
          slidesPerView={1}
          spaceBetween={5}
          observer
          loop
          pagination={{ clickable: true }}
          style={{ height: '45vw', backgroundColor: '#e9ecef' }}
        >
          {banners?.objects.map((banner: Banner, i: number) => (
            <SwiperSlide key={banner?.id || i}>
              {isLoading || isFetching ? (
                <div className="bg-default">
                  <div className="background">
                    <SkeletonImage
                      tag="span"
                      showIcon={false}
                      className="open-photo-browser w-100"
                      width={100}
                      height={100}
                      color="grey"
                      effect="fade"
                      borderRadius="0"
                      iconColor="grey"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <a href={`${banner?.link ? banner?.link : '#'}`} className="w-100">
                    <img
                      src={`${API_URL + banner?.image_path}`}
                      alt=""
                      className="rounded"
                      style={{ maxHeight: '45vw', margin: '0 auto', backgroundColor: '#e9ecef', objectFit: 'cover' }}
                    />
                  </a>
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Banners;
