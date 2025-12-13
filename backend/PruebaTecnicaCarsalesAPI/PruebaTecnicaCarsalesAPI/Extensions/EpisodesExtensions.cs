using PruebaTecnicaCarsalesAPI.Dtos;
using PruebaTecnicaCarsalesAPI.Models;
using PruebaTecnicaCarsalesAPI.Utils;

namespace PruebaTecnicaCarsalesAPI.Extensions
{
    public static class EpisodesExtensions
    {
        public static EpisodesDto ToDto(this Episodes episodio)
        {
            return new EpisodesDto
            {
                Id = episodio.Id,
                Name = episodio.Name,
                AirDate = episodio.AirDate,
                Episode = episodio.Episode,
                Characters = new List<string>(),
                Url = episodio.Url,
            };
        }

        public static IEnumerable<EpisodesDto> ToDto(this IEnumerable<Episodes> episodio)
        {
            return episodio.Select(c => c.ToDto());
        }

        public static EpisodesDto SingleEpisodeToDto(this Episodes episodio)
        {
            return new EpisodesDto
            {
                Id = episodio.Id,
                Name = episodio.Name,
                AirDate = episodio.AirDate,
                Episode = episodio.Episode,
                Characters =  FormatHelper.ExtractIdList(urls: episodio.Characters),
                Url = episodio.Url,
            };
        }
    }
}
