namespace PruebaTecnicaCarsalesAPI.Models.Pagination
{
    public class PagedResult<T>
    {
        public IEnumerable<T> Data { get; set; } = new List<T>();
        public PaginationInfo Info { get; set; } = new PaginationInfo();
    }
}
