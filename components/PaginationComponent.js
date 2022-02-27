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
    const res = await Api(token, `?page=${page}&size=3`);
    console.log(page)
    console.log(res.content);
    setProductAll(res.content);
  };

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink
          first
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
        />
      </PaginationItem>
      <PaginationItem active={ true } onClick={ () => pageClick(0)}>
            <PaginationLink >
              1
            </PaginationLink>
          </PaginationItem>
      {
        items.map((item) => (
          <PaginationItem active={ false } onClick={ () => pageClick(item) }>
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
      <PaginationItem>
        <PaginationLink
          last
        />
      </PaginationItem>
    </Pagination>
  )
};

export default PaginationComponent