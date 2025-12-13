using PruebaTecnicaCarsalesAPI.Configuration;
using PruebaTecnicaCarsalesAPI.Interfaces;
using PruebaTecnicaCarsalesAPI.Middleware;
using PruebaTecnicaCarsalesAPI.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMemoryCache();
builder.Services.Configure<RickAndMortyApiOptions>(builder.Configuration.GetSection(RickAndMortyApiOptions.SectionName));
builder.Services.AddHttpClient<IRickAndMortyService, RickAndMortyService>((serviceProvider, client) =>
{
    //obtiene datos de appsettings
    var apiOptions = serviceProvider.GetRequiredService<Microsoft.Extensions.Options.IOptions<RickAndMortyApiOptions>>().Value;
    client.BaseAddress = new Uri(apiOptions.BaseUrl);
    client.Timeout = TimeSpan.FromSeconds(30);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        //orígenes permitidos desde appsettings
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? new[] { "http://localhost:4200" };
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();
app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthorization();
app.MapControllers();
app.Run();