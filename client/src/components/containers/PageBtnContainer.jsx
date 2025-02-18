import { useLocation, Link, useNavigate } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import { useAllJobsContext } from '../../pages/AllJobs';
import Wrapper from '../../assets/wrappers/PageBtnContainer';

const PageBtnContainer = () => {
  const {
    data: { numberOfPages, currentPage },
  } = useAllJobsContext();

  // _ means we're gonna access the undefined value which we don't need
  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });

  return (
    <Wrapper>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumber === currentPage && 'active'
              }`}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="btn next-btn">
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
