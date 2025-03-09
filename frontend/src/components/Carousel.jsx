import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import * as React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { IconButton } from "@material-tailwind/react";
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa6"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

/*
function CustomNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
      >
        <FaChevronLeft className="h-7 w-7 -translate-x-0.5 stroke-2 text-sky-200" />
      </IconButton>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
      >
        <FaChevronRight className="h-7 w-7 translate-x-px stroke-2 text-sky-200" />
      </IconButton>
    </>
  );
}*/

function CustomNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2 border-0 focus:outline-none cursor-pointer"
      >
        <FaChevronLeft className="h-7 w-7 -translate-x-0.5 stroke-2 text-sky-50" />
      </IconButton>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2 border-0 focus:outline-none cursor-pointer"
      >
        <FaChevronRight className="h-7 w-7 translate-x-px stroke-2 text-sky-50" />
      </IconButton>
    </>
  );
}


function customPagination(_, className) {
  return `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))] !opacity-50 ![background:rgb(var(--color-background))]"></span>`;
}

export default function Carousel() {
  return (
    <div className="max-w-full h-full">
      <Swiper
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
          renderBullet: customPagination,
        }}
        modules={[Navigation, Pagination]}
        className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background"
      >
        {[
          /*
          "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",
          */
         "https://www.cima.ned.org/wp-content/uploads/2023/09/eE1qjnma.jpeg",
         "https://penntoday.upenn.edu/sites/default/files/2023-02/agarwal-anish-COVID-misinfo-teaser.jpg",
         "https://www.washingtonpost.com/wp-apps/imrs.php?src=https%3A%2F%2Farc-anglerfish-washpost-prod-washpost.s3.amazonaws.com%2Fpublic%2FILAILVPBRFGXJO7ZTMQ3ISGLXA.jpg&w=1440",
         "https://therecount.com/cdn-cgi/image/f%3Dauto%2Cwidth%3D2560%2Cfit%3Dcover%2Cgravity%3Dauto/https%3A//files.therecount.com/site/videos/2645880492/1648777267144.png",
         "https://www.pnas.org/cms/10.1073/pnas.2314143120/asset/29440d6e-06c1-4fee-ae1c-d4fdd76b0a4a/assets/images/large/pnas.2314143120unfig01.jpg"
        ].map((img, index) => (
          <SwiperSlide key={index} className="select-none">
            <img
              src={img}
              alt={`image-${index}`}
              className="h-[52rem] w-full object-cover"
            />
          </SwiperSlide>
        ))}
        <CustomNavigation />
      </Swiper>
    </div>
  );
}
