using PruebaTecnicaCarsalesAPI.Dtos;
using PruebaTecnicaCarsalesAPI.Models;
using PruebaTecnicaCarsalesAPI.Utils;

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
                Episode = new(),
                Origin = null,
                Location = null,
                Image = character.Image,
            };
        }

        public static IEnumerable<CharacterDto> ToDto(this IEnumerable<Character> characters)
        {
            return characters.Select(c => c.ToDto());
        }

        public static CharacterDto SingleEpisodeToDto(this Character character)
        {
            return new CharacterDto
            {
                Id = character.Id,
                Name = character.Name,
                Status = character.Status,
                Species = character.Species,
                Gender = character.Gender,
                Episode =  FormatHelper.ExtractIdList(urls: character.Episode),
                Origin = character.Origin?.Name ?? "",
                Location = character.Location?.Name ?? "",
                Image = character.Image,
            };
        }
    }
}
