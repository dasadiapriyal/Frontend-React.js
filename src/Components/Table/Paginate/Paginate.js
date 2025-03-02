import ReactPaginate from "react-paginate"
import { Input, Label } from "reactstrap"

const Paginate = (props) => {
  const {
    current,
    pageSize,
    total,
    showSizeChanger,
    onShowSizeChange,
    onPageChange,
  } = props

  const pageCount = Math.ceil(total / pageSize)

  return (
    <div>
      <ReactPaginate
        previousLabel={" Prev"}
        nextLabel={"Next "}
        breakLabel="..."
        pageCount={Math.ceil(pageCount) || 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        activeClassName="active"
        forcePage={current ? current : 0}
        onPageChange={(pgNo) => onPageChange(pgNo.selected)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-center mt-2"
        }
      />
      <div className="">
        {showSizeChanger ? (
          <div className="d-flex align-items-center page-entry-box">
            <Label for="sort-select">Show</Label>
            <Input
              className="dataTable-select"
              type="select"
              id="sort-select"
              value={pageSize}
              onChange={(e) => onShowSizeChange(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </Input>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Paginate
