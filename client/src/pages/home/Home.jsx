import { useState } from "react";
import { useSearchParams } from "react-router-dom"; // new one
import { images } from "../../data/images";
import ReactPaginate from "react-paginate";
import styles from "./Home.module.css";

export const Home = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [loadedImages, setLoadedImages] = useState({});

   const itemsPerPage = 20;
   const currentPage = parseInt(searchParams.get("page")) || 1;
   // const [itemOffset, setItemOffset] = useState(() => {
   //    return parseInt(localStorage.getItem("offset") || "0", 10);
   // });
   const itemOffset = (currentPage - 1) * itemsPerPage;

   // const endOffset = itemOffset + itemsPerPage;
   // const currentItems = images.slice(itemOffset, endOffset);
   // const pageCount = Math.ceil(images.length / itemsPerPage);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = images.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(images.length / itemsPerPage);

   // const getOptimizedUrl = (url) => {
   //    if (url.includes("unsplash.com")) {
   //       return `${url}?w=400&h=300&fit=crop&q=75`;
   //    }
   //    return url;
   // };
   const getOptimizedUrl = (url) => {
      if (url.includes("unsplash.com")) {
         return `${url}?w=400&h=300&fit=crop&q=75`;
      }
      return url;
   };

   //    const handlePageClick = (e) => {
   //       const newOffset = (e.selected * itemsPerPage) % images.length;
   //       localStorage.setItem("offset", newOffset);
   //       setItemOffset(newOffset);
   //    };
   const handlePageClick = (e) => {
      const newPage = e.selected + 1;
      setSearchParams({
         page: newPage.toString(),
      });
      setLoadedImages({}); // Reset loaded images when changing page
   };

   const scrollToTop = () => {
      window.scrollTo(0, 0);
   };

   return (
      <>
         <div className={styles.home}>
            <h1>POSTS</h1>
            <div className={styles.imgContainer}>
               {currentItems.map((img, i) => (
                  <div key={`${currentPage}-${i}`} className={styles.imageWrapper}>
                     {!loadedImages[`${currentPage}-${i}`] && (
                        <div className={styles.placeholder}></div>
                     )}
                     <img
                        src={getOptimizedUrl(img)}
                        alt={`Post ${i + 1}`}
                        loading="lazy"
                        onLoad={() =>
                           setLoadedImages((prev) => ({
                              ...prev,
                              [`${currentPage}-${i}`]: true,
                           }))
                        }
                        style={{
                           opacity: loadedImages[`${currentPage}-${i}`] ? 1 : 0,
                           transition: "opacity 0.3s ease",
                        }}
                     />
                  </div>
               ))}
            </div>
            <ReactPaginate
               breakLabel="..."
               nextLabel="next >"
               onPageChange={handlePageClick}
               pageRangeDisplayed={3}
               pageCount={pageCount}
               forcePage={currentPage - 1}
               previousLabel="< prev"
               containerClassName={styles.pagination}
               activeClassName={styles.activePage}
               previousClassName={styles.prevBtn}
               nextClassName={styles.nextBtn}
               disabledClassName={styles.disableBtn}
               renderOnZeroPageCount={null}
               onClick={() => scrollToTop()}
            />
         </div>
      </>
   );
};
