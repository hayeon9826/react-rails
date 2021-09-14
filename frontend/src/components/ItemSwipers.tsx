import React, { useEffect, useState } from 'react';
import { API_URL, getCategory, getItems, getObjects } from '@api';
import { Item, Objects } from '@constants';
import { Router } from 'framework7/types';
import { useFormik } from 'formik';
import { Swiper, SwiperSlide, Link, SkeletonImage, ListItem } from 'framework7-react';
import { useQuery } from 'react-query';
import { currency } from '@js/utils';

const SortStates = [
  ['created_at desc', '최신순'],
  ['sale_price desc', '높은가격순'],
  ['sale_price asc', '낮은가격순'],
] as const;
type SortState = typeof SortStates[number][0];

interface ItemFilterProps {
  s: SortState;
  category_id_eq: string;
}

interface ItemSwiperProps {
  f7route: Router.Route;
}

const ItemSwipers: React.FC = () => {
  //   const { is_main, category_id } = f7route.query;
  const category_id = 1;
  const { status, data: items, isLoading, isFetching } = useQuery<Objects<Item>, Error>(
    ['items'],
    getObjects({ model_name: 'item', q: { banner_type_eq: 'small', status_eq: 'active' }, per: '16' }),
  );

  const [category, setCategory] = useState(null);

  //   const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    // then을 사용
    if (category_id) {
      getCategory(category_id).then((resp) => {
        setCategory(resp.data);
      });
    }
    // async await 을 사용
    (async () => {
      const { data } = await getItems();
      //   setItems(data.items);
    })();
  }, []);

  const filterForm = useFormik<ItemFilterProps>({
    initialValues: {
      s: 'created_at desc',
      category_id_eq: category_id,
    },
    onSubmit: async () => {
      // await queryClient.removeQueries(ITEM_KEY);
      // await refetch();
    },
  });

  return (
    <>
      <div className="font-semibold text-base border-t-8 border-gray-100 p-2 border-b">
        내가 본 상품의 연관상품
        <a className="float-right mr-1 text-sm font-normal text-indigo-600" href={`/items`}>
          더보기
        </a>
      </div>
      {items && items.total_count > 0 && (
        <Swiper speed={100} slidesPerView={3} spaceBetween={5} observer loop className="mb-3 mt-2">
          {items?.objects?.map((item: Item, i: number) => (
            <SwiperSlide key={item?.id || i}>
              <>
                <React.Fragment key={item.id}>
                  <div className="mr-1 ml-1 grid-list-item relative">
                    <ListItem
                      mediaItem
                      link={`/items/${item.id}`}
                      title={`${item.id}-${item.name}`}
                      subtitle={`${currency(item.sale_price)}원`}
                      header={category_id ? category?.title : ''}
                      className="w-full"
                    >
                      <img
                        slot="media"
                        alt=""
                        src={API_URL + item.image_path}
                        className="w-100 m-auto radius rounded shadow"
                      />
                    </ListItem>
                  </div>
                </React.Fragment>
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ItemSwipers;
