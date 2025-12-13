using System.Net;
using System.Text.Json;
using PruebaTecnicaCarsalesAPI.Models.Errors;

namespace PruebaTecnicaCarsalesAPI.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionMiddleware(
            RequestDelegate next, 
            ILogger<GlobalExceptionMiddleware> logger,
            IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            ErrorResponse errorResponse;

            switch (exception)
            {
                case HttpRequestException httpEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadGateway;
                    _logger.LogError(httpEx, "Error al comunicarse con Rick And Morty API");
                    
                    errorResponse = new ErrorResponse
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "Error al comunicarse con el servicio externo",
                        Details = _env.IsDevelopment() ? httpEx.Message : null
                    };
                    break;

                case TaskCanceledException taskEx when taskEx.InnerException is TimeoutException:
                    context.Response.StatusCode = (int)HttpStatusCode.RequestTimeout;
                    _logger.LogWarning(taskEx, "Timeout al comunicarse con Rick And Morty API");
                    
                    errorResponse = new ErrorResponse
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "El servicio externo tardó demasiado en responder",
                        Details = _env.IsDevelopment() ? taskEx.Message : null
                    };
                    break;

                case InvalidOperationException invalidOpEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    _logger.LogWarning(invalidOpEx, "Operación inválida: {Message}", invalidOpEx.Message);
                    
                    errorResponse = new ErrorResponse
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = invalidOpEx.Message,
                        Details = _env.IsDevelopment() ? invalidOpEx.StackTrace : null
                    };
                    break;

                default:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    _logger.LogError(exception, "Error inesperado: {Message}", exception.Message);
                    
                    errorResponse = new ErrorResponse
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = "Ocurrió un error inesperado. Intente de nuevo más tarde.",
                        Details = _env.IsDevelopment() ? exception.Message : null
                    };
                    break;
            }

            var jsonOptions = new JsonSerializerOptions 
            { 
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
            };
            
            var jsonResponse = JsonSerializer.Serialize(errorResponse, jsonOptions);
            await context.Response.WriteAsync(jsonResponse);
        }
    }
}
