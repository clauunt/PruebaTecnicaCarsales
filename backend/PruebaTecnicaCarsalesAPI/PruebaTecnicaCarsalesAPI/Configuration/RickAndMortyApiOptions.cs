namespace PruebaTecnicaCarsalesAPI.Configuration
{
    public class RickAndMortyApiOptions
    {
        public const string SectionName = "RickAndMortyApi";
        public string BaseUrl { get; set; } = string.Empty;
        public int CacheExpirationMinutes { get; set; } = 10;
    }
}
