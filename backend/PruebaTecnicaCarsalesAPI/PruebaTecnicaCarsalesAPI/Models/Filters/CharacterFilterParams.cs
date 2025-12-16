using PruebaTecnicaCarsalesAPI.Models.Pagination;

namespace PruebaTecnicaCarsalesAPI.Models.Filters
{
    public class CharacterFilterParams : PaginationParams
    {
        public string? Name { get; set; }
        public string? Status { get; set; }
        public string? Species { get; set; }
        public string? Type { get; set; }
        public string? Gender { get; set; }
        public string ToQueryString()
        {
            var queryParams = new List<string> { $"page={Page}&limit={PageSize}" };

            if (!string.IsNullOrWhiteSpace(Name)) queryParams.Add($"name={Uri.EscapeDataString(Name)}");
            if (!string.IsNullOrWhiteSpace(Status)) queryParams.Add($"status={Uri.EscapeDataString(Status)}");
            if (!string.IsNullOrWhiteSpace(Species)) queryParams.Add($"species={Uri.EscapeDataString(Species)}");
            if (!string.IsNullOrWhiteSpace(Type)) queryParams.Add($"type={Uri.EscapeDataString(Type)}");
            if (!string.IsNullOrWhiteSpace(Gender)) queryParams.Add($"gender={Uri.EscapeDataString(Gender)}");

            return string.Join("&", queryParams);
        }
    }
}
