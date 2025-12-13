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
    public class EpisodesController : ControllerBase
    {
        private readonly IRickAndMortyService _rickAndMortyService;
        private readonly ILogger<EpisodesController> _logger;

        public EpisodesController(
            IRickAndMortyService rickAndMortyService, 
            ILogger<EpisodesController> logger
        )
        {
            _rickAndMortyService = rickAndMortyService;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedResult<EpisodesDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PagedResult<EpisodesDto>>> GetAll([FromQuery] EpisodesFilterParams filters)
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
                return BadRequest(new ErrorResponse { StatusCode = 400, Message = "El número de la página debe ser mayor o igual a 1" });

            _logger.LogInformation(
                "Obtener Episodio - Page: {Page}, Name: {Name}, Episode: {Episode}", 
                filters.Page, filters.Name, filters.Episode
            );

            var result = await _rickAndMortyService.GetEpisodes(filters);
            return Ok(result);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(EpisodesDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorResponse), StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EpisodesDto>> GetById(int id)
        {
            if (id <= 0)
                return BadRequest(new ErrorResponse { StatusCode = 400, Message = "El ID debe ser un número positivo" });

            _logger.LogInformation("Obteniendo episodio con ID: {Id}", id);

            var episodio = await _rickAndMortyService.GetEpisodeById(id);
            return Ok(episodio);
        }



    }
}
