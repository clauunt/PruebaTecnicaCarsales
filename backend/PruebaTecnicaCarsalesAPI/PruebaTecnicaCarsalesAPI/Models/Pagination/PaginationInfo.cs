namespace PruebaTecnicaCarsalesAPI.Models.Pagination
{
    public class PaginationInfo
    {
        public int Count { get; set; }
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
        public string? Next { get; set; }
        public string? Prev { get; set; }
    }
}
