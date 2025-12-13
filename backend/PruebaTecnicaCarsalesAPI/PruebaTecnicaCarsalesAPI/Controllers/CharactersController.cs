using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaCarsalesAPI.Dtos;
using PruebaTecnicaCarsalesAPI.Interfaces;
using PruebaTecnicaCarsalesAPI.Models.Errors;
using PruebaTecnicaCarsalesAPI.Models.Filters;
using PruebaTecnicaCarsalesAPI.Models.Pagination;

namespace PruebaTecnicaCarsalesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharactersController : ControllerBase
    {
        private readonly IRickAndMortyService _rickAndMortyService;
        private readonly ILogger<CharactersController> _logger;

        public CharactersController(
            IRickAndMortyService rickAndMortyService, 
            ILogger<CharactersController> logger
        )
        {
            _rickAndMortyService = rickAndMortyService;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedResult<CharacterDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<CharacterDto>>> GetAll([FromQuery] CharacterFilterParams filters)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ErrorResponse
                {
                    StatusCode = 400,
                    Message = "Parámetros de filtro inválidos",
                    Details = string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))
                });
            }

            if (filters.Page < 1)
                return BadRequest(new ErrorResponse{ StatusCode = 400, Message = "El número de la página debe ser mayor o igual a 1" });

            _logger.LogInformation(
                "Obtener Personajes - Page: {Page}, Name: {Name}, Status: {Status}, Species: {Species}, Type: {Type}, Gender: {Gender}", 
                filters.Page, filters.Name, filters.Status, filters.Species, filters.Type, filters.Gender
            );

            var result = await _rickAndMortyService.GetCharacters(filters);
            return Ok(result);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CharacterDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CharacterDto>> GetById(int id)
        {
            if (id <= 0)
                return BadRequest(new ErrorResponse{ StatusCode = 400, Message = "El ID debe ser un número positivo" });

            _logger.LogInformation("Obteniendo personaje con ID: {Id}", id);

            var character = await _rickAndMortyService.GetCharacterById(id);
            return Ok(character);
        }

    }
}