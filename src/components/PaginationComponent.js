import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { parseCookies } from "nookies";
import { listProducts as Api } from '../services/api-franchise';


const PaginationComponent  = ({ totalPages, setProductAll }) => {
  let items = []
    for (let i = 1; i <= (totalPages - 1); i++) {
      items.push(i)
  }

  const pageClick = async (page) => {
    const { 'nextToken': token } = parseCookies();
    const res = await Api(token, `?page=${page}&size=10`);
    setProductAll(res.content);
  };

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem onClick={ () => pageClick(0) }>
        <PaginationLink
          first
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
        />
      </PaginationItem>
      <PaginationItem onClick={ () => pageClick(0)}>
            <PaginationLink >
              1
            </PaginationLink>
          </PaginationItem>
      {
        items.map((item, index) => (
          <PaginationItem key={ index } onClick={ () => pageClick(item) }>
            <PaginationLink>
              { item + 1 }
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem>
        <PaginationLink
          next
        />
      </PaginationItem>
      <PaginationItem onClick={ () => pageClick(totalPages -1) }>
        <PaginationLink
          last
        />
      </PaginationItem>
    </Pagination>
  )
};

export default PaginationComponent