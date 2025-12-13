using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using PruebaTecnicaCarsalesAPI.Configuration;
using PruebaTecnicaCarsalesAPI.Dtos;
using PruebaTecnicaCarsalesAPI.Extensions;
using PruebaTecnicaCarsalesAPI.Interfaces;
using PruebaTecnicaCarsalesAPI.Models;
using PruebaTecnicaCarsalesAPI.Models.Filters;
using PruebaTecnicaCarsalesAPI.Models.Pagination;
using PruebaTecnicaCarsalesAPI.Utils;

namespace PruebaTecnicaCarsalesAPI.Services
{
    public class RickAndMortyService : IRickAndMortyService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<RickAndMortyService> _logger;
        private readonly RickAndMortyApiOptions _apiOptions;

        public RickAndMortyService(
            HttpClient httpClient,
            IMemoryCache cache,
            ILogger<RickAndMortyService> logger,
            IOptions<RickAndMortyApiOptions> apiOptions)
        {
            _httpClient = httpClient;
            _logger = logger;
            _apiOptions = apiOptions.Value;
        }

        #region Characters
        
        public async Task<PagedResult<CharacterDto>> GetCharacters(CharacterFilterParams filterParams)
        {
            //contruye query de los filtros
            var queryString = filterParams.ToQueryString();

            var response = await _httpClient.GetAsync($"character?{queryString}");

            //lanza error si falla al middleware
            response.EnsureSuccessStatusCode();

            //recibe contenido y deserializa 
            string content = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<ApiResponseDto<Character>>(content, new JsonSerializerOptions{ PropertyNameCaseInsensitive = true });
            if (data == null)
                throw new InvalidOperationException("Error en respuesta de Rick And Morty API.");

            var dataToDto = data.Results.ToDto();

            //Data maneja resultados
            //Info maneja propiedades de paginacion según Modelo
            var result = new PagedResult<CharacterDto>
            {
                Data = dataToDto,
                Info = new PaginationInfo
                {
                    Count = data.Info?.Count ?? 0,
                    Pages = data.Info?.Pages ?? 0,
                    CurrentPage = filterParams.Page,
                    Next = PaginationHelper.ExtractPageNumber(data.Info?.Next),
                    Prev = PaginationHelper.ExtractPageNumber(data.Info?.Prev)
                }
            };

            return result;
        }


        public async Task<CharacterDto> GetCharacterById(int id)
        {
            if(id < 0)
                throw new InvalidOperationException($"Se requiere el identificador del personaje.");

            var response = await _httpClient.GetAsync($"character/{id}");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<Character>(content, new JsonSerializerOptions{ PropertyNameCaseInsensitive = true });

            if (data == null)
                throw new InvalidOperationException($"Personaje no encontrado.");

            var dataToDto = data.ToDto();
            return dataToDto;
        }


        public async Task<List<CharacterDto>> GetCharactersByIds(int[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new List<CharacterDto>();

            string idsString = string.Join(",", ids);

            var response = await _httpClient.GetAsync($"character/{idsString}");
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<List<Character>>(content, new JsonSerializerOptions{ PropertyNameCaseInsensitive = true });

            if (data == null)
                throw new InvalidOperationException($"Personajes no encontrados.");

            var dataToDto = data.ToDto().ToList();
            return dataToDto;
        }

        #endregion




        #region Episodes

        public async Task<PagedResult<EpisodesDto>> GetEpisodes(EpisodesFilterParams filterParams)
        {
            var queryString = filterParams.ToQueryString();
            var response = await _httpClient.GetAsync($"episode?{queryString}");
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<ApiResponseDto<Episodes>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (data == null)
                throw new InvalidOperationException("Error en respuesta de Rick And Morty API.");

            var dataToDto = data.Results.ToDto();

            var result = new PagedResult<EpisodesDto>
            {
                Data = dataToDto,
                Info = new PaginationInfo
                {
                    Count = data.Info?.Count ?? 0,
                    Pages = data.Info?.Pages ?? 0,
                    CurrentPage = filterParams.Page,
                    Next = PaginationHelper.ExtractPageNumber(data.Info?.Next),
                    Prev = PaginationHelper.ExtractPageNumber(data.Info?.Prev)
                }
            };

            return result;
        }



        public async Task<EpisodesDto> GetEpisodeById(int id)
        {
            if (id < 0)
                throw new InvalidOperationException($"Se requiere el identificador del episodio.");

            var response = await _httpClient.GetAsync($"episode/{id}");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<Episodes>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (data == null)
                throw new InvalidOperationException($"Episodio no encontrado.");

            EpisodesDto dataToDto = data.SingleEpisodeToDto();
            if (dataToDto != null && dataToDto.Characters.Count > 0)
            {
                int[] ids = dataToDto.Characters.Select(int.Parse).ToArray();
                dataToDto.CharactersList = GetCharactersByIds(ids).Result;
            }

            return dataToDto;
        }


        public async Task<List<EpisodesDto>> GetEpisodesByIds(int[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new List<EpisodesDto>();

            string idsString = string.Join(",", ids);

            var response = await _httpClient.GetAsync($"episode/{idsString}");
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<List<Episodes>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (data == null)
                throw new InvalidOperationException($"Personajes no encontrados.");

            var dataToDto = data.ToDto().ToList();
            return dataToDto;
        }

        #endregion
    }
}
