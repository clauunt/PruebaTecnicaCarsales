using PruebaTecnicaCarsalesAPI.Models.Pagination;

namespace PruebaTecnicaCarsalesAPI.Models.Filters
{
    public class EpisodesFilterParams : PaginationParams
    {
        public string? Name { get; set; }
        public string? Episode { get; set; }
        public string ToQueryString()
        {
            var queryParams = new List<string> { $"page={Page}&limit={PageSize}" };

            if (!string.IsNullOrWhiteSpace(Name)) queryParams.Add($"name={Uri.EscapeDataString(Name)}");
            if (!string.IsNullOrWhiteSpace(Episode)) queryParams.Add($"episode={Uri.EscapeDataString(Episode)}");

            return string.Join("&", queryParams);
        }
    }
}
