namespace PruebaTecnicaCarsalesAPI.Dtos
{
    public class ApiResponseDto<T>
    {
        public ApiInfoDto? Info { get; set; }
        public List<T> Results { get; set; } = new();
    }
}
