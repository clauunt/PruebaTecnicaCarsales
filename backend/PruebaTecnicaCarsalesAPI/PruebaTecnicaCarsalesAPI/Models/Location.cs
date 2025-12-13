namespace PruebaTecnicaCarsalesAPI.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Dimension { get; set; } = string.Empty;
        public Array[] residents { get; set; } = [];
        public string Url { get; set; } = string.Empty;
        public DateTime Created { get; set; }
    }
}