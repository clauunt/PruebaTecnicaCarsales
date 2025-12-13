using PruebaTecnicaCarsalesAPI.Models;

namespace PruebaTecnicaCarsalesAPI.Dtos
{
    public class CharacterDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string? Origin { get; set; } = null;
        public string? Location { get; set; } = null;
        public List<string>? Episode { get; set; } = new();
    }
}
