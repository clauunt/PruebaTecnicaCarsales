using PruebaTecnicaCarsalesAPI.Dtos;
using PruebaTecnicaCarsalesAPI.Models;

namespace PruebaTecnicaCarsalesAPI.Extensions
{
    public static class CharacterExtensions
    {
        public static CharacterDto ToDto(this Character character)
        {
            return new CharacterDto
            {
                Id = character.Id,
                Name = character.Name,
                Status = character.Status,
                Species = character.Species,
                Gender = character.Gender,
                Image = character.Image,
            };
        }

        public static IEnumerable<CharacterDto> ToDto(this IEnumerable<Character> characters)
        {
            return characters.Select(c => c.ToDto());
        }
    }
}
