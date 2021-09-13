import Categories from '@components/Categories';
import Banners from '@components/Banners';
import SmallBanner from '@components/SmallBanner';
import { Link, Navbar, NavLeft, NavRight, NavTitle, Page, Subnavbar, Searchbar } from 'framework7-react';
import React from 'react';

const HomePage = () => (
  <Page name="home">
    <Navbar>
      <NavLeft>{/* <Link icon="las la-bars" panelOpen="left" /> */}</NavLeft>
      <NavTitle>COUPANG</NavTitle>
      <NavRight>
        <Link href="/notifications" iconF7="bell" iconBadge={3} badgeColor="red" />
      </NavRight>
      <Subnavbar inner={false} className="pb-2">
        <Searchbar
          searchContainer=".search-list"
          searchIn=".item-title"
          disableButton={false}
          placeholder="쿠팡에서 검색하세요!"
        ></Searchbar>
      </Subnavbar>
    </Navbar>
    <Banners />
    <Categories />
    <SmallBanner />
  </Page>
);
export default React.memo(HomePage);
