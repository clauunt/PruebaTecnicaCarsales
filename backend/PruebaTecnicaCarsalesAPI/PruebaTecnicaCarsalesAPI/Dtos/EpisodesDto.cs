namespace PruebaTecnicaCarsalesAPI.Dtos
{
    public class EpisodesDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string AirDate { get; set; } = string.Empty;
        public string Episode { get; set; } = string.Empty;
        public List<string> Characters { get; set; } = new List<string>();
        public List<CharacterDto> CharactersList { get; set; } = new List<CharacterDto>();

        public string Url { get; set; } = string.Empty;
    }
}
