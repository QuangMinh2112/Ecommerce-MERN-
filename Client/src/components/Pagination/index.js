import React, { memo} from 'react'
import usePagination from '../../hooks/usePagination'
import PaginationItem from './Item'
import { useSearchParams } from 'react-router-dom'


function Pagination({totalCount}) {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, +params.get('page') || 1)

  const range = ()=>{
    const currentPage = params.get('page') || 1
    const pageSize = process.env.REACT_APP_LIMIT || 10
    const startPageProduct = Math.min(((currentPage - 1 ) * pageSize) + 1, totalCount)
    const endPageProduct = Math.min(pageSize * currentPage,totalCount)

    return `${startPageProduct} - ${endPageProduct}`
  }
  return (
    <div className="w-full flex justify-between items-center">
      {!params.get('page') &&<span className="text-sm italic">{`Show products ${Math.min(totalCount, 1)} - ${Math.min(+process.env.REACT_APP_LIMIT,totalCount)|| 10} of ${totalCount}`}</span>}
      {params.get('page') &&<span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>}
      <div className="flex items-center gap-2">
      {pagination?.map(el=>(
        <PaginationItem key={el}>
          {el}
        </PaginationItem>
      ))}
      </div>
    </div>
  )
}

export default memo(Pagination)