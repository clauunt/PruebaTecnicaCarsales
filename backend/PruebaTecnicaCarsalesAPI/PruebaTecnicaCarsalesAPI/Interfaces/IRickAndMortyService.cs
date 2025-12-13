using PruebaTecnicaCarsalesAPI.Models;
using PruebaTecnicaCarsalesAPI.Dtos;
using PruebaTecnicaCarsalesAPI.Models.Filters;
using PruebaTecnicaCarsalesAPI.Models.Pagination;

namespace PruebaTecnicaCarsalesAPI.Interfaces
{
    public interface IRickAndMortyService
    {

        Task<PagedResult<CharacterDto>> GetCharacters(CharacterFilterParams filterParams);

        Task<CharacterDto> GetCharacterById(int id);
        Task<List<CharacterDto>> GetCharactersByIds(int[] ids);

        Task<PagedResult<EpisodesDto>> GetEpisodes(EpisodesFilterParams filterParams);
        Task<EpisodesDto> GetEpisodeById(int id);
        Task<List<EpisodesDto>> GetEpisodesByIds(int[] ids);

    }
}
