const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;

const getPaginationDetails = (query: Record<any, any> ) => {
  const page = Math.abs(Number(query.page)) || DEFAULT_PAGE;
  const limit = Math.abs(Number(query.limit)) || DEFAULT_PAGE;

  return {
    limit,
    skip: (page - 1) * limit
  }
}

export default getPaginationDetails