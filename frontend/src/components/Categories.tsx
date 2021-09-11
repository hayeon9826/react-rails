import React, { useEffect, useState } from 'react';
import { API_URL, getCategories } from '@api';
import { Link, SkeletonBlock, SkeletonText, Swiper, SwiperSlide } from 'framework7-react';
// import { useQuery } from 'react-query';
import { Category } from '@constants';

// const categoriesSkeletonPlaceholder = (size) => new Array(size).fill({});

const Categories = () => {
  // const { data: categories, isLoading, isError, isFetching } = useQuery<Category[], Error>(
  //   'categories',
  //   getCategories({ q: { s: ['title asc'] } }),
  //   { placeholderData: categoriesSkeletonPlaceholder(16) },
  // );

  // if (isError) {
  //   return (
  //     <div className="h-32 flex items-center justify-center">
  //       <span className="text-gray-400">서버에 문제가 발생 했습니다. </span>
  //     </div>
  //   );
  // }
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryLength, setCategoryLength] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const { data } = await getCategories({ q: { s: ['title asc'] } });
      setCategories(data);
      setCategoryLength(data.length);
    })();
  }, []);

  return (
    <>
      <Swiper
        className="h-25"
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        pagination={{ clickable: true }}
        observer
      >
        {Array.from(Array(Math.ceil(categoryLength / 10)).keys()).map((i) => (
          <SwiperSlide key={i}>
            <div className="mb-3 grid grid-cols-5 gap-1 p-1">
              {categories.slice(i * 10, (i + 1) * 10).map((category: Category, i) => (
                <div key={category.id}>
                  {categories.length ? (
                    <Link
                      href={`/items?category_id=${category.id}`}
                      className="bg-white h-20 flex flex-col items-center justify-center"
                      key={category.id}
                    >
                      <img src={API_URL + category.image_path} alt="#" className="w-8 h-8 rounded-lg" />
                      <span className="text-gray-500 mt-1">{category.title}</span>
                    </Link>
                  ) : (
                    <Link href="#" className="bg-white h-20 flex flex-col items-center justify-center" key={i}>
                      <SkeletonBlock slot="media" className="w-8 h-8 rounded-lg" effect="fade" />
                      <span className="text-gray-500 mt-1">
                        <SkeletonText>---</SkeletonText>
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default React.memo(Categories);
