import React, { useEffect, useState } from 'react';
import { API_URL, getObjects } from '@api';
import { Banner, Objects } from '@constants';
import { Swiper, SwiperSlide, Link, SkeletonImage, SkeletonText } from 'framework7-react';
import { useQuery } from 'react-query';

const Banners: React.FC = () => {
  const { status, data: banners, isLoading, isFetching } = useQuery<Objects<Banner>, Error>(
    ['banners'],
    getObjects({ model_name: 'banner', q: { banner_type: 'main', status: 'active' }, per: '16' }),
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
            <SwiperSlide key={banner?.id || i} style={{ height: '45vw', backgroundColor: '#e9ecef' }}>
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
                  <Link href={`${banner?.link ? banner?.link : '#'}`}>
                    <img src={`${API_URL + banner?.image_path}`} alt="" className="open-photo-browser w-100" />
                  </Link>
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
