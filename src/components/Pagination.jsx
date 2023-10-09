import React from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage, lastPostIndex, npage}) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    const nextPage = () => {
      if(currentPage !==npage){
        setCurrentPage(currentPage + 1)
      }
    }

    const prevPage = () => {
        if(currentPage !== 1){
            setCurrentPage(currentPage -1)
          }
    }


    return (
        <>  
          <div className='flex gap-4'>
            {/* {
                pages.map((page, index) => {
                   return <div className={`${page == currentPage ? "bg-[#276a8c] text-white": ""}  text-black cursor-pointer rounded-md border border-black w-7 flex justify-center items-center`} onClick={() => setCurrentPage(page)}> {page} </div>
                })
            } */}

            <p className='text-black text-base  flex justify-center items-center'>
                {currentPage} - {npage}
            </p>

            <div className={`border cursor-pointer w-7 h-7 rounded-xl text-black ${currentPage !== npage ? "text-[#a8a8a8]": ""} flex justify-center items-center`} onClick={prevPage}>
                <IoMdArrowDropleft  />
            </div>
    
            <div className={`border cursor-pointer w-7 h-7 rounded-xl text-black ${currentPage == npage ? "text-[#a8a8a8]": ""} flex justify-center items-center`} onClick={nextPage}>
                <IoMdArrowDropright  />
            </div>
             
          </div>
        </>
    )
}

export default Pagination
