import React, { useMemo } from 'react'
import { generateRange } from '../utils/helper'
import {RxDotsHorizontal} from "react-icons/rx"

const usePagination =(totalProductCount,currentPage,siblingCount =1)=>{
    const paginationArray = useMemo(()=>{
        const pageSize = process.env.REACT_APP_LIMIT || 10
        const paginationCount = Math.ceil(totalProductCount / pageSize)
        const totalPaginationItem = siblingCount + 5

        if(paginationCount <= totalPaginationItem) return generateRange(1,paginationCount)

        const shouldShowLeftDots  = currentPage - siblingCount > 2
        const shouldShowRightDots = currentPage + siblingCount < paginationCount -1

        if(shouldShowLeftDots && !shouldShowRightDots){
          const rightStart = paginationCount - 4
          const rightRange = generateRange(rightStart, paginationCount)

          return [1,<RxDotsHorizontal />,...rightRange]
        }

        if(!shouldShowLeftDots && shouldShowRightDots){
          const leftRange = generateRange(1, 5)

          return [...leftRange,<RxDotsHorizontal />,paginationCount]
        }

        const siblingLeft = Math.max(currentPage - siblingCount,1)
        const siblingRight = Math.min(currentPage + siblingCount, paginationCount)

        if(shouldShowLeftDots && shouldShowRightDots){
          const middleRange = generateRange(siblingLeft,siblingRight)
          return [1,<RxDotsHorizontal />,...middleRange,<RxDotsHorizontal />,paginationCount]
        }
    },[totalProductCount,currentPage,siblingCount])
  return paginationArray
}

export default usePagination

// first + last + current + 2*dots
// sibling: sibling + 5
// totalPagination:totalProduct / limitProduct -> Ex:totalProduct=66,limitProduct=10=>totalPagination = 66/10=6.6->7 trang
// [1,2,3,4,5,6]
// [1,...,6,7,8,9,10]
// [1,2,3,4,5,6,...,10]
// [1,...,5,6,7,...,10]